self.addEventListener("push", (event: any) => {
  if (event.data) {
    try {
      const data = event.data.json();
      const options: NotificationOptions = {
        body: data.body,
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-72x72.png",
        data: data.data,
      };

      // @ts-ignore
      event.waitUntil(self.registration.showNotification(data.title, options));
    } catch (error) {
      console.error("Error processing push message:", error);
    }
  }
});

self.addEventListener("notificationclick", (event: any) => {
  event.notification.close();

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      (self as any).clients.openWindow(event.notification.data.url)
    );
  } else {
    event.waitUntil((self as any).clients.openWindow("/"));
  }
});
