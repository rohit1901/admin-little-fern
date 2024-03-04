import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {ParentsPageData} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        const stats = await db.stats()
        if (!stats.ok) res.status(500).json({message: 'error fetching MongoDB stats'});
        else res.status(200).json({message: 'successfully fetched MongoDB stats', body: stats});
    } catch (e) {
        console.error('Error connecting to MongoDB', e)
    }
}