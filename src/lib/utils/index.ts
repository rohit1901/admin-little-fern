import {WithId} from "mongodb";
import {Hero, SchoolProgram} from "@admin/types";

/**
 * Get the image url from the src
 * NOTE: the src should always have a leading slash
 * @param src {string} - the src of the image
 */
export const getImageUrl = (src?: string) => {
    const prefix =
        process.env.AWS_CLOUDFRONT_URL ?? 'https://d28xxvmjntstuh.cloudfront.net'
    return prefix + src
}
export const getNewSchoolPrograms = (id: string, newHero: Hero, schoolPrograms?: WithId<SchoolProgram>[]) => {
    return schoolPrograms?.map((program) => {
        if (program._id?.toString() === id) {
            return {...program, hero: newHero}
        }
        return {...program}
    })
}