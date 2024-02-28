import {PropsWithChildren} from "react";
import {Label} from "flowbite-react";

type LFFormElementProps = {
    labelValue?: string;
    labelName: string;
}
const LFFormElement = ({labelValue, labelName, children}: PropsWithChildren<LFFormElementProps>) => {
    return (
        <div>
            <div className="mb-2 block">
                {labelValue && <Label htmlFor={labelName} value={labelValue}/>}
            </div>
            {children}
        </div>
    )
}
export default LFFormElement;
/*
const LFFormElement = ({labelValue, labelName, children, textArea, onChange}: PropsWithChildren<LFFormElementProps>) => {
    return (
        labelValue ?
            <div>
                <div className="mb-2 block">
                    {labelValue && <Label htmlFor={labelName} value={labelValue} className="leading-7 text-sm text-gray-600"/>}
                </div>
                {!textArea ? <TextInput id="tagline" type="text" placeholder="Tagline for the Hero Block"
                                        value={labelValue} required onChange={onChange}/> :
                    <Textarea id="description" placeholder="Description for the About Page" className='h-text-area'
                              value={labelValue} required onChange={onChange}/>}
            </div> : <Spinner size={32} className="text-center"/>
    )
}
*/