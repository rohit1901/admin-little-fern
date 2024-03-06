import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {AboutPageData} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        if (req.method === 'POST') {
            const aboutPageData = req.body as WithId<AboutPageData>;
            const newAboutPageData: WithId<AboutPageData> = {
                ...aboutPageData,
                _id: new ObjectId(),
                dateCreated: new Date()
            }
            await db.collection('about_page').insertOne(newAboutPageData);
            res.status(200).json({message: 'success', body: newAboutPageData});
        }
    } catch (e) {
        console.error(e);
    }
}