import {Fragment, PropsWithChildren} from "react";

type LoaderProps = {
    loading?: boolean;
}
export const ScreenLoader = () => {
    return (
        <div className="min-w-screen flex min-h-screen items-center justify-center bg-purple-25 p-5">
            <div className="flex animate-pulse space-x-2">
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
            </div>
        </div>
    )
}

export const ContentLoader = ({loading, children}: PropsWithChildren<LoaderProps>) => {
    if (!loading) return <Fragment>{children}</Fragment>
    return (
        <div className="flex min-h-screen min-w-screen items-center justify-center bg-purple-25 p-5">
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700"/>
                <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
