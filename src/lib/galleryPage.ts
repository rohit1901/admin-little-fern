import {getMongoDb} from "@admin/lib/mongodb";
import {GalleryPageData} from "@admin/types";

export const getGalleryPageData = async () => {
    const db = await getMongoDb()
    const galleryPageData = await db
        ?.collection<GalleryPageData>('gallery_page')
        .find()
        .sort({dateCreated: -1})
        .limit(1)
        .toArray()
    return galleryPageData[0]
}