import {WithId} from "mongodb";
import {
    AboutPageData,
    ContactPageData,
    GalleryItem,
    GalleryPageData,
    Hero,
    HomePageData,
    ParentsPageData,
    SchoolProgram
} from "@admin/types";
import {Session} from "next-auth";

/**
 * Get the image url from the src
 * NOTE: the src should always have a leading slash
 * @param src {string} - the src of the image
 */
export const getImageUrl = (src?: string) => {
    return src ? `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}${src}` : ''
}
export const getNewSchoolPrograms = (id: string, newHero: Hero, schoolPrograms?: WithId<SchoolProgram>[]) => {
    return schoolPrograms?.map((program) => {
        if (program._id?.toString() === id) {
            return {...program, hero: newHero}
        }
        return {...program}
    })
}

export const getUniqueTags = (galleryItems: GalleryItem[]) => {
    const badges = galleryItems.map((galleryItem) => galleryItem.tag)
    const set = new Set(badges)
    return Array.from(set)
}

export const isHomePageData = (data: any): data is HomePageData => {
    return data && typeof data === 'object' && 'homeHero' in data && 'schoolFeatures' in data && 'staff' in data && 'schoolProgramsBlock' in data && 'testimonialsBlock' in data && 'faqBlock' in data && 'callToActionBlock' in data && 'footer' in data && 'dateCreated' in data;
}
export const isParentsPageData = (data: any): data is ParentsPageData => {
    return data && typeof data === 'object' && 'parentsHero' in data && 'parentsText' in data && 'parentsFAQ' in data;
}

export const isContactPageData = (data: any): data is ContactPageData => {
    return data && typeof data === 'object' && 'contactHero' in data && 'contactDetails' in data && 'contactForm' in data;
}

export const isAboutPageData = (data: any): data is AboutPageData => {
    return data && typeof data === 'object' && 'aboutHero' in data && 'aboutText' in data && 'aboutStaff' in data;
}

export const isGalleryPageData = (data: any): data is GalleryPageData => {
    return data && typeof data === 'object' && 'galleryHero' in data && 'galleryItems' in data;
}

export const getS3UploadKey = (key: string) => {
    if (process.env.NODE_ENV === 'development') {
        return `dev/${key}`
    }
    return key
}

export const isEmailAuthorized = (session: Session | null) => {
    return session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAILS
}