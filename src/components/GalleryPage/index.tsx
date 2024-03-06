'use client'
import {GalleryPageData} from "@admin/types";
import {useEffect} from "react";
import LFForm from "@admin/components/LFForm";
import GalleryHero from "@admin/components/GalleryPage/Hero";
import GalleryWithTags from "@admin/components/GalleryPage/GalleryWithTags";
import {useGalleryPageStore} from "@admin/store/";
import GalleryTextBlock from "@admin/components/GalleryPage/GalleryTextBlock";
import {isGalleryPageData} from "@admin/lib";
import {WithId} from "mongodb";

type GalleryPageProps = {
    pageData: WithId<GalleryPageData>
}
const GalleryPageComponent = ({pageData}: GalleryPageProps) => {
    const {galleryPageData, setGalleryPageData} = useGalleryPageStore()
    useEffect(() => {
        setGalleryPageData(pageData)
    }, [])
    return <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <LFForm data={galleryPageData} updateState={(data) => {
            if (!isGalleryPageData(data)) return
            setGalleryPageData(data)
        }}>
            <GalleryTextBlock/>
            <GalleryHero/>
            <GalleryWithTags/>
        </LFForm>
    </div>
}
export default GalleryPageComponent;