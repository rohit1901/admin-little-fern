'use client'
import {useEffect} from "react";
import LFForm from "@admin/components/LFForm";
import GalleryHero from "@admin/components/GalleryPage/Hero";
import GalleryWithTags from "@admin/components/GalleryPage/GalleryWithTags";
import {useGalleryPageStore} from "@admin/store/";
import GalleryTextBlock from "@admin/components/GalleryPage/GalleryTextBlock";
import {PageHeader} from "@admin/components/PageHeader";
import {API_GALLERY_GET} from "@admin/lib/constants";
import {isGalleryPageData} from "@admin/lib";


const GalleryPageComponent = () => {
    const {galleryPageData, setGalleryPageData} = useGalleryPageStore()
    useEffect(() => {
        if (!galleryPageData || !galleryPageData._id) {
            fetch(API_GALLERY_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    setGalleryPageData(data.body)
                }).catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [])
    if (!galleryPageData || !galleryPageData._id) return null
    return <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
        <LFForm data={galleryPageData} afterSubmit={(data) => {
            if (!isGalleryPageData(data)) return
            setGalleryPageData(data)
        }}>
            <PageHeader title="Gallery Page"/>
            <GalleryTextBlock/>
            <GalleryHero/>
            <GalleryWithTags/>
        </LFForm>
    </div>
}
export default GalleryPageComponent;