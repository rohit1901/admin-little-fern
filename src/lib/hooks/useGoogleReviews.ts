import {useHomePageStore} from "@admin/store";
import {useEffect, useState} from "react";
import {API_HOME_GET, API_HOME_UPDATE, API_REVIEWS_GET} from "@admin/lib/constants";
import {WithId} from "mongodb";
import {HomePageData, PlacesApiResponse} from "@admin/types";
import {createTestimonialsBlock, getRating} from "@admin/lib";

/**
 * Fetches the home page data from the database if not already fetched.
 * @param homePageData {WithId<HomePageData>} - The home page data fetched from the database.
 * @returns {Promise<WithId<HomePageData>>} - The home page data fetched from the database.
 */
export const getHomeData = async (homePageData: WithId<HomePageData>): Promise<WithId<HomePageData>> => {
    if (!homePageData._id) {
        const rawHome = await fetch(API_HOME_GET)
        const resp = await rawHome.json()
        return resp.body
    }
    return homePageData
}
/**
 * Fetches the reviews from Google Maps API.
 * @returns {Promise<PlacesApiResponse>} - The reviews from Google Maps API.
 */
export const getMapsResponse = async (): Promise<PlacesApiResponse> => {
    const mapsResponseRaw = await fetch(API_REVIEWS_GET, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const reviewsData = await mapsResponseRaw.json()
    return reviewsData.body
}
/**
 * Updates the home page data with the new ratings and reviews.
 * @param homePageData {WithId<HomePageData>} - The home page data fetched from the database.
 * @param reviewsData {PlacesApiResponse} - The reviews from Google Maps API.
 * @returns {Promise<WithId<HomePageData>>} - The updated home page data.
 */
export const getUpdatedHomePageData = async (homePageData: WithId<HomePageData>, reviewsData: PlacesApiResponse): Promise<WithId<HomePageData>> => {
    const {rating, reviews} = reviewsData
    const ratings = rating ? [getRating(rating)] : [];
    const testimonialsBlock = createTestimonialsBlock(reviews);
    const homeData = await getHomeData(homePageData)
    return {
        ...homeData,
        homeHero: {...homeData.homeHero, ratings},
        testimonialsBlock
    }
}
export const useGoogleReviews = () => {
    const {homePageData, setHomePageData, setRatings, setTestimonialsBlock} = useHomePageStore()
    const [isFetching, setIsFetching] = useState(false)
    const [isReviewsEnabled, setIsReviewsEnabled] =
        useState(!!(homePageData?.testimonialsBlock?.testimonials && homePageData.testimonialsBlock.testimonials.length > 0))
    /**
     * Toggles the reviews on the website.
     * @param {boolean} checked - The checked state of the switch.
     * @returns {Promise<void>} - The updated home page data.
     */
    const toggleReviews = async (checked: boolean): Promise<void> => {
        if (checked) {
            await fetchReviews()
            return
        }
        try {
            setIsFetching(true)
            const updatedHomePageData = {
                ...homePageData,
                homeHero: {...homePageData.homeHero, ratings: []},
                testimonialsBlock: {}
            }
            await fetch(API_HOME_UPDATE, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedHomePageData)
            })
            setHomePageData(updatedHomePageData)
            setIsReviewsEnabled(false)
            setRatings([])
            setTestimonialsBlock({})
        } catch (e) {
            console.error("Error toggling reviews", e)
        } finally {
            setIsFetching(false)
        }
    }
    /**
     * Fetches the reviews from Google Maps and updates the home page data.
     * @returns {Promise<void>} - The updated home page data.
     * @throws {Error} - The error message.
     */
    const fetchReviews = async (): Promise<void> => {
        setIsFetching(true)
        try {
            const reviewsData = getMapsResponse()
            if (reviewsData) {
                const {rating, reviews} = await reviewsData
                const updatedHomePageData = await getUpdatedHomePageData(homePageData, {rating, reviews})
                // update the home page data with the new ratings and reviews
                await fetch(API_HOME_UPDATE, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedHomePageData)
                })
                setHomePageData(updatedHomePageData)
                setIsReviewsEnabled(true)
            }
        } catch (e) {
            console.error("Error fetching reviews and/or updating the database", e)
        } finally {
            setIsFetching(false)
        }
    }
    useEffect(() => {
        if (!homePageData || !homePageData._id) {
            setIsFetching(true)
            fetch(API_HOME_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    setHomePageData(data.body)
                    setIsReviewsEnabled(data.body.testimonialsBlock?.testimonials?.length > 0)
                }).catch((error) => {
                console.error('Error:', error);
                setIsReviewsEnabled(false)
            }).finally(() => {
                setIsFetching(false)
            })
        }
    }, [])
    return {isFetching, isReviewsEnabled, toggleReviews, fetchReviews}
}