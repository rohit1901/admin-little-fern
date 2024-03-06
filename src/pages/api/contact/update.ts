import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {ContactPageData} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        if (req.method === 'POST') {
            const contactPageData = req.body as WithId<ContactPageData>;
            const newContactPageData: WithId<ContactPageData> = {
                ...contactPageData,
                _id: new ObjectId(),
                dateCreated: new Date()
            }
            await db.collection('contact_page').insertOne(newContactPageData);
            res.status(200).json({message: 'success', body: newContactPageData});
        }
    } catch (e) {
        console.error(e);
    }
}