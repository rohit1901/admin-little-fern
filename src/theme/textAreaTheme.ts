import {FlowbiteTextareaTheme} from "flowbite-react";
import {DeepPartial} from "flowbite-react/lib/esm/types";

const Colors = {
    gray: 'text-cyan-800 border-gray-200 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-50 ' +
        'dark:focus:border-cyan-50 dark:focus:ring-cyan-50 dark:text-cyan-50 dark:bg-gray-700',
}
export const textareaTheme: DeepPartial<FlowbiteTextareaTheme> = {
    base: 'flex w-full rounded-md border text-sm',
    colors: Colors,
};