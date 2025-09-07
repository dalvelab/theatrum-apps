import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("WTF???");

  res.status(200).json({
    publicKey: process.env.VAPID_PUBLIC_KEY,
  });
}
