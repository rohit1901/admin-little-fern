import {TrendType} from "@admin/types";
import {getAbsoluteValue} from "@admin/lib";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

export const TrendIcon = ({trend, value}: TrendType) => {
    switch (trend) {
        case "up":
            return (<div
                className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                {getAbsoluteValue(value)}%
                <FaArrowUp className="ml-1 text-green-500"/>
            </div>)
        case "down":
            return <div
                className="flex items-center px-2.5 py-0.5 text-base font-semibold text-red-500 dark:text-red-500 text-center">
                {getAbsoluteValue(value)}%
                <FaArrowDown className="ml-1 text-red-500"/>
            </div>
        case "same":
            return <div
                className="flex items-center px-2.5 py-0.5 text-base font-semibold text-gray-500 dark:text-gray-500 text-center">
                {getAbsoluteValue(value)}%
            </div>
    }
}