import {FaBell} from "react-icons/fa";

const NOTIFICATION_BADGE_CLASS = "absolute inline-flex items-center justify-center w-5 h-5 " +
    "text-xs text-white bg-red-500 border-1 border-white rounded-full -top-4 -right-3 -end-2 dark:border-gray-900"

type IconProps = {
    count?: number
}
/**
 * Component to display the notification icon with the count
 * @param count {number | string} - the count of notifications
 */
export const LFNotificationIcon = ({count}: IconProps) => {
    return (<div className="relative inline-flex mr-5">
        <FaBell className="text-cyan-800 dark:text-cyan-50 h-6 w-6"/>
        {count && <div
            className={NOTIFICATION_BADGE_CLASS}>{count}</div>}
    </div>)
}