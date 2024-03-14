import {DeepPartial} from "flowbite-react/lib/esm/types";
import {FlowbiteButtonTheme} from "flowbite-react";

export const buttonTheme: DeepPartial<FlowbiteButtonTheme> = {
    base: "bg-cyan-800 text-cyan-50 m-2 dark:bg-cyan-50 dark:text-cyan-900 dark:hover:bg-cyan-800 dark:hover:text-cyan-800",
    inner: {
        outline: "bg-cyan-800 text-cyan-50 dark:bg-cyan-50 dark:text-cyan-800 dark:hover:bg-cyan-800 dark:hover:text-cyan-800"
    }
}