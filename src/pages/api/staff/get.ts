import {NextApiRequest, NextApiResponse} from "next";
import {getMongoDb} from "@admin/lib/mongodb";
import {StaffPageData} from "@admin/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb()
        const staffPageData = await db
            ?.collection<StaffPageData>('staff')
            .find()
            .sort({dateCreated: -1})
            .limit(1)
            .toArray()
        res.status(200).json({message: 'success', body: staffPageData[0]});
    } catch (e) {
        console.error(e);
    }
}