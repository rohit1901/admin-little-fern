import {NextApiRequest, NextApiResponse} from "next";
import {getMongoDb} from "@admin/lib/mongodb";
import {SchoolProgramsBlock} from "@admin/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb()
        const schoolProgramsBlock = await db
            ?.collection<SchoolProgramsBlock>('school_programs')
            .find()
            .sort({dateCreated: -1})
            .limit(1)
            .toArray()
        res.status(200).json({message: 'success', body: schoolProgramsBlock[0]});
    } catch (e) {
        console.error("Error fetching school programs page data", e)
        res.status(500).json({message: 'Error fetching school programs page data', body: null});
    }
}