import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {StaffDetails, StaffPageData} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

const handlePost = async (req: NextApiRequest, res: NextApiResponse, db: any) => {
    const staffPageData: WithId<StaffPageData> = {
        ...req.body,
        staffDetails: req.body?.staffDetails.map((staffDetail: WithId<StaffDetails>) => ({...staffDetail, _id: new ObjectId()}))
    }
    const newStaffPageData: WithId<StaffPageData> = {
        ...staffPageData,
        _id: new ObjectId(),
        dateCreated: new Date()
    }
    await db.collection('staff').insertOne(newStaffPageData);
    res.status(200).json({message: 'success', body: newStaffPageData});
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse, db: any) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Error updating staff details', error: 'No staff id provided'});
        return;
    }
    const newStaffDetails: WithId<{
        staffDetails: WithId<StaffDetails>[];
    }> = {
        ...req.body,
        staffDetails: req.body?.staffDetails.map((staffDetail: WithId<StaffDetails>) => ({...staffDetail, _id: new ObjectId()}))
    }
    await db.collection('staff').updateOne({_id: new ObjectId(newStaffDetails._id)},
        {$set: {staffDetails: newStaffDetails.staffDetails, dateCreated: new Date()}});
    res.status(200).json({message: 'success', body: newStaffDetails.staffDetails});
}

const handleDelete = async (req: NextApiRequest, res: NextApiResponse, db: any) => {
    const transformedReq: WithId<{
        staffDetailId: ObjectId
    }> = req.body as WithId<{
        staffDetailId: ObjectId
    }>
    if (!transformedReq._id) {
        res.status(400).json({message: 'Error updating staff details', error: 'No staff id provided'});
        return;
    }
    // delete one staffDetail from staff collection based on the id of the staffDetail
    await db.collection('staff').updateOne({
        _id: new ObjectId(transformedReq._id)
    }, {
        $pull: {
            staffDetails: {
                _id: new ObjectId(transformedReq.staffDetailId)
            }
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
            case 'PUT':
                await handlePut(req, res, db);
                break;
            case 'DELETE':
                await handleDelete(req, res, db);
                break;
            default:
                res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (e) {
        res.status(500).json({message: 'Error updating staff details', error: e});
    }
}