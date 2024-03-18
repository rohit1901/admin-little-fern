'use client'
import {GalleryPageData} from "@admin/types";
import {useEffect} from "react";
import LFForm from "@admin/components/LFForm";
import GalleryHero from "@admin/components/GalleryPage/Hero";
import GalleryWithTags from "@admin/components/GalleryPage/GalleryWithTags";
import {useGalleryPageStore} from "@admin/store/";
import GalleryTextBlock from "@admin/components/GalleryPage/GalleryTextBlock";
import {WithId} from "mongodb";
import {PageHeader} from "@admin/components/PageHeader";

type GalleryPageProps = {
    pageData: WithId<GalleryPageData>
}
const GalleryPageComponent = ({pageData}: GalleryPageProps) => {
    const {galleryPageData, setGalleryPageData} = useGalleryPageStore()
    useEffect(() => {
        setGalleryPageData(pageData)
    }, [])
    return <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
        <LFForm data={galleryPageData}>
            <PageHeader title="Gallery Page"/>
            <GalleryTextBlock/>
            <GalleryHero/>
            <GalleryWithTags/>
        </LFForm>
    </div>
}
export default GalleryPageComponent;