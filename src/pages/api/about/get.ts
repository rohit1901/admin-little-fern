import {NextApiRequest, NextApiResponse} from "next";
import {getMongoDb} from "@admin/lib/mongodb";
import {AboutPageData} from "@admin/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb()
        const aboutPageData = await db
            ?.collection<AboutPageData>('about_page')
            .find()
            .sort({dateCreated: -1})
            .limit(1)
            .toArray()
        res.status(200).json({message: 'success', body: aboutPageData[0]});
    } catch (e) {
        console.error("Error fetching about page data", e)
        res.status(500).json({message: 'Error fetching about page data', body: e});
    }
}