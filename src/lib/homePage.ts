import {getMongoDb} from '@admin/lib/mongodb'
import {HomePageData} from '@admin/types'

export const getHomePageData = async () => {
    const db = await getMongoDb()
    const homePageData = await db
        ?.collection<HomePageData>('home_page')
        .find()
        .sort({dateCreated: -1})
        .limit(1)
        .toArray()
    return homePageData[0]
}
export const getSchoolProgramsBlock = async () => {
    const homePageData = await getHomePageData()
    return homePageData?.schoolProgramsBlock
}
export const getSchoolPrograms = async () => {
    const homePageData = await getHomePageData()
    return homePageData?.schoolProgramsBlock.schoolPrograms
}
export const getCallToAction = async () => {
    const homePageData = await getHomePageData()
    return homePageData?.callToActionBlock
}
export const getSchoolFeatures = async () => {
    const homePageData = await getHomePageData()
    return homePageData?.schoolFeatures
}
