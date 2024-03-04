import {DeepPartial} from "flowbite-react/lib/esm/types";
import {FlowbiteTabsTheme} from "flowbite-react";

export const tabsTheme: DeepPartial<FlowbiteTabsTheme> = {
    tablist: {
        tabitem: {
            base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        }
    }
}