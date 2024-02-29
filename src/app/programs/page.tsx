import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import {Button} from "flowbite-react";
import {getSchoolPrograms} from "@admin/lib/homePage";
import {SchoolProgram} from "@admin/types";
import LFFormSection from "@admin/components/LFFormSection";

const notoFont = Noto_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Admin - Little Fern", description: "An admin dashboard for Little Fern Website to manage content",
};
export default async function ProgramsLayout() {
    const data = await getSchoolPrograms()
    const programs = JSON.parse(JSON.stringify(data));
    return (<div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <LFFormSection sectionTitle='' isGallery>
            {programs?.map((program: SchoolProgram) => (
                <Button key={program.slug} href={`/programs/${program.slug}`} className='m-2'>{program.name}</Button>))}
        </LFFormSection>
    </div>);
}
