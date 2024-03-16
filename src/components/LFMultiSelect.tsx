import {useState} from "react";
import Select, {MultiValue} from "react-select";
import {ReactSelectDarkTheme, ReactSelectTheme} from "@admin/theme/reactSelectTheme";
import {useThemeMode} from "flowbite-react";
import {isDarkMode} from "@admin/lib";

interface SelectOption {
    value: string;
    label: string;
    isDisabled?: boolean;
}

type LFMultiSelectProps = {
    options: string[];
    selected?: string[];
    name?: string;
    onChange: (selectedOptions: string[]) => void;
};
const buildSelectOptions = (options?: string[]): SelectOption[] => {
    return options?.map((option) => {
        return {
            value: option,
            label: option,
        };
    }) ?? [];
}

export const LFMultiSelect = ({options, selected, name, onChange}: LFMultiSelectProps) => {
    const selectOptions = buildSelectOptions(options);
    const [selectedValues, setSelectedValues] =
        useState<MultiValue<SelectOption>>(buildSelectOptions(selected));
    const themeMode = useThemeMode();
    return (
        <Select
            defaultValue={selectedValues}
            isMulti
            name={name ?? "multi-select"}
            options={selectOptions}
            className="m-2 react-select"
            classNamePrefix="select"
            onChange={(selectedOptions) => {
                setSelectedValues(selectedOptions);
                onChange(selectedOptions.map((option) => option.value));
            }}
            theme={(theme) => ({
                ...theme,
                colors: isDarkMode(themeMode?.mode) ? ReactSelectDarkTheme : ReactSelectTheme
            })}
        />
    );
}