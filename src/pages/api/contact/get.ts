import {NextApiRequest, NextApiResponse} from "next";
import {getMongoDb} from "@admin/lib/mongodb";
import {ContactPageData} from "@admin/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb()
        const contactPageData = await db
            ?.collection<ContactPageData>('contact_page')
            .find()
            .sort({dateCreated: -1})
            .limit(1)
            .toArray()
        res.status(200).json({message: 'success', body: contactPageData[0]});
    } catch (e) {
        console.error("Error fetching contact page data", e)
        res.status(500).json({message: 'Error fetching contact page data', error: e});
    }
}