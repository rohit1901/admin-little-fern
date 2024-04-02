import {Fragment, PropsWithChildren} from "react";

type LoaderProps = {
    loading?: boolean;
}
export default function Loader({loading, children}: PropsWithChildren<LoaderProps>) {
    if (!loading) return <Fragment>{children}</Fragment>
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
