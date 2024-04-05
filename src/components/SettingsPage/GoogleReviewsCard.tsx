'use client'
import {Banner, Button, Card, Spinner} from "flowbite-react";
import {useState} from "react";
import {HiMiniInformationCircle} from "react-icons/hi2";
import {useSession} from "next-auth/react";
import {createTestimonialsBlock, getRating, isEmailAuthorized} from "@admin/lib";
import {useHomePageStore} from "@admin/store";
import {API_HOME_GET, API_HOME_UPDATE, API_REVIEWS_GET} from "@admin/lib/constants";
import {WithId} from "mongodb";
import {HomePageData, PlacesApiResponse} from "@admin/types";
import {FcGoogle} from "react-icons/fc";
import {MdOutlineSync} from "react-icons/md";

/**
 * Fetches the home page data from the database if not already fetched.
 * @param homePageData {WithId<HomePageData>} - The home page data fetched from the database.
 * @returns {Promise<WithId<HomePageData>>} - The home page data fetched from the database.
 */
const getHomeData = async (homePageData: WithId<HomePageData>): Promise<WithId<HomePageData>> => {
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
const getMapsResponse = async (): Promise<PlacesApiResponse> => {
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
const getUpdatedHomePageData = async (homePageData: WithId<HomePageData>, reviewsData: PlacesApiResponse): Promise<WithId<HomePageData>> => {
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
export const GoogleReviewsCard = () => {
    const [isFetching, setIsFetching] = useState(false)
    const {data: session} = useSession()
    const {homePageData, setHomePageData} = useHomePageStore()
    return <Card className="max-w-sm dark:border-primary-50">
        <h5 className="text-2xl font-bold tracking-tight text-cyan-800 dark:text-cyan-50">
            <FcGoogle/>
            <div className='flex flex-wrap items-center'>
                <p>Sync Google Reviews</p>
            </div>

        </h5>
        <p className="font-normal text-cyan-700 dark:text-cyan-50">
            This will fetch the latest reviews from Google Maps and update the website which does not automatically
            sync reviews from Google Maps.
        </p>
        <Banner
            className="flex justify-between items-center rounded border-b border-gray-200 bg-gray-50 dark:border-cyan-50 dark:bg-cyan-50 p-2">
            <HiMiniInformationCircle className="mr-2 h-5 w-5 text-cyan-800"/>
            <p className="font-mono text-xs text-cyan-800">Proceed with caution. Google only provides 5 reviews. 😞</p>
        </Banner>
        <div className="flex flex-wrap">
            <Button
                className='m-0'
                outline
                disabled={isFetching || !isEmailAuthorized(session)} onClick={async () => {
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
                    }
                } catch (e) {
                    console.error("Error fetching reviews and/or updating the database", e)
                } finally {
                    setIsFetching(false)
                }
            }}>
                {isFetching ? <Spinner/> : <div className='flex flex-wrap items-center'>
                    <MdOutlineSync className="mr-2 h-5 w-5 text-cyan-50 dark:text-cyan-800"/>
                    <p>Sync</p>
                </div>}
            </Button>
        </div>
    </Card>
}