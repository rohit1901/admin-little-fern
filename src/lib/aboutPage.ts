import {getMongoDb} from '@admin/lib/mongodb'
import {AboutPageData} from '@admin/types'

export const getAboutPageData = async () => {
    const db = await getMongoDb()
    const aboutPageData = await db
        ?.collection<AboutPageData>('about_page')
        .find()
        .sort({dateCreated: -1})
        .limit(1)
        .toArray()
    return aboutPageData[0]
}
