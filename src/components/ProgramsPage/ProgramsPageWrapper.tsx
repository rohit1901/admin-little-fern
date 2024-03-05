'use client'
import ProgramsPage from "@admin/components/ProgramsPage/index";
import {useSchoolProgramsPageStore} from "@admin/store/";
import {HomePageData} from "@admin/types";
import {WithId} from "mongodb";
import {useEffect} from "react";
import {useHomePageStore} from "@admin/store";

type ProgramsPageWrapperProps = {
    homePageData: WithId<HomePageData>
    slug: string
}
const ProgramsPageWrapper = ({homePageData, slug}: ProgramsPageWrapperProps) => {
    const {programs, setPrograms} = useSchoolProgramsPageStore()
    const {setHomePageData} = useHomePageStore()
    useEffect(() => {
        setHomePageData(homePageData)
        if (homePageData?.schoolProgramsBlock?.schoolPrograms) setPrograms(homePageData.schoolProgramsBlock.schoolPrograms)
    }, [])
    const program = programs.find(p => p.slug === slug)
    if (!programs ?? programs.length === 0) return null
    if (!program) return null
    return <ProgramsPage schoolProgram={program}/>
}
export default ProgramsPageWrapper