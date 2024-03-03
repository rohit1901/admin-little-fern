import {PropsWithChildren} from "react";
import {Label} from "flowbite-react";

type LFFormElementProps = {
    labelValue?: string;
    labelName: string;
    elemValue?: string;
}
const LFFormElement = ({labelValue, labelName, elemValue, children}: PropsWithChildren<LFFormElementProps>) => {
    return (
        <div>
            <div className="my-2 block">
                {labelValue && <Label className="text-cyan-800" htmlFor={labelName} value={labelValue}/>}
                <div
                    className="h-1 w-10 bg-cyan-700 rounded hover:bg-cyan-500 dark:bg-cyan-50 dark:hover:bg-cyan-500"></div>
            </div>
            {elemValue && children}
        </div>
    )
}
export default LFFormElement;