import {WithId} from "mongodb";
import {
    AboutPageData,
    ContactPageData,
    GalleryPageData,
    HomePageData,
    LFNotification,
    LFPartyNotification,
    LFScheduleData,
    ParentsPageData,
    SchoolProgram,
    SchoolProgramsBlock
} from "@admin/types";
import {Session} from "next-auth";
import {ThemeMode} from "flowbite-react";
import {API_PROGRAMS_UPDATE, PATHNAME_ABOUT, PATHNAME_HOME, PATHNAME_PROGRAMS, UPDATE_PATHNAME_MAPPING} from "@admin/lib/constants";

/**
 * Get the image url from the src
 * Fetch from cloudfront in production and from dev in development
 * NOTE: the src should always have a leading slash
 * @param src {string} - the src of the image
 */
export const getImageUrl = (src?: string) => {
    if (!src) {
        return '';
    }
    const isDev = process.env.NODE_ENV === 'development';
    const basePath = process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL;
    return isDev ? `${basePath}/dev${src}` : `${basePath}${src}`;
}
/**
 * Check if the pathname is the home page
 * @param pathname {string} - the pathname
 * @returns {boolean} - whether the pathname is the home page
 */
export const isPathnameHome = (pathname: string): boolean => {
    return pathname === PATHNAME_HOME
}
/**
 * Check if the pathname is the about page
 * @param pathname {string} - the pathname
 * @returns {boolean} - whether the pathname is the about page
 */
export const isPathnameAbout = (pathname: string): boolean => {
    return pathname === PATHNAME_ABOUT
}
/**
 * Check if the pathname is the programs page
 * @param pathname {string} - the pathname
 * @returns {boolean} - whether the pathname is the programs page
 */
export const isPathnamePrograms = (pathname: string): boolean => {
    return pathname.includes(PATHNAME_PROGRAMS)
}
/**
 * Typeguard to check if the data is a HomePageData
 * @param data {any} - the data
 * @returns {boolean} - whether the data is a HomePageData
 */
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

export const isSchoolProgramsBlock = (obj: any): obj is WithId<SchoolProgramsBlock> => {
    return obj && typeof obj === 'object' && 'heading' in obj && 'schoolPrograms' in obj;
}

/**
 * Typeguard to check if the party notification is an LFPartyNotification
 * @param partyNotification {any} - the party notification
 * @returns {boolean} - whether the party notification is an LFPartyNotification
 */
export const isLFPartyNotification = (partyNotification: any): partyNotification is LFPartyNotification => {
    if (typeof partyNotification !== 'object') return false
    if (!partyNotification.type) return false
    if (partyNotification.type !== 'notification' && partyNotification.type !== 'acknowledgement') return false
    return !(partyNotification.type === 'notification' && !partyNotification.notification);
}
/**
 * Get the S3 upload key based on the environment
 * @param key {string} - the key
 * @returns {string} - the S3 upload key
 */
export const getS3UploadKey = (key: string): string => {
    if (process.env.NODE_ENV === 'development') {
        return `dev${key}`
    }
    return key
}
/**
 * Check if the email is authorized to access the admin dashboard
 * @param session {Session | null} - the session
 * @returns {boolean} - whether the email is authorized
 */
export const isEmailAuthorized = (session: Session | null): boolean => {
    return session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAILS
}
/**
 * Get the school program based on the slug
 * @param slug {string} - the slug
 * @param schoolPrograms {WithId<SchoolProgram>[]} - the school programs
 * @returns {WithId<SchoolProgram> | undefined} - the school program
 */
export const getSchoolProgram = (slug: string, schoolPrograms?: WithId<SchoolProgram>[]): WithId<SchoolProgram> | undefined => {
    return schoolPrograms?.find((program) => program.slug === slug)
}
/**
 * Function to create a date string from the from and to dates.
 * If both dates are provided, the date string will be in the format from - to
 * If only the from date is provided, the date string will be the from date
 * Example: 1 Jan 2022 - 2 Jan 2022
 * @param fromDate {string} - the from date
 * @param toDate {string} - the to date
 * @returns {string} - the date string
 */
export const createDate = (fromDate?: string, toDate?: string): string | undefined => {
    if (fromDate && toDate) {
        return `${fromDate} - ${toDate}`
    }
    return fromDate
}
/**
 * Function to format the date to a readable format
 * Example: Jan. 1
 * @param date {Date} - the date
 * @returns {string} - the formatted date
 */
export const formatDate = (date: Date): string => {
    const month = date.toLocaleString('default', {month: 'short'})
    return `${month}. ${date.getDate()}`
}
/**
 * Function to parse the date string to a LFScheduleData object
 * Example: 1 Jan 2022 - 2 Jan 2022 returns {fromDate: "1 Jan 2022", toDate: "2 Jan 202
 * @param dateString {string} - the date string
 * @returns {LFScheduleData} - the parsed schedule data
 */
export const parseDateFromString = (dateString: string) => {
    const [fromDate, toDate] = dateString.split('-')
    return {
        fromDate, toDate
    }
}
/**
 * Parse the schedule string to a LFScheduleData object
 * Example: Mon-Fri from 10:00-18:00 returns {fromDay: "Mon", toDay: "Fri", fromTime: "10:00", toTime: "18:00"}
 * Example: Mon-Wed-Fri from 10:00-18:00 from 10:00-18:00 returns {days: ["Mon", "Wed", "Fri"], fromTime: "10:00", toTime: "18:00"}
 * @param scheduleString {string} - the schedule string
 * @param multipleDayPicker {boolean} - whether to use the multiple day picker
 * @returns {LFScheduleData} - the parsed schedule data
 */
export const parseScheduleString = (scheduleString: string, multipleDayPicker?: boolean): LFScheduleData => {
    const [daysString, timeString] = scheduleString.split(' from ')
    const days = daysString.split('-')
    const [fromTime, toTime] = timeString.split('-')
    if (multipleDayPicker) {
        return {
            days, fromTime, toTime
        }
    }
    return {
        fromDay: days[0], toDay: days[1], fromTime, toTime
    }
}

/**
 * Create a schedule string from a LFScheduleData object
 * Example: Mon-Fri from 10:00-18:00
 * Example: Mon-Wed-Fri from 10:00-18:00
 * @param scheduleData {Partial<LFScheduleData>} - the schedule data
 * @param multipleDayPicker {boolean} - whether to use the multiple day picker
 * @returns {string} - the schedule string
 */
export const createScheduleString = (scheduleData: Partial<LFScheduleData>, multipleDayPicker?: boolean): string => {
    if (multipleDayPicker) {
        return `${scheduleData.days?.join('-')} from ${scheduleData.fromTime}-${scheduleData.toTime}`
    }
    return `${scheduleData.fromDay}-${scheduleData.toDay} from ${scheduleData.fromTime}-${scheduleData.toTime}`
}
/**
 * Checks if the theme mode is dark
 * @param themeMode {ThemeMode} - the theme mode
 */
export const isDarkMode = (themeMode: ThemeMode) => {
    return themeMode === 'dark'
}
/**
 * Get the update API path based on the pathname
 * @param path {string} - the pathname
 * @param shouldUpdatePrograms {boolean} - whether to update the programs
 * @returns {string} - the update API path
 */
export const getUpdateAPIPath = (path: string, shouldUpdatePrograms?: boolean) => {
    if (shouldUpdatePrograms) return API_PROGRAMS_UPDATE
    return UPDATE_PATHNAME_MAPPING[path]
}
/**
 * Update the school programs block on the home page or the programs page
 * @param programs {WithId<SchoolProgram>[]} - the school programs
 * @param heading {string} - the heading
 * @param pathname {string} - the pathname
 * @param setPrograms {Function} - the setPrograms function
 * @param setHeading {Function} - the setHeading function
 */
export const handleProgramUpdate = async (programs: WithId<SchoolProgram>[], heading: string,
                                          pathname: string, setPrograms: (data: WithId<SchoolProgram>[]) => void,
                                          setHeading: (data: string) => void) => {
    // NOTE: this function executes only if the pathname is /website-pages/Home or /programs
    // which means that the request is to update the school programs block
    if (isPathnameHome(pathname) || isPathnamePrograms(pathname)) {
        const newSchoolProgramsBlock: SchoolProgramsBlock = {
            heading,
            schoolPrograms: programs,
            dateCreated: new Date(),
        }
        const res = await fetch(getUpdateAPIPath(pathname, true), {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(newSchoolProgramsBlock)
        })
        const r = await res.json()
        if (isSchoolProgramsBlock(r.body)) {
            setPrograms(r.body.schoolPrograms)
            setHeading(r.body.heading)
        }
    }
    return
}
/**
 * Function to format the notification date to a readable format
 * Example: just now, today, 1 Jan 2022, 10:00
 * @param date {Date} - the date
 * @returns {string} - the formatted date
 */
export const formatNotificationDate = (date: Date) => {
    const now = new Date();
    const providedDate = new Date(date);

    const diffInSeconds = Math.floor((now.getTime() - providedDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    }

    if (now.getFullYear() === providedDate.getFullYear() &&
        now.getMonth() === providedDate.getMonth() &&
        now.getDate() === providedDate.getDate()) {
        return 'today';
    }

    return providedDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
}
/**
 * Get the unread notification count
 * @param notifications {LFNotification[]} - the notifications
 * @returns {string | number} - the unread notification count
 */
export const getUnreadNotificationCount = (notifications: LFNotification[]): string | number => {
    return notifications.filter(n => !n.read).length || ''
}
/**
 * Get the notifications heading based on the notifications
 * @param notifications {LFNotification[]} - the notifications
 * @returns {string} - the notifications heading
 */
export const getNotificationsHeading = (notifications: LFNotification[]): string => {
    return getUnreadNotificationCount(notifications) ? 'New Notifications' : 'No new notifications'
}
/**
 * Get the party kit hostname based on the environment
 * @param hostname {string} - the hostname
 * @returns {string} - the party kit hostname
 * @example getPartyKitHostname('localhost:3000') => 'http://localhost:3000'
 */
export const getPartyKitHostname = (hostname: string): string => {
    if (process.env.NODE_ENV === 'development') {
        return `http://${hostname}`
    }
    return `https://${hostname}`
}