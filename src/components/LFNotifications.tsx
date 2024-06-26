import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {Dropdown, DropdownHeader, DropdownItem} from "flowbite-react";
import {useEffect, useState} from "react";
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
import {getSession, signOut} from "next-auth/react";
import {LFNotificationIcon} from "./LFNotificationIcon";
import {LFNotificationMessageIcon} from "@admin/components/LFNotificationMessageIcon";
import {useNotificationsStore} from "@admin/store/useNotificationsStore";

export const LFNotifications = () => {
    const [loading, setLoading] = useState(false)
    const {notificationPageData, setNotificationPageData} =
        useNotificationsStore()
    usePartySocket({
        host: process.env.NEXT_PUBLIC_PARTYKIT_HOSTNAME,
        room: process.env.NEXT_PUBLIC_PARTYKIT_ROOM,
        // sends the auth token to the party socket as a query parameter
        query: async () => ({
            // get an auth token using your authentication client library
            token: await getSession().then((session) => session?.idToken)
        }),
        onMessage: (message: MessageEvent): void => onPartyMessage(message, notificationPageData, (data) => {
            if (!data) return
            setNotificationPageData(data)
        }),
        onError: (error: Event): void => {
            console.error("PartySocket error", error)
            signOut().then(() => console.info("Token expired, user signed out"))
        }
    })

    useEffect(() => {
        setLoading(true)
        // fetch notifications on initial render
        fetchNotifications((data) => {
            setLoading(false)
            if (!data) return
            setNotificationPageData(data)
        }).catch(e => console.error("Error fetching notifications", e))
    }, [])
    return (
        <Dropdown
            arrowIcon={false}
            inline
            label={<LFNotificationIcon count={getUnreadNotificationCount(notificationPageData?.notifications ?? [])} loading={loading}/>}>
            <DropdownHeader className="flex items-center">
                <span className="block truncate text-sm font-bold text-cyan-800 dark:text-cyan-50">
                    {getNotificationsHeading(notificationPageData?.notifications ?? [])}</span>
                {notificationPageData?.notifications.some(n => !n.read) &&
                    <span className="ml-auto cursor-pointer" onClick={() => {
                        setLoading(true)
                        makeAllNotificationsRead(notificationPageData, (data) => {
                            setLoading(false)
                            if (!data) return
                            setNotificationPageData(data)
                        })
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
                    <div className="inline-flex items-center" onClick={() => {
                        setLoading(true)
                        makeAllNotificationsRead(notificationPageData, (data) => {
                            setLoading(false)
                            if (!data) return
                            setNotificationPageData(data)
                        })
                    }}>
                        <span className="mr-2 text-sm font-semibold">
                            View all
                        </span>
                        <FaRegEye/>
                    </div>
                </DropdownItem>}
        </Dropdown>
    )
}