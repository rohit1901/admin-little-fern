'use client'
import {Banner, Button, Card, Spinner} from "flowbite-react";
import {HiMiniInformationCircle} from "react-icons/hi2";
import {useSession} from "next-auth/react";
import {isEmailAuthorized} from "@admin/lib";
import {FcGoogle} from "react-icons/fc";
import {MdOutlineSync} from "react-icons/md";
import Switch from "react-switch"
import {useGoogleReviews} from "@admin/lib/hooks/useGoogleReviews";

export const GoogleReviewsCard = () => {
    const {data: session} = useSession()
    const {isFetching, isReviewsEnabled, toggleReviews, fetchReviews} = useGoogleReviews()
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
        <div className="flex flex-row justify-between">
            <div className="w-1/2">
                <Button
                    outline
                    className="w-auto mt-2"
                    disabled={isFetching || !isEmailAuthorized(session)} onClick={fetchReviews}>
                    {isFetching ? <Spinner/> : <div className='flex flex-wrap items-center'>
                        <MdOutlineSync className="mr-2 h-5 w-5 text-cyan-50 dark:text-cyan-800"/>
                        <p>Sync</p>
                    </div>}
                </Button>
            </div>
            <div className="flex flex-row mt-2 text-cyan-800 dark:text-cyan-50 items-center w-1/2">
                <label htmlFor="toggle-reviews-switch" className="mx-2 text-xs">Show Reviews on the website?</label>
                <Switch
                    id="toggle-reviews-switch"
                    disabled={isFetching}
                    onColor="#155"
                    checked={isReviewsEnabled}
                    onChange={(checked) => toggleReviews(checked)}/>
            </div>
        </div>
    </Card>
}