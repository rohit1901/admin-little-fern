import {DeepPartial} from "flowbite-react/lib/esm/types";
import {FlowbiteButtonTheme} from "flowbite-react";

export const buttonTheme: DeepPartial<FlowbiteButtonTheme> = {
    base: "bg-cyan-800 text-cyan-50 dark:bg-cyan-50 dark:text-cyan-800 dark:hover:bg-cyan-800 dark:hover:text-cyan-800",
    color: {
        dark: "bg-cyan-800 text-cyan-50 dark:bg-cyan-50 dark:text-cyan-800 dark:hover:bg-cyan-800 dark:hover:text-cyan-800",
        gray: "bg-gray-600 text-gray-50 dark:bg-gray-50 dark:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-800",
        info: "bg-cyan-800 text-cyan-50 dark:bg-cyan-50 dark:text-cyan-800 dark:hover:bg-cyan-800 dark:hover:text-cyan-800",
        light: "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50",
    },
    inner: {
        outline: "bg-cyan-800 text-cyan-50 dark:bg-cyan-50 dark:text-cyan-800 dark:hover:bg-cyan-800 dark:hover:text-cyan-800"
    }
}