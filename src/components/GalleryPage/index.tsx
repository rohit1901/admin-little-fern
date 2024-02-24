'use client'
import {GalleryPageData} from "@admin/types";
import {useState} from "react";
import LFForm from "@admin/components/LFForm";
import TextBlock from "@admin/components/GalleryPage/TextBlock";
import GalleryHero from "@admin/components/GalleryPage/Hero";
import GalleryWithTags from "@admin/components/GalleryPage/GalleryWithTags";

type GalleryPageProps = {
    galleryPageData: GalleryPageData
}
const GalleryPageComponent = ({galleryPageData}: GalleryPageProps) => {
    const [galleryData, setGalleryData] = useState<GalleryPageData>(galleryPageData)
    const onChange = (updatedData: GalleryPageData) => {
        // setGalleryData(updatedData)
    }
    return <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <LFForm>
            <TextBlock textBlock={galleryData.textBlock}/>
            <GalleryHero galleryHero={galleryData.pageHero}/>
            <GalleryWithTags galleryItems={galleryData.gallery}/>
        </LFForm>
    </div>
}
export default GalleryPageComponent;