import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { subscription } = req.body;

      // Save subscription to Strapi
      const response = await fetch(
        `${process.env.DB_HOST}/push-subscriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { subscription },
          }),
        }
      );

      if (response.ok) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: "Failed to save subscription" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
