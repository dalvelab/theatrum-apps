import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const usePushNotification = () => {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setIsSupported("serviceWorker" in navigator && "PushManager" in window);

    const getSubscription = async () => {
      const registration = await navigator.serviceWorker.ready;

      const existingSubscription =
        await registration.pushManager.getSubscription();

      if (existingSubscription) {
        setSubscription(existingSubscription);
      }
    };

    getSubscription();
  }, []);

  const subscribe = async () => {
    if (!isSupported) return null;

    if (subscription) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      setLoading(true);

      const response = await fetch("/api/push/vapid-public-key");
      const { publicKey } = await response.json();

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription: newSubscription }),
      });

      setSubscription(newSubscription);
      setLoading(false);
      toast({
        title: "Уведомления включены",
        status: "success",
        duration: 2500,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      console.log("Error subscribing to push notifications:", error);
      setLoading(false);
      toast({
        title: "Произошла ошибка.",
        description: "Попробуйте позже",
        status: "error",
        duration: 2500,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const unsubscribe = async () => {
    if (subscription) {
      try {
        setLoading(true);
        // Remove subscription from Strapi
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription }),
        });

        await subscription.unsubscribe();
        setSubscription(null);
        setLoading(false);
        toast({
          title: "Уведомления выключены",
          status: "success",
          duration: 2500,
          position: "top-right",
          isClosable: true,
        });
      } catch (error) {
        console.log("Error unsubscribing from push notifications:", error);
        setLoading(false);
        toast({
          title: "Произошла ошибка.",
          description: "Попробуйте позже",
          status: "error",
          duration: 2500,
          position: "top-right",
          isClosable: true,
        });
      }
    }
  };

  return { subscription, isSupported, loading, subscribe, unsubscribe };
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
