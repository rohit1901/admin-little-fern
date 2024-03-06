import {getMongoDb} from '@admin/lib/mongodb'
import {ContactPageData} from '@admin/types'

export const getContactPageData = async () => {
    const db = await getMongoDb()
    const contactPageData = await db
        ?.collection<ContactPageData>('contact_page')
        .find()
        .sort({dateCreated: -1})
        .limit(1)
        .toArray()
    return contactPageData[0]
}
