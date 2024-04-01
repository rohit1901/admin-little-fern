import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {Dropdown, DropdownHeader, DropdownItem, Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import {NotificationPageData} from "@admin/types";
import {
    fetchNotifications,
    formatNotificationDate,
    getNotificationsHeading,
    getUnreadNotificationCount,
    getUnreadNotifications,
    makeAllNotificationsRead,
    onPartyMessage,
    showViewAll
} from "@admin/lib";
import usePartySocket from "partysocket/react";
import {getSession} from "next-auth/react";
import {LFNotificationIcon} from "./LFNotificationIcon";
import {LFNotificationMessageIcon} from "@admin/components/LFNotificationMessageIcon";

export const LFNotifications = () => {
    const [loading, setLoading] = useState(false)
    const [notificationPageData, setNotificationPageData] =
        useState<NotificationPageData>()
    usePartySocket({
        host: process.env.NEXT_PUBLIC_PARTYKIT_HOSTNAME,
        room: process.env.NEXT_PUBLIC_PARTYKIT_ROOM,
        // sends the auth token to the party socket as a query parameter
        query: async () => ({
            // get an auth token using your authentication client library
            token: await getSession().then((session) => session?.idToken)
        }),
        onMessage: (message: MessageEvent): void => onPartyMessage(message, notificationPageData, setNotificationPageData)
    })

    useEffect(() => {
        setLoading(true)
        // fetch notifications on initial render
        fetchNotifications((data) => {
            setNotificationPageData(data)
            setLoading(false)
        }).catch(e => console.error("Error fetching notifications", e))
    }, [])

    if (loading) return <Spinner className="mr-4" size="sm"/>

    return (
        <Dropdown
            arrowIcon={false}
            inline
            label={<LFNotificationIcon count={getUnreadNotificationCount(notificationPageData?.notifications ?? [])}/>}>
            <DropdownHeader className="flex items-center">
                <span className="font-bold mr-2 text-cyan-800 dark:text-cyan-50">
                    {getUnreadNotificationCount(notificationPageData?.notifications ?? []) ?? 'No'}
                </span>
                <span className="block truncate text-sm font-bold text-cyan-800 dark:text-cyan-50">
                    {getNotificationsHeading(notificationPageData?.notifications ?? [])}</span>
                {notificationPageData?.notifications.some(n => !n.read) &&
                    <span className="ml-auto cursor-pointer" onClick={() => {
                        makeAllNotificationsRead(notificationPageData, setNotificationPageData)
                    }}>
                        <FaRegEyeSlash/>
                    </span>
                }
            </DropdownHeader>
            {/* Only display unread notifications */}
            {getUnreadNotifications(notificationPageData)?.slice(0, 5)?.map((notification, index) => {
                return (
                    <DropdownItem key={index} as="a" href="http://email.littlefern.in" target='_blank'>
                        <div
                            className="flex py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600 w-64"
                        >
                            <LFNotificationMessageIcon/>
                            <div className="pl-3 w-full">
                                <div
                                    className="text-gray-500 font-normal text-xs mb-1.5 dark:text-gray-400"
                                >
                                    <span className="text-cyan-800 dark:text-cyan-50">{notification.message}</span>
                                </div>
                                <div
                                    className="text-xs font-medium text-primary-600 dark:text-primary-300"
                                >
                                    {formatNotificationDate(notification.dateCreated)}
                                </div>
                            </div>
                        </div>
                    </DropdownItem>
                )
            })}
            {/* Display a View All link if there are more than 5 unread notifications */}
            {showViewAll(notificationPageData) &&
                <DropdownItem as="a" href="http://email.littlefern.in" target="_blank" className="block py-2 text-md text-center text-cyan-800">
                    <div className="inline-flex items-center">
                        <span className="mr-2 text-sm font-semibold">
                            View all
                        </span>
                        <FaRegEye/>
                    </div>
                </DropdownItem>}
        </Dropdown>
    )
}