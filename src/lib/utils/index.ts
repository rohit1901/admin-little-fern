import {WithId} from "mongodb";
import {
    AboutPageData,
    ContactPageData,
    GalleryItem,
    GalleryPageData,
    Hero,
    HomePageData,
    ParentsPageData,
    SchoolProgram,
    SchoolProgramsBlock
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

export const isPathnameHome = (pathname: string) => {
    return pathname === '/website-pages/Home'
}

export const isPathnameAbout = (pathname: string) => {
    return pathname === '/website-pages/About'
}

export const isPathnamePrograms = (pathname: string) => {
    return pathname.includes('/programs')
}

export const isHomePageData = (data: any): data is HomePageData => {
    return (data && typeof data === 'object' && 'homeHero' in data
        && 'schoolFeatures' in data && 'staff' in data && 'schoolProgramsBlock' in data
        && 'testimonialsBlock' in data && 'faqBlock' in data && 'callToActionBlock' in data && 'footer' in data && 'dateCreated' in data);
}
export const isParentsPageData = (data: any): data is ParentsPageData => {
    return data && typeof data === 'object' && 'parentsHero' in data && 'parentsText' in data && 'parentsFAQ' in data;
}

export const isContactPageData = (data: any): data is ContactPageData => {
    return data && typeof data === 'object' && 'textBlock' in data && 'contactInformation' in data;
}

export const isAboutPageData = (data: any): data is AboutPageData => {
    return data && typeof data === 'object' && 'aboutHero' in data && 'aboutText' in data && 'aboutStaff' in data;
}

export const isGalleryPageData = (data: any): data is GalleryPageData => {
    return data && typeof data === 'object' && 'galleryHero' in data && 'galleryItems' in data;
}
export const isSchoolProgramArray = (obj: any): obj is SchoolProgram[] => {
    return Array.isArray(obj) && obj.every(item => isSchoolProgram(item));
}

export const isSchoolProgram = (obj: any): obj is SchoolProgram => {
    // Add your own checks based on the properties of SchoolProgram
    return obj && typeof obj === 'object' && 'name' in obj && 'hero' in obj;
}

export const isSchoolProgramsBlock = (obj: any): obj is WithId<SchoolProgramsBlock> => {
    return obj && typeof obj === 'object' && 'heading' in obj && 'schoolPrograms' in obj;
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
export const getSchoolProgram = (slug: string, schoolPrograms?: WithId<SchoolProgram>[]): WithId<SchoolProgram> | undefined => {
    return schoolPrograms?.find((program) => program.slug === slug)
}

export const createDate = (fromDate?: string, toDate?: string) => {
    if (fromDate && toDate) {
        return `${fromDate} - ${toDate}`
    }
    return fromDate
}

export const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', {month: 'short'})
    return `${month}. ${date.getDate()}`
}

export const parseDateFromString = (dateString: string) => {
    const [fromDate, toDate] = dateString.split('-')
    return {
        fromDate, toDate
    }
}

export const parseScheduleString = (scheduleString: string) => {
    const [dayString, timeString] = scheduleString.split("from")
    const [fromDay, toDay] = dayString?.split('-')
    const [fromTime, toTime] = '2AM - 5 PM'.split('-')//timeString?.split('-')
    return {
        fromDay, toDay, fromTime, toTime
    }
}