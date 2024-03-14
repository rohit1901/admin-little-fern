import {FlowbiteNavbarTheme} from "flowbite-react";
import {DeepPartial} from "flowbite-react/lib/esm/types";

const LinkActiveOff = 'border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 ' +
    'dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white'
const ToggleBase = 'inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none ' +
    'focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
export const navbarTheme: DeepPartial<FlowbiteNavbarTheme> = {
    root: {
        base: 'px-2 py-2.5 bg-white dark:bg-gray-800 sm:px-4',
        rounded: {
            on: '',
            off: '',
        },
        inner: {
            base: 'mx-auto flex flex-wrap items-center justify-between',
            fluid: {
                on: '',
                off: 'container',
            },
        }
    },
    brand: {
        base: 'flex items-center self-center whitespace-nowrap',
    },
    collapse: {
        base: 'w-full md:block md:w-auto',
        list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium',
        hidden: {
            on: 'hidden',
            off: '',
        },
    },
    link: {
        base: 'block py-2 pr-4 pl-3 md:p-0',
        active: {
            on: 'bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700',
            off: LinkActiveOff,
        },
        disabled: {
            on: 'text-gray-400 hover:cursor-not-allowed dark:text-gray-600',
            off: '',
        },
    },
    toggle: {
        base: ToggleBase,
        icon: 'h-6 w-6 shrink-0',
    },
};