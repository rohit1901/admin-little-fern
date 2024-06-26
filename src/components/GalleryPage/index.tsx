'use client'
import {useEffect, useState} from "react";
import LFForm from "@admin/components/LFForm";
import GalleryHero from "@admin/components/GalleryPage/Hero";
import GalleryWithTags from "@admin/components/GalleryPage/GalleryWithTags";
import {useGalleryPageStore} from "@admin/store/";
import GalleryTextBlock from "@admin/components/GalleryPage/GalleryTextBlock";
import {PageHeader} from "@admin/components/PageHeader";
import {API_GALLERY_GET} from "@admin/lib/constants";
import {isGalleryPageData} from "@admin/lib";
import {ContentLoader} from "@admin/components/Loaders";


const GalleryPageComponent = () => {
    const [loading, setLoading] = useState(false)
    const {galleryPageData, setGalleryPageData} = useGalleryPageStore()
    useEffect(() => {
        if (!galleryPageData || !galleryPageData._id) {
            setLoading(true)
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
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [])
    return (
        <ContentLoader loading={loading}>
            <div className='p-8 mx-auto 2xl:ml-64 ml-20 h-auto bg-white-50 dark:bg-gray-800'>
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
        </ContentLoader>
    )
}
export default GalleryPageComponent;