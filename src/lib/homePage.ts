import {getMongoDb} from '@admin/lib/mongodb'
import {HomePageData, SchoolProgramsBlock, StaffPageData} from '@admin/types'

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
    const db = await getMongoDb()
    const schoolProgramsBlock = await db
        ?.collection<SchoolProgramsBlock>('school_programs')
        .find()
        .sort({dateCreated: -1})
        .limit(1)
        .toArray()
    return schoolProgramsBlock[0]
}
export const getSchoolPrograms = async () => {
    const schoolProgramsBlock = await getSchoolProgramsBlock()
    return schoolProgramsBlock?.schoolPrograms
}
export const getStaff = async () => {
    const db = await getMongoDb()
    const staffPageData = await db
        ?.collection<StaffPageData>('staff')
        .find()
        .sort({dateCreated: -1})
        .limit(1)
        .toArray()
    return staffPageData[0]
}
