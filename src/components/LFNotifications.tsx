import {FaBell, FaRegEyeSlash} from "react-icons/fa";
import {Dropdown, DropdownHeader, DropdownItem} from "flowbite-react";
import {MdEmail} from "react-icons/md";
import {useEffect, useState} from "react";
import {LFNotification, NotificationPageData} from "@admin/types";
import {formatNotificationDate, getNotificationsHeading, getUnreadNotificationCount, isLFPartyNotification} from "@admin/lib";
import usePartySocket from "partysocket/react";
import {API_NOTIFICATIONS_GET, API_NOTIFICATIONS_UPDATE} from "@admin/lib/constants";
import {useSession} from "next-auth/react";

type IconProps = {
    count: number | string
}
/**
 * Component to display the notification icon with the count
 * @param count {number | string} - the count of notifications
 */
const LFNotificationIcon = ({count}: IconProps) => {
    return (<div className="relative inline-flex mr-5">
        <FaBell className="text-cyan-800 dark:text-cyan-50 h-6 w-6"/>
        {count && <div
            className={NOTIFICATION_BADGE_CLASS}>{count}</div>}
    </div>)
}
const NOTIFICATION_BADGE_CLASS = "absolute inline-flex items-center justify-center w-5 h-5 " +
    "text-xs text-white bg-red-500 border-1 border-white rounded-full -top-4 -right-3 -end-2 dark:border-gray-900"
export const LFNotifications = () => {
    const [notificationPageData, setNotificationPageData] =
        useState<NotificationPageData>()
    const {data: session} = useSession()
    /**
     * Function to get the auth token from the session
     * @param session {any} - the session object
     * @returns {string | undefined} - the auth token
     * TODO: Move to a utility function and handle type of session
     */
    const getAuthToken = (session: any): string | undefined => {
        if (!session) return
        if (!session.hasOwnProperty('idToken')) return
        return session.idToken
    }
    usePartySocket({
        host: process.env.NEXT_PUBLIC_PARTYKIT_HOSTNAME,
        room: process.env.NEXT_PUBLIC_PARTYKIT_ROOM,
        // sends the auth token to the party socket as a query parameter
        query: () => ({
            token: getAuthToken(session)
        }),
        /**
         * Function to handle the message from the party socket. If the message is an LFPartyNotification,
         * it updates the notification page data in the state. If the message is an acknowledgement, it does nothing.
         * @param message {MessageEvent} - the message from the party socket
         * @returns {void}
         */
        onMessage: (message: MessageEvent): void => {
            const parsedMessage = JSON.parse(message.data)
            if (!isLFPartyNotification(parsedMessage)) return;
            if (parsedMessage.type === "acknowledgement") return;
            const newNotification: LFNotification = {
                message: parsedMessage.notification?.message ?? '',
                read: !!parsedMessage.notification?.read,
                dateCreated: parsedMessage.notification?.dateCreated ? new Date(parsedMessage.notification.dateCreated) : new Date()
            }
            const newNotificationPageData: NotificationPageData = notificationPageData && notificationPageData.notifications ? {
                ...notificationPageData,
                notifications: [...notificationPageData.notifications, newNotification]
            } : {
                notifications: [newNotification],
                dateCreated: new Date()
            }
            if (newNotificationPageData) setNotificationPageData(newNotificationPageData)
        }
    })
    /**
     * Function to update the notification page data in the DB. Sets the notifications as 'read'.
     * @param newNotificationPageData {NotificationPageData} - the new notification page data
     * @returns {void}
     */
    const updateNotification = (newNotificationPageData: NotificationPageData): void => {
        fetch(API_NOTIFICATIONS_UPDATE, {
            method: 'POST',
            body: JSON.stringify(newNotificationPageData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then((r) => setNotificationPageData(newNotificationPageData))
            .catch(e => {
                console.error("Error updating notifications", e)
            })
    }
    /**
     * Function to make all notifications read by updating the DB
     * and updating the state
     * @returns {void}
     */
    const makeAllNotificationsRead = (): void => {
        if (!notificationPageData) return
        const newNotificationPageData: NotificationPageData = {
            ...notificationPageData,
            notifications: notificationPageData?.notifications?.map((notification) => ({
                ...notification,
                read: true
            }))
        }
        updateNotification(newNotificationPageData)
    }
    /**
     * Function to fetch notifications from the DB
     * @returns {Promise<void>}
     */
    const fetchNotifications = async (): Promise<void> => {
        // Now you can use this token to make authenticated requests
        fetch(API_NOTIFICATIONS_GET)
            .then(r => r.json())
            .then((r) => setNotificationPageData(r.body))
            .catch(e => {
                console.error("Error fetching notifications", e)
            })
    }

    useEffect(() => {
        // fetch notifications on initial render
        fetchNotifications().then(r => r).catch(e => console.error(e))
    }, [])
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
                        makeAllNotificationsRead()
                    }}>
                        <FaRegEyeSlash/>
                    </span>
                }
            </DropdownHeader>
            {/* Only display unread notifications */}
            {notificationPageData?.notifications?.filter(n => !n.read)?.map((notification, index) => {
                return (
                    <DropdownItem key={index} as='a' href="http://email.littlefern.in" target='_blank'>
                        <div className="flex flex-col">
                            <div className="w-64 text-cyan-800 font-normal text-sm mb-1.5 dark:text-cyan-50 flex items-center">
                                <div className="mr-2">
                                    <MdEmail/>
                                </div>
                                <span className="font-semibold">New:</span>
                                <span className="truncate ml-2 text-gray-900 dark:text-white">{notification.message}</span>
                            </div>
                            <div
                                className="text-xs font-medium text-primary-600 dark:text-primary-500"
                            >
                                {formatNotificationDate(notification.dateCreated)}
                            </div>
                        </div>
                    </DropdownItem>
                )
            })}
        </Dropdown>
    )
}