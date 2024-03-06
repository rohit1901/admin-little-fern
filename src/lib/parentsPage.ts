import {getMongoDb} from "@admin/lib/mongodb";
import {ParentsPageData} from "@admin/types";

export const getParentsPage = async () => {
    const db = await getMongoDb()
    const parentsPageData = await db
        ?.collection<ParentsPageData>('parents_page')
        .find()
        .sort({dateCreated: -1})
        .limit(1)
        .toArray()
    return parentsPageData[0]
}