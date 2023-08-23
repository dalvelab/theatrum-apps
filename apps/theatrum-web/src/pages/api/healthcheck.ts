import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse ) {
  const timestamp = new Date();

  res.status(200).json({ status: 'ok', timestamp });
}