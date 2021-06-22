import { resolvePhrase } from "../../core/index"
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body as { query: string }
    console.log(query)

    try {
        const phrase = await resolvePhrase(query)
        res.status(200).json({ phrase })
    } catch (e) {
        res.status(400).json({ error: (e as Error).message })
    }
}