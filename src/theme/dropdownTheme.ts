import {DeepPartial} from "flowbite-react/lib/esm/types";
import {FlowbiteDropdownTheme} from "flowbite-react";

export const dropdownTheme: DeepPartial<FlowbiteDropdownTheme> = {
    arrowIcon: "ml-2 h-5 w-5",
    content: "py-10 focus:outline-none",
    inlineWrapper: "flex items-center",
    floating: {
        style: {
            dark: "bg-gray-900 text-cyan-50 dark:bg-gray-700",
            light: "border border-gray-200 bg-cyan-50 text-cyan-800",
            auto: "border border-gray-200 bg-white text-cyan-800 dark:border-none dark:bg-gray-700 dark:text-cyan-50"
        }
    }
}