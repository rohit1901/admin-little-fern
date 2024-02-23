import {HomePageData} from "@admin/types";
import {getHomePageData} from "@admin/lib/homePage";
import HomePageComponent from "@admin/components/HomePageComponent";

export async function generateMetadata() {
    return {
        title: `Pages - Little FERN Admin`,
        description: `Admin Dashboard for Little FERN Website to manage content for individual pages.`
    }
}

export default async function WebsitePage({params: {slug}}: {
    params: { slug: string }
}) {

    const homePageData: HomePageData = await getHomePageData()
    // Convert homePageData to a plain object
    const plainHomePageData: HomePageData = JSON.parse(JSON.stringify(homePageData));
    if(slug === 'Home') return <HomePageComponent homePageData={plainHomePageData} />
    return (
        <div className='p-4 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <h1>Website Page - {slug}</h1>
        </div>
    )
}

export const dynamicParams = false