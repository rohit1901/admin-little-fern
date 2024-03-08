import {getMongoDb} from "@admin/lib/mongodb";


export const getAllButLatestPageData = async (collectionName?: string) => {
    const db = await getMongoDb()
    if (collectionName) {
        return db?.collection(collectionName)
            .find()
            .sort({dateCreated: -1})
            .skip(1)
            .toArray()
    }
    return
}
export const deleteAllButLatestData = async (collectionName?: string) => {
    const allCollectionNames = ['home_page', 'about_page', 'contact_page', 'parents_page', 'gallery_page']
    const pageData = await getAllButLatestPageData(collectionName)
    if (collectionName) {
        console.log(pageData)
        return pageData
    }
}