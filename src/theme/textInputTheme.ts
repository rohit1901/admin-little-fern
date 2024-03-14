import {FlowbiteTextInputTheme} from "flowbite-react";
import {DeepPartial} from "flowbite-react/lib/esm/types";

const Colors = {
    gray: 'text-cyan-800 border-gray-200 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-50 ' +
        'dark:focus:border-cyan-50 dark:focus:ring-cyan-50 dark:text-cyan-50 dark:bg-gray-700',
}
export const textInputTheme: DeepPartial<FlowbiteTextInputTheme> = {
    base: 'flex',
    field: {
        base: 'relative w-full',
        icon: {
            base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
        },
        rightIcon: {
            base: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
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