import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {HomePageData} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        if (req.method === 'POST') {
            const homePageData = req.body as WithId<HomePageData>;
            const newHomePageData: WithId<HomePageData> = {
                ...homePageData,
                _id: new ObjectId(),
                dateCreated: new Date()
            }
            await db.collection('home_page').insertOne(newHomePageData);
            res.status(200).json({message: 'success', body: newHomePageData});
        }
    } catch (e) {
        console.error(e);
    }
}