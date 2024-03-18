'use client'
import ProgramsPage from "@admin/components/ProgramsPage/index";
import {useSchoolProgramsPageStore} from "@admin/store/";
import {SchoolProgramsBlock} from "@admin/types";
import {WithId} from "mongodb";
import {useEffect} from "react";

import {getSchoolProgram} from "@admin/lib";

type ProgramsPageWrapperProps = {
    schoolProgramsBlock: WithId<SchoolProgramsBlock>
    slug: string
}
const ProgramsPageWrapper = ({schoolProgramsBlock, slug}: ProgramsPageWrapperProps) => {
    const {programs, setPrograms, setHeading} = useSchoolProgramsPageStore()
    useEffect(() => {
        setHeading(schoolProgramsBlock?.heading ?? '')
        setPrograms(schoolProgramsBlock?.schoolPrograms ?? [])
    }, [])
    const program = getSchoolProgram(slug, programs)
    if (!programs ?? programs.length === 0) return null
    if (!program) return null
    return <ProgramsPage schoolProgram={program}/>
}
export default ProgramsPageWrapper