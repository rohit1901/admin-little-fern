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
    return (<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        {programs?.map((program: SchoolProgram) => (
            <Button key={program.slug} href={`/programs/${program.slug}`} className='m-2'>{program.name}</Button>))}
    </div>);
}
