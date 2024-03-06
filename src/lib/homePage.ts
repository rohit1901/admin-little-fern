import {getMongoDb} from '@admin/lib/mongodb'
import {HomePageData, SchoolProgram} from '@admin/types'
import {WithId} from "mongodb";

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
    return homePageData?.schoolProgramsBlock?.schoolPrograms
}
export const getSchoolProgram = (slug: string, homePageData: HomePageData): WithId<SchoolProgram> | undefined => {
    return homePageData?.schoolProgramsBlock?.schoolPrograms?.find((program) => program.slug === slug)
}
export const getCallToAction = async () => {
    const homePageData = await getHomePageData()
    return homePageData?.callToActionBlock
}
export const getSchoolFeatures = async () => {
    const homePageData = await getHomePageData()
    return homePageData?.schoolFeatures
}
