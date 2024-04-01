import {MdEmail} from "react-icons/md";
import {getImageUrl} from "@admin/lib";

export const LFNotificationMessageIcon = () => {
    return (
        <div className="flex-shrink-0">
            <img
                className="w-11 h-11 rounded-full"
                src={getImageUrl('/images/stock/testimonials/female.avatar.jpg')}
                alt="Bonnie Green avatar"
            />
            <div
                className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5
                rounded-full border border-white bg-primary-700 dark:border-gray-700"
            >
                <MdEmail color="white"/>
            </div>
        </div>
    )
}