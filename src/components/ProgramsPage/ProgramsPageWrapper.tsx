'use client'
import ProgramsPage from "@admin/components/ProgramsPage/index";
import {useSchoolProgramsPageStore} from "@admin/store/";

import {getSchoolProgram} from "@admin/lib";

type ProgramsPageWrapperProps = {
    slug: string
}
const ProgramsPageWrapper = ({slug}: ProgramsPageWrapperProps) => {
    const {programs, heading, setPrograms, setHeading} = useSchoolProgramsPageStore()
    const program = getSchoolProgram(slug, programs)
    if (!programs ?? programs.length === 0) return null
    if (!program) return null
    return <ProgramsPage schoolProgram={program}/>
}
export default ProgramsPageWrapper