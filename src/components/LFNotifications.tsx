import {FaRegEyeSlash} from "react-icons/fa";
import {Dropdown, DropdownHeader, DropdownItem} from "flowbite-react";
import {MdEmail} from "react-icons/md";
import {useEffect, useState} from "react";
import {LFNotification, NotificationPageData} from "@admin/types";
import {formatNotificationDate, getNotificationsHeading, getUnreadNotificationCount, isLFPartyNotification} from "@admin/lib";
import usePartySocket from "partysocket/react";
import {API_NOTIFICATIONS_GET, API_NOTIFICATIONS_UPDATE} from "@admin/lib/constants";
import {useSession} from "next-auth/react";
import {LFNotificationIcon} from "./LFNotificationIcon";

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
    if (newNotificationPageData) callback?.(notificationPageData)
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
        // TODO: verify the response and replace newNotificationPageData with the response if necessary
        .then((r) => callback?.(newNotificationPageData))
        .catch(e => {
            console.error("Error updating notifications", e)
        })
}
/**
 * Function to make all notifications read by updating the DB
 * and updating the state
 * @returns {void}
 */
const makeAllNotificationsRead = (notificationPageData?: NotificationPageData): void => {
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
export const LFNotifications = () => {
    const [notificationPageData, setNotificationPageData] =
        useState<NotificationPageData>()
    const {data: session} = useSession();
    usePartySocket({
        host: process.env.NEXT_PUBLIC_PARTYKIT_HOSTNAME,
        room: process.env.NEXT_PUBLIC_PARTYKIT_ROOM,
        // sends the auth token to the party socket as a query parameter
        query: (): Record<"token", string | undefined> => ({
            token: session?.idToken
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
                        makeAllNotificationsRead(notificationPageData)
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