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