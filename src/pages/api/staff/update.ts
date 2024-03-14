import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {StaffPageData} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        if (req.method === 'POST') {
            const staffPageData = req.body as WithId<StaffPageData>;
            const newStaffPageData: WithId<StaffPageData> = {
                ...staffPageData,
                _id: new ObjectId(),
                dateCreated: new Date()
            }
            await db.collection('staff').insertOne(newStaffPageData);
            res.status(200).json({message: 'success', body: newStaffPageData});
        }
    } catch (e) {
        console.error(e);
    }
}