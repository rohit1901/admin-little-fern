import {FlowbitePopoverTheme} from "@admin/components/Popover";

const BaseStyles = 'absolute z-20 inline-block w-max max-w-[100vw] ' +
    'bg-white outline-none border border-gray-200 rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-800'
const ArrowBaseStyles = 'absolute h-2 w-2 z-0 rotate-45 mix-blend-lighten bg-white ' +
    'border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color'
export const popoverTheme: FlowbitePopoverTheme = {
    base: BaseStyles,
    content: 'z-10 overflow-hidden rounded-[7px]',
    arrow: {
        base: ArrowBaseStyles,
        placement: '-4px',
    },
};