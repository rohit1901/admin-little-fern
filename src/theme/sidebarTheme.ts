import {FlowbiteSidebarTheme} from "flowbite-react";
import {DeepPartial} from "flowbite-react/lib/esm/types";

export const sidebarTheme: DeepPartial<FlowbiteSidebarTheme> = {
    root: {
        base: 'fixed overflow-y-auto scrolling-touch top-0 z-40 w-64 h-screen', // Tailwind class for background color
        inner: 'pt-20 pl-8 h-full border-r border-gray-800 dark:border-purple-800',
        collapsed: {
            on: 'w-16',
            off: 'w-64',
        },
    },
};