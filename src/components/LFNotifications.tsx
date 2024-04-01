import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {Dropdown, DropdownHeader, DropdownItem} from "flowbite-react";
import {useEffect, useState} from "react";
import {LFNotification, NotificationPageData} from "@admin/types";
import {formatNotificationDate, getNotificationsHeading, getUnreadNotificationCount, isLFPartyNotification} from "@admin/lib";
import usePartySocket from "partysocket/react";
import {API_NOTIFICATIONS_GET, API_NOTIFICATIONS_UPDATE} from "@admin/lib/constants";
import {getSession} from "next-auth/react";
import {LFNotificationIcon} from "./LFNotificationIcon";
import {LFNotificationMessageIcon} from "@admin/components/LFNotificationMessageIcon";

/**
 * Function to handle the party message. If the message is an LFPartyNotification,
 * it updates the notification page data in the state. If the message is an acknowledgement, it does nothing.
 * @param message {MessageEvent} - the message from the party socket
 * @param notificationPageData {NotificationPageData} - the notification page data in the state
 * @param callback {(data?: NotificationPageData) => void} - the callback function to update the state
 */
const onPartyMessage = (message: MessageEvent,
                        notificationPageData?: NotificationPageData,
                        callback?: (data?: NotificationPageData) => void): void => {
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
    callback?.(newNotificationPageData)
}
/**
 * Function to update the notification page data in the DB. Sets the notifications as 'read'.
 * @param newNotificationPageData {NotificationPageData} - the new notification page data
 * @param callback {(data?: NotificationPageData) => void} - the callback function to update the state
 * @returns {void}
 */
const updateNotification = (newNotificationPageData: NotificationPageData,
                            callback?: (data?: NotificationPageData) => void): void => {
    fetch(API_NOTIFICATIONS_UPDATE, {
        method: 'POST',
        body: JSON.stringify(newNotificationPageData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(r => r.json())
        .then((r) => {
            console.info("Notifications updated", r.message)
            callback?.(newNotificationPageData)
        })
        .catch(e => {
            console.error("Error updating notifications", e)
        })
}
/**
 * Function to make all notifications read by updating the DB
 * and updating the state
 * @param notificationPageData {NotificationPageData} - the notification page data
 * @param callback {(data?: NotificationPageData) => void} - the callback function to update the state
 * @returns {void}
 */
const makeAllNotificationsRead = (notificationPageData?: NotificationPageData,
                                  callback?: (data?: NotificationPageData) => void): void => {
    if (!notificationPageData) return
    const newNotificationPageData: NotificationPageData = {
        ...notificationPageData,
        notifications: notificationPageData?.notifications?.map((notification) => ({
            ...notification,
            read: true
        }))
    }
    updateNotification(newNotificationPageData, callback)
}


/**
 * Function to fetch notifications from the DB
 * and update the state
 * @param callback {(data?: NotificationPageData) => void} - the callback function to update the state
 * @returns {Promise<void>}
 */
const fetchNotifications = async (callback?: (data?: NotificationPageData) => void): Promise<void> => {
    fetch(API_NOTIFICATIONS_GET)
        .then(r => r.json())
        .then((r) => callback?.(r.body))
        .catch(e => {
            console.error("Error fetching notifications", e)
        })
}
/**
 * Function to determine whether to show the 'View All' link in the notifications dropdown
 * @param notificationPageData {NotificationPageData} - the notification page data
 * @returns {boolean}
 */
const showViewAll = (notificationPageData?: NotificationPageData): boolean => {
    const unreadCount = getUnreadNotificationCount(notificationPageData?.notifications ?? [])
    if (!unreadCount) return false
    return unreadCount > 5
}
/**
 * Function to get the unread notifications from the notification page data
 * @param notificationPageData {NotificationPageData} - the notification page data
 * @returns {LFNotification[]}
 */
const getUnreadNotifications = (notificationPageData?: NotificationPageData): LFNotification[] => {
    return notificationPageData?.notifications?.filter(n => !n.read) ?? []
}
export const LFNotifications = () => {
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
        // fetch notifications on initial render
        fetchNotifications(setNotificationPageData).then(r => r).catch(e => console.error(e))
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
                        makeAllNotificationsRead(notificationPageData, setNotificationPageData)
                    }}>
                        <FaRegEyeSlash/>
                    </span>
                }
            </DropdownHeader>
            {/* Only display unread notifications */}
            {getUnreadNotifications(notificationPageData)?.slice(0, 5)?.map((notification, index) => {
                return (
                    <DropdownItem key={index} as='a' href="http://email.littlefern.in" target='_blank'>
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
                <DropdownItem as='a' href="http://email.littlefern.in" target='_blank' className="block py-2 text-md text-center text-cyan-800">
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