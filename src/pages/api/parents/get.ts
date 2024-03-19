import {NextApiRequest, NextApiResponse} from "next";
import {getMongoDb} from "@admin/lib/mongodb";
import {ParentsPageData} from "@admin/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb()
        const parentsPageData = await db
            ?.collection<ParentsPageData>('parents_page')
            .find()
            .sort({dateCreated: -1})
            .limit(1)
            .toArray()
        res.status(200).json({message: 'success', body: parentsPageData[0]});
    } catch (e) {
        console.error("Error fetching parents page data", e)
        res.status(500).json({message: 'Error fetching parents page data', error: e});
    }
}