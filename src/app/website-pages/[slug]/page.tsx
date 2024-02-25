import {AboutPageData, ContactPageData, GalleryPageData, HomePageData, ParentsPageData} from "@admin/types";
import {getHomePageData} from "@admin/lib/homePage";
import HomePageComponent from "@admin/components/HomePage/HomePageComponent";
import {getAboutPageData} from "@admin/lib/aboutPage";
import AboutPageComponent from "@admin/components/AboutPage";
import {getGalleryPageData} from "@admin/lib/galleryPage";
import GalleryPageComponent from "@admin/components/GalleryPage";
import {WithoutId} from "mongodb";
import ParentsPageComponent from "@admin/components/ParentsPage";
import ContactPageComponent from "@admin/components/ContactPage";
import {getParentsPage} from "@admin/lib/parentsPage";
import {getContactPageData} from "@admin/lib/contactPage";

export async function generateMetadata() {
    return {
        title: `Pages - Little FERN Admin`,
        description: `Admin Dashboard for Little FERN Website to manage content for individual pages.`
    }
}

export default async function WebsitePage({params: {slug}}: {
    params: { slug: string }
}) {
    if (slug === 'Home') {
        const homePageData: WithoutId<HomePageData> = await getHomePageData()
        const plainHomePageData: HomePageData = JSON.parse(JSON.stringify(homePageData));
        return <HomePageComponent homePageData={plainHomePageData}/>
    }
    if (slug === 'About') {
        const aboutPageData: WithoutId<AboutPageData> = await getAboutPageData()
        const plainAboutPageData: AboutPageData = JSON.parse(JSON.stringify(aboutPageData));
        return <AboutPageComponent aboutPageData={plainAboutPageData}/>
    }
    if (slug === 'Gallery') {
        const galleryPageData: WithoutId<GalleryPageData> = await getGalleryPageData()
        const plainGalleryPageData: GalleryPageData = JSON.parse(JSON.stringify(galleryPageData));
        return <GalleryPageComponent galleryPageData={plainGalleryPageData}/>
    }
    if (slug === 'Parents') {
        const parentsPageData: WithoutId<ParentsPageData> = await getParentsPage()
        const plainParentsPageData: ParentsPageData = JSON.parse(JSON.stringify(parentsPageData));
        return <ParentsPageComponent parentsPageData={plainParentsPageData}/>
    }
    if (slug === 'Contact') {
        const contactPageData: WithoutId<ContactPageData> = await getContactPageData()
        const plainContactPageData: ContactPageData = JSON.parse(JSON.stringify(contactPageData));
        return <ContactPageComponent contactPageData={plainContactPageData}/>
    }


    return (
        <div className='p-4 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <h1>Website Page - {slug}</h1>
        </div>
    )
}

export const dynamicParams = false