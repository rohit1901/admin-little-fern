import {AboutPageData, GalleryPageData, HomePageData} from "@admin/types";
import {getHomePageData} from "@admin/lib/homePage";
import HomePageComponent from "@admin/components/HomePage";
import {getAboutPageData} from "@admin/lib/aboutPage";
import AboutPageComponent from "@admin/components/AboutPage";
import {getGalleryPageData} from "@admin/lib/galleryPage";
import GalleryPageComponent from "@admin/components/GalleryPage";

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
    const aboutPageData: AboutPageData = await getAboutPageData()
    const galleryPageData: GalleryPageData = await getGalleryPageData()
    // Convert pageData to a plain object
    const plainHomePageData: HomePageData = JSON.parse(JSON.stringify(homePageData));
    const plainAboutPageData: AboutPageData = JSON.parse(JSON.stringify(aboutPageData));
    const plainGalleryPageData: GalleryPageData = JSON.parse(JSON.stringify(galleryPageData));

    if (slug === 'Home') return <HomePageComponent homePageData={plainHomePageData}/>
    if (slug === 'About') return <AboutPageComponent aboutPageData={plainAboutPageData}/>
    if (slug === 'Gallery') return <GalleryPageComponent galleryPageData={plainGalleryPageData}/>
    return (
        <div className='p-4 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <h1>Website Page - {slug}</h1>
        </div>
    )
}

export const dynamicParams = false