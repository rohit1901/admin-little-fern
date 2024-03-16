import {CustomFlowbiteTheme} from "flowbite-react";
import {tabsTheme} from "@admin/theme/tabsTheme";
import {buttonTheme} from "@admin/theme/button";
import {sidebarTheme} from "@admin/theme/sidebarTheme";
import {textInputTheme} from "@admin/theme/textInputTheme";
import {textareaTheme} from "@admin/theme/textAreaTheme";
import {dropdownTheme} from "@admin/theme/dropdownTheme";

export const customTheme: CustomFlowbiteTheme = {
    textInput: textInputTheme,
    textarea: textareaTheme,
    tabs: tabsTheme,
    button: buttonTheme,
    sidebar: sidebarTheme,
    dropdown: dropdownTheme
}