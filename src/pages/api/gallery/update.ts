import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {GalleryPageData} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        if (req.method === 'POST') {
            const galleryPageData = req.body as WithId<GalleryPageData>;
            const newGalleryPageData: WithId<GalleryPageData> = {
                ...galleryPageData,
                _id: new ObjectId(),
                dateCreated: new Date()
            }
            await db.collection('gallery_page').insertOne(newGalleryPageData);
            res.status(200).json({message: 'success', body: newGalleryPageData});
        }
    } catch (e) {
        console.error(e);
    }
}