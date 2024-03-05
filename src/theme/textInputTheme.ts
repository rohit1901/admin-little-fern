import {FlowbiteTextInputTheme} from "flowbite-react";

const TextInputAddon = 'inline-flex items-center rounded-l-md border border-r-0 border-purple-300 ' +
    'bg-purple-200 px-3 text-sm text-purple-900 dark:border-purple-600 dark:bg-purple-600 dark:text-purple-400'
const Colors = {
    gray: 'bg-purple-50 border-purple-300 text-purple-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-purple-600 ' +
        'dark:bg-purple-700 dark:text-white dark:placeholder-purple-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
    info: 'border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 ' +
        'dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
    failure:
        'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 ' +
        'dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
    warning:
        'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 ' +
        'focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
    success:
        'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 ' +
        'focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
}
export const textInputTheme: FlowbiteTextInputTheme = {
    base: 'flex',
    addon:
    TextInputAddon,
    field: {
        base: 'relative w-full',
        icon: {
            base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
            svg: 'h-5 w-5 text-purple-500 dark:text-purple-400',
        },
        rightIcon: {
            base: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
            svg: 'h-5 w-5 text-purple-500 dark:text-purple-400',
        },
        input: {
            base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
            sizes: {
                sm: 'p-2 sm:text-xs',
                md: 'p-2.5 text-sm',
                lg: 'sm:text-md p-4',
            },
            colors: Colors,
            withRightIcon: {
                on: 'pr-10',
                off: '',
            },
            withIcon: {
                on: 'pl-10',
                off: '',
            },
            withAddon: {
                on: 'rounded-r-lg',
                off: 'rounded-lg',
            },
            withShadow: {
                on: 'shadow-sm dark:shadow-sm-light',
                off: '',
            },
        },
    },
};