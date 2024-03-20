import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {SchoolProgramsBlock} from "@admin/types";
import {Db, ObjectId, WithId} from "mongodb";

const handlePost = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
    const block = req.body as WithId<SchoolProgramsBlock>;
    const newSchoolProgramsBlock: WithId<SchoolProgramsBlock> = {
        ...block,
        _id: new ObjectId(),
        dateCreated: new Date(),
    }
    await db.collection('school_programs').insertOne(newSchoolProgramsBlock);
    res.status(200).json({message: 'success', body: newSchoolProgramsBlock});
}
const handleDelete = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
    const transformedReq: WithId<{
        collectionId: ObjectId
    }> = req.body as WithId<{
        collectionId: ObjectId
    }>;
    await db.collection('school_programs').updateOne({_id: new ObjectId(transformedReq.collectionId)}, {
        $pull: {
            schoolPrograms: {_id: new ObjectId(transformedReq._id)}
        }, $set: {
            dateCreated: new Date()
        }
    });
    res.status(200).json({message: 'success'});
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        switch (req.method) {
            case 'POST':
                await handlePost(req, res, db);
                break;
            case 'DELETE':
                await handleDelete(req, res, db);
                break;
            default:
                res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (e) {
        console.error('Error updating school programs', e);
        res.status(500).json({message: 'Error updating school programs', error: e});
    }
}