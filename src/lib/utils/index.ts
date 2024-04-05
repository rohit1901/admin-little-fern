import {WithId} from "mongodb";
import {
    AboutPageData,
    ContactPageData,
    GalleryPageData,
    GoogleReview,
    HomePageData,
    LFNotification,
    LFPartyNotification,
    LFScheduleData,
    LFScheduleDate,
    NotificationPageData,
    ParentsPageData,
    Rating,
    SchoolProgram,
    SchoolProgramsBlock,
    Testimonial,
    TestimonialsBlock
} from "@admin/types";
import {Session} from "next-auth";
import {ThemeMode} from "flowbite-react";
import {
    API_NOTIFICATIONS_GET,
    API_NOTIFICATIONS_UPDATE,
    API_PROGRAMS_UPDATE,
    PATHNAME_ABOUT,
    PATHNAME_HOME,
    PATHNAME_PROGRAMS,
    UPDATE_PATHNAME_MAPPING
} from "@admin/lib/constants";

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
 * @returns {LFScheduleDate} - the parsed schedule data
 */
export const parseDateFromString = (dateString: string): LFScheduleDate => {
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
export const getUpdateAPIPath = (path: string, shouldUpdatePrograms?: boolean): string => {
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
export const formatNotificationDate = (date: Date): string => {
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
 * @returns {number | undefined} - the unread notification count
 */
export const getUnreadNotificationCount = (notifications: LFNotification[]): number | undefined => {
    const LENGTH = notifications.filter(n => !n.read)?.length
    return LENGTH === 0 ? undefined : LENGTH
}
/**
 * Get the notifications heading based on the notifications
 * @param notifications {LFNotification[]} - the notifications
 * @returns {string} - the notifications heading
 */
export const getNotificationsHeading = (notifications: LFNotification[]): string => {
    const COUNT = getUnreadNotificationCount(notifications)
    return COUNT ? `${COUNT} New Notifications` : 'No new notifications'
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
/**
 * Function to handle the party message. If the message is an LFPartyNotification,
 * it updates the notification page data in the state. If the message is an acknowledgement, it does nothing.
 * @param message {MessageEvent} - the message from the party socket
 * @param notificationPageData {NotificationPageData} - the notification page data in the state
 * @param callback {(data?: NotificationPageData) => void} - the callback function to update the state
 */
export const onPartyMessage = (message: MessageEvent,
                               notificationPageData?: NotificationPageData,
                               callback?: (data?: NotificationPageData) => void): void => {
    const parsedMessage = JSON.parse(message.data)
    if (!isLFPartyNotification(parsedMessage)) return;
    if (parsedMessage.type === "acknowledgement") return;
    const newNotification: LFNotification = {
        message: parsedMessage.notification?.message ?? '',
        read: !!parsedMessage.notification?.read,
        dateCreated: parsedMessage.notification?.dateCreated ? new Date(parsedMessage.notification.dateCreated) : new Date()
    }
    const newNotificationPageData: NotificationPageData = notificationPageData && notificationPageData.notifications ? {
        ...notificationPageData,
        notifications: [...notificationPageData.notifications, newNotification]
    } : {
        notifications: [newNotification],
        dateCreated: new Date()
    }
    callback?.(newNotificationPageData)
}
/**
 * Function to update the notification page data in the DB. Sets the notifications as 'read'.
 * @param newNotificationPageData {NotificationPageData} - the new notification page data
 * @param callback {(data?: NotificationPageData) => void} - the callback function to update the state
 * @returns {void}
 */
export const updateNotification = (newNotificationPageData: NotificationPageData,
                                   callback?: (data?: NotificationPageData) => void): void => {
    fetch(API_NOTIFICATIONS_UPDATE, {
        method: 'POST',
        body: JSON.stringify(newNotificationPageData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(r => r.json())
        .then((r) => {
            console.info("Notifications updated", r.message)
            callback?.(newNotificationPageData)
        })
        .catch(e => {
            console.error("Error updating notifications", e)
        })
}
/**
 * Function to make all notifications read by updating the DB
 * and updating the state
 * @param notificationPageData {NotificationPageData} - the notification page data
 * @param callback {(data?: NotificationPageData) => void} - the callback function to update the state
 * @returns {void}
 */
export const makeAllNotificationsRead = (notificationPageData?: NotificationPageData,
                                         callback?: (data?: NotificationPageData) => void): void => {
    if (!notificationPageData) return
    const newNotificationPageData: NotificationPageData = {
        ...notificationPageData,
        notifications: notificationPageData?.notifications?.map((notification) => ({
            ...notification,
            read: true
        }))
    }
    updateNotification(newNotificationPageData, callback)
}
/**
 * Function to fetch notifications from the DB
 * and update the state
 * @param callback {(data?: NotificationPageData) => void} - the callback function to update the state
 * @returns {Promise<void>}
 */
export const fetchNotifications = async (callback?: (data?: NotificationPageData) => void): Promise<void> => {
    fetch(API_NOTIFICATIONS_GET)
        .then(r => r.json())
        .then((r) => callback?.(r.body))
        .catch(e => {
            console.error("Error fetching notifications", e)
        })
}
/**
 * Function to determine whether to show the 'View All' link in the notifications dropdown
 * @param notificationPageData {NotificationPageData} - the notification page data
 * @returns {boolean}
 */
export const showViewAll = (notificationPageData?: NotificationPageData): boolean => {
    const unreadCount = getUnreadNotificationCount(notificationPageData?.notifications ?? [])
    if (!unreadCount) return false
    return unreadCount > 5
}
/**
 * Function to get the unread notifications from the notification page data
 * @param notificationPageData {NotificationPageData} - the notification page data
 * @returns {LFNotification[]}
 */
export const getUnreadNotifications = (notificationPageData?: NotificationPageData): LFNotification[] => {
    return notificationPageData?.notifications?.filter(n => !n.read) ?? []
}
/**
 * Function to get the correct Google Maps API key
 * @returns {string} - the Google Maps API key
 */
export const getMapsApiKey = (): string => {
    return process.env.GOOGLE_PLACES_API_KEY
}
/**
 * Function to build the Google Maps URL based on the placeId
 * @param placeId {string} - the placeId
 * @returns {string} - the Google Maps URL
 */
export const getGoogleMapsUrl = (placeId: string): string => {
    const API_KEY = getMapsApiKey()
    return `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating%2Creviews&key=${API_KEY}`
}
/**
 * Function to get the rating object from the rating number
 * @param rating {number} - the rating number
 * @returns {Rating} - the rating object
 */
export const getRating = (rating: number): Rating => {
    return {
        label: 'Google Rating',
        stars: rating
    }
}
/**
 * Function to get the testimonial object from the Google Review
 * @param review {GoogleReview} - the Google Review
 * @returns {Testimonial} - the testimonial object
 */
export const getTestimonial = (review: GoogleReview): Testimonial => {
    return {
        name: review.author_name,
        testimonial: review.text,
        stars: review.rating,
        image: review.profile_photo_url,
    }
}
/**
 * Function to create the testimonials block from the Google Reviews. If there are no reviews, it returns an empty object
 * @param reviews {GoogleReview[]} - the Google Reviews
 * @returns {TestimonialsBlock} - the testimonials block
 */
export const createTestimonialsBlock = (reviews?: GoogleReview[]): TestimonialsBlock => {
    if (!reviews) return {}
    if (reviews.length === 0) return {}
    return {
        heading: "See what parents are saying about us!",
        subHeading: "Curious about the experiences of other parents at Little FERN? Gain insights into the impact of our nurturing environment," +
            " dedicated educators, and the holistic learning approach. " +
            "Let the words of our parents paint a vivid picture of the Little FERN journey, " +
            "offering you a firsthand glimpse into the positive impact our school has on children and families alike.",
        testimonials: reviews.map(getTestimonial)
    }
}