'use client'
import ProgramsPage from "@admin/components/ProgramsPage/index";
import {useSchoolProgramsPageStore} from "@admin/store/useSchoolProgramsPageStore";
import {SchoolProgram} from "@admin/types";
import {WithId} from "mongodb";
import {useEffect} from "react";

type ProgramsPageWrapperProps = {
    schoolPrograms: WithId<SchoolProgram>[]
    slug: string
}
const ProgramsPageWrapper = ({schoolPrograms, slug}: ProgramsPageWrapperProps) => {
    const {programs, setPrograms} = useSchoolProgramsPageStore()
    useEffect(() => {
        setPrograms(schoolPrograms)
    }, [])
    const program = programs.find(p => p.slug === slug)
    if (!programs ?? programs.length === 0) return null
    if (!program) return null
    return <ProgramsPage schoolProgram={program}/>
}
export default ProgramsPageWrapper