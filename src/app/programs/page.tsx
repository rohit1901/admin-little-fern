import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import {Button} from "flowbite-react";
import {getSchoolPrograms} from "@admin/lib/homePage";
import {SchoolProgram} from "@admin/types";

const notoFont = Noto_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Admin - Little Fern", description: "An admin dashboard for Little Fern Website to manage content",
};
export default async function ProgramsLayout() {
    const programs = await getSchoolPrograms()
    return (<div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800 grid grid-cols-2'>
        {programs?.map((program: SchoolProgram) => (
            <Button key={program.slug} href={`/programs/${program.slug}`} className='m-2'>{program.name}</Button>))}
    </div>);
}
