import { NextApiRequest, NextApiResponse } from "next";

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface UnsubscribeRequest {
  subscription: PushSubscription;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { subscription }: UnsubscribeRequest = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: "Invalid subscription data" });
    }

    const response = await fetch(`${process.env.DB_HOST}/push-subscriptions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return res
        .status(500)
        .json({ error: "Failed to fetch subscriptions from Strapi" });
    }

    const { data: subscriptions } = await response.json();

    const subscriptionToDelete = subscriptions.find(
      (sub: any) => sub.subscription.endpoint === subscription.endpoint
    );

    if (subscriptionToDelete) {
      const deleteResponse = await fetch(
        `${process.env.DB_HOST}/push-subscriptions/${subscriptionToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        return res
          .status(500)
          .json({ error: "Failed to delete subscription from Strapi" });
      }
    }

    res
      .status(200)
      .json({ success: true, message: "Unsubscribed successfully" });
  } catch (error) {
    console.error("Error unsubscribing from push notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
