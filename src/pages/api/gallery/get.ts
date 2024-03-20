import {NextApiRequest, NextApiResponse} from "next";
import {getMongoDb} from "@admin/lib/mongodb";
import {GalleryPageData} from "@admin/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb()
        const galleryPageData = await db
            ?.collection<GalleryPageData>('gallery_page')
            .find()
            .sort({dateCreated: -1})
            .limit(1)
            .toArray()
        res.status(200).json({message: 'success', body: galleryPageData[0]});
    } catch (e) {
        console.error("Error fetching gallery page data", e)
        res.status(500).json({message: 'Error fetching gallery page data', body: e});
    }
}