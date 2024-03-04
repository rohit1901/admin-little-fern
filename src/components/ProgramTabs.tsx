import {WithId} from "mongodb";
import {SchoolProgram} from "@admin/types";
import {Button} from "flowbite-react";

type ProgramTabsProps = {
    programs: WithId<SchoolProgram>[]
}
export const ProgramTabs = ({programs}: ProgramTabsProps) => {
    return <div className="flex flex-wrap mx-auto">
        {programs?.map((program: SchoolProgram) => (
            <Button key={program.slug} href={`/programs/${program.slug}`} className='m-2 dark:bg-cyan-50'
                    outline>{program.name}</Button>))}
    </div>
}