import {FaBell, FaRegEyeSlash} from "react-icons/fa";
import {Dropdown, DropdownHeader, DropdownItem} from "flowbite-react";
import {MdEmail} from "react-icons/md";
import {useEffect, useState} from "react";
import {Notification, NotificationPageData} from "@admin/types";

const NOTIFICATION_BADGE_CLASS = "absolute inline-flex items-center justify-center w-5 h-5 " +
    "text-xs text-white bg-red-500 border-1 border-white rounded-full -top-4 -right-3 -end-2 dark:border-gray-900"
type IconProps = {
    count: number | string
}
const LFNotificationIcon = ({count}: IconProps) => {
    return (<div className="relative inline-flex mr-5">
        <FaBell className="text-cyan-800 dark:text-cyan-50 h-6 w-6"/>
        {count && <div
            className={NOTIFICATION_BADGE_CLASS}>{count}</div>}
    </div>)
}
export const formatNotificationDate = (date: Date) => {
    const now = new Date();
    const providedDate = new Date(date);

    const diffInSeconds = Math.floor((now.getTime() - providedDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    }

    if (now.getFullYear() === providedDate.getFullYear() &&
        now.getMonth() === providedDate.getMonth() &&
        now.getDate() === providedDate.getDate()) {
        return 'today';
    }

    return providedDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
}
const getUnreadNotificationCount = (notifications: Notification[]) => {
    return notifications.filter(n => !n.read).length || ''
}
const getNotificationsHeading = (notifications: Notification[]) => {
    return getUnreadNotificationCount(notifications) ? 'New Notifications' : 'No new notifications'
}
export const LFNotification = () => {
    const [notificationPageData, setNotificationPageData] = useState<NotificationPageData>()
    const makeAllNotificationsRead = () => {
        fetch('/api/notifications/update', {
            method: 'POST',
            body: JSON.stringify(notificationPageData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then((r) => setNotificationPageData(r.body))
            .catch(e => e)
    }
    useEffect(() => {
        fetch('/api/notifications/get')
            .then(r => r.json())
            .then((r) => setNotificationPageData(r.body))
            .catch(e => e)
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
            {notificationPageData?.notifications?.map((notification, index) => {
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