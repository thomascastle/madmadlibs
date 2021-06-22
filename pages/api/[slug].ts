import { resolvePhrase } from "../../core/index"
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string }

  try {
    const phrase = await resolvePhrase(slug)
    res.status(200).json({ phrase })
  } catch (e) {
    res.status(400).json({ error: (e as Error).message })
  }
}
