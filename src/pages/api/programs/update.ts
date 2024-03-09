import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {SchoolProgramsBlock} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        if (req.method === 'POST') {
            const block = req.body as WithId<SchoolProgramsBlock>;
            const newSchoolProgramsBlock: WithId<SchoolProgramsBlock> = {
                ...block,
                _id: new ObjectId(),
            }
            await db.collection('school_programs').insertOne(newSchoolProgramsBlock);
            res.status(200).json({message: 'success', body: newSchoolProgramsBlock});
        }
    } catch (e) {
        console.error(e);
    }
}