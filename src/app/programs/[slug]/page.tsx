import {getHomePageData} from "@admin/lib/homePage";
import {HomePageData} from "@admin/types";
import HomePageComponent from "@admin/components/HomePageComponent";

export async function generateMetadata() {
    return {
        title: `Program - Little FERN Admin`,
        description: `Admin Dashboard for Little FERN Website to manage content for individual programs.`
    }
}

export default async function ProgramPage({params: {slug}}: {
    params: { slug: string }
}) {
    return (
        <div className='p-4 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <h1>Program Page - {slug}</h1>
        </div>
    )
}

export const dynamicParams = false