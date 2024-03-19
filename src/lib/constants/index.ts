import {PathnameMappingType, StaffDetails} from "@admin/types";

/**
 * The days of the week
 * @type {string[]} - the days of the week
 * @example
 * "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
 */
export const DAYS_OF_WEEK: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

export const INTERVALS = ["per day", "per week", "per month", "per year"] as const

/*
 * The times of the day
 * @type {string[]} - the times of the day
 * @example
 * "00:00", "01:00", ... "23:00"
 */
export const TIMES = Array.from({length: 24}, (v, i) => i).map((hour) => {
    return hour < 10 ? `0${hour}:00` : `${hour}:00`
})
export const API_HOME_UPDATE = '/api/home/update'
export const API_HOME_GET = '/api/home/get'
export const API_ABOUT_UPDATE = '/api/about/update'
export const API_ABOUT_GET = '/api/about/get'
export const API_PROGRAMS_UPDATE = '/api/programs/update'
export const API_PROGRAMS_GET = '/api/programs/get'
export const API_STAFF_UPDATE = '/api/staff/update'
export const API_STAFF_GET = '/api/staff/get'
export const API_CONTACT_UPDATE = '/api/contact/update'
export const API_CONTACT_GET = '/api/contact/get'
export const API_PARENTS_UPDATE = '/api/parents/update'
export const API_PARENTS_GET = '/api/parents/get'
export const API_GALLERY_UPDATE = '/api/gallery/update'
export const API_GALLERY_GET = '/api/gallery/get'
export const PATHNAME_HOME = '/website-pages/Home'
export const PATHNAME_PROGRAMS = '/programs'
export const PATHNAME_ABOUT = '/website-pages/About'
export const PATHNAME_CONTACT = '/website-pages/Contact'
export const PATHNAME_PARENTS = '/website-pages/Parents'
export const PATHNAME_GALLERY = '/website-pages/Gallery'
export const STAFF_IMAGE_FILENAME_PREFIX = "/images/stock/staff/staff-";
export const STAFF_PORTRAIT_IMAGE_FILENAME_PREFIX = "/images/stock/about/about-team-";
export const IMAGE_FILE_EXTENSION = ".jpg";

export const PATHNAME_MAPPING: PathnameMappingType = {
    '/website-pages/Home': API_HOME_UPDATE,
    '/website-pages/About': API_ABOUT_UPDATE,
    '/website-pages/Contact': API_CONTACT_UPDATE,
    '/website-pages/Parents': API_PARENTS_UPDATE,
    '/website-pages/Gallery': API_GALLERY_UPDATE,
}
export const INITIAL_NEW_STAFF_DETAILS: StaffDetails = {
    name: "",
    role: "",
    description: "",
    featured: false,
    image: "",
    portraitImage: "",
    social: []
}