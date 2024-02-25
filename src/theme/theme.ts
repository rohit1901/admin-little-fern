import {CustomFlowbiteTheme, FlowbiteTextInputTheme} from "flowbite-react";
import {DeepPartial} from "flowbite-react/lib/esm/types";

const customTextInputTheme: DeepPartial<FlowbiteTextInputTheme> = {
    field: {
        input: {
            base: "w-full text-cyan-100 dark:text-cyan-900",
        }
    }
}
export const customTheme: CustomFlowbiteTheme = {
    textInput: customTextInputTheme,
}