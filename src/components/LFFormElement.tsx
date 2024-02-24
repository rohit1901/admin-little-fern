import {PropsWithChildren} from "react";
import {Label} from "flowbite-react";

type LFFormElementProps = {
    labelValue: string;
    labelName: string;
}
const LFFormElement = ({labelValue, labelName, children}: PropsWithChildren<LFFormElementProps>) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label htmlFor={labelName} value={labelValue}/>
            </div>
            {children}
        </div>
    )
}
export default LFFormElement;