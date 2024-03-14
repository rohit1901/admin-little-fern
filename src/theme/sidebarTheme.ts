import {FlowbiteSidebarTheme} from "flowbite-react";
import {DeepPartial} from "flowbite-react/lib/esm/types";

const textStyle = "text-cyan-800 dark:text-cyan-50"
const collapseButton = "group flex w-full items-center rounded-lg p-2 text-base font-normal text-cyan-800 " +
    "transition duration-75 hover:bg-gray-100 dark:text-cyan-50 dark:hover:bg-gray-700"
export const sidebarTheme: DeepPartial<FlowbiteSidebarTheme> = {
    root: {
        base: "h-full",
        inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-gray-800"
    },
    collapse: {
        button: collapseButton,
        icon: {
            base: "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            open: {
                off: "",
                on: "text-gray-900"
            }
        },
        label: {
            base: "ml-3 flex-1 whitespace-nowrap text-left",
            icon: {
                base: "h-6 w-6 transition ease-in-out delay-0",
                open: {
                    on: "rotate-180",
                    off: ""
                }
            }
        },
        list: "space-y-2 py-2"
    },
    item: {
        base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-cyan-800 hover:bg-gray-100 dark:text-cyan-50" +
            " dark:hover:bg-gray-700",
    }
};