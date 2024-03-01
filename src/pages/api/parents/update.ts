import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {ParentsPageData} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        if (req.method === 'POST') {
            const parentsPageData = req.body as WithId<ParentsPageData>;
            const newParentsPageData: WithId<ParentsPageData> = {
                ...parentsPageData,
                _id: new ObjectId(),
                dateCreated: new Date()
            }
            await db.collection('parents_page').insertOne(newParentsPageData);
            res.status(200).json({message: 'success', body: newParentsPageData});
        }
    } catch (e) {
        console.error(e);
    }
}