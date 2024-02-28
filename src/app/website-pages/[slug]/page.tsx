import {AboutPageData, ContactPageData, GalleryPageData, HomePageData, ParentsPageData} from "@admin/types";
import {getHomePageData} from "@admin/lib/homePage";
import HomePageComponent from "@admin/components/HomePage/HomePageComponent";
import {getAboutPageData} from "@admin/lib/aboutPage";
import AboutPageComponent from "@admin/components/AboutPage";
import {getGalleryPageData} from "@admin/lib/galleryPage";
import GalleryPageComponent from "@admin/components/GalleryPage";
import {WithId, WithoutId} from "mongodb";
import ParentsPageComponent from "@admin/components/ParentsPage";
import ContactPageComponent from "@admin/components/ContactPage";
import {getParentsPage} from "@admin/lib/parentsPage";
import {getContactPageData} from "@admin/lib/contactPage";
import {Spinner} from "flowbite-react";
import {Suspense} from "react";

export async function generateMetadata() {
    return {
        title: `Pages - Little FERN Admin`,
        description: `Admin Dashboard for Little FERN Website to manage content for individual pages.`
    }
}

const getElems = async (slug: string) => {
    if (slug === 'Home') {
        const homePageData: WithId<HomePageData> = await getHomePageData()
        const plainHomePageData: WithId<HomePageData> = JSON.parse(JSON.stringify(homePageData));
        return <HomePageComponent pageData={plainHomePageData}/>
    }
    if (slug === 'About') {
        const aboutPageData: WithoutId<AboutPageData> = await getAboutPageData()
        const plainAboutPageData: WithId<AboutPageData> = JSON.parse(JSON.stringify(aboutPageData));
        return <AboutPageComponent pageData={plainAboutPageData}/>
    }
    if (slug === 'Gallery') {
        const galleryPageData: WithoutId<GalleryPageData> = await getGalleryPageData()
        const plainGalleryPageData: GalleryPageData = JSON.parse(JSON.stringify(galleryPageData));
        return <GalleryPageComponent pageData={plainGalleryPageData}/>
    }
    if (slug === 'Parents') {
        const parentsPageData: WithoutId<ParentsPageData> = await getParentsPage()
        const plainParentsPageData: ParentsPageData = JSON.parse(JSON.stringify(parentsPageData));
        return <ParentsPageComponent pageData={plainParentsPageData}/>
    }
    if (slug === 'Contact') {
        const contactPageData: WithoutId<ContactPageData> = await getContactPageData()
        const plainContactPageData: ContactPageData = JSON.parse(JSON.stringify(contactPageData));
        return <ContactPageComponent contactPageData={plainContactPageData}/>
    }
    return null
}
export default async function WebsitePage({params: {slug}}: {
    params: { slug: string }
}) {
    const elem = await getElems(slug)
    return <Suspense
        fallback={<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <Spinner aria-label="Default status example"/>
        </div>}>
        {elem}
    </Suspense>
}

export const dynamicParams = false