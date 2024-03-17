import LFFormElement from "@admin/components/LFFormElement";
import {Checkbox, Label, Textarea, TextInput} from "flowbite-react";
import {ImageBlock} from "@admin/components/ImageBlock";

export const NewStaff = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <LFFormElement labelValue="Heading" labelName='staffHeading' elemValue={""} className="w-full mr-2">
                    <TextInput id="staffHeading" type="text" placeholder="Staff heading"
                               value={""} required
                               onChange={(event) => console.log(event.target.value)}/>
                </LFFormElement>

                <LFFormElement labelValue="Sub-heading" labelName='staffSubHeading' elemValue={""} className="w-full mr-2">
                    <Textarea id="staffSubHeading" placeholder="Staff sub-heading"
                              value={""} required className='h-text-area'
                              onChange={(event) => console.log(event.target.value)}/>
                </LFFormElement>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col mr-2 w-1/2">
                    <LFFormElement labelValue="Staff name" labelName={`staffName`}
                                   elemValue={""}>
                        <TextInput id={`staffName`} type="text" placeholder="Staff name"
                                   value={""} required
                                   onChange={(event) => console.log(event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Staff role" labelName={`staffRole`}
                                   elemValue={""}>
                        <TextInput id={`staffRole`} type="text" placeholder="Staff role"
                                   value={""} required
                                   onChange={(event) => console.log(event.target.value)}/>
                    </LFFormElement>
                    <div className="flex pt-4">
                        <Checkbox id={`staffFeatured-`} checked={false} className="mr-2"
                                  onChange={(event) => console.log(event.target.checked)}/>
                        <Label htmlFor={`staffFeatured-`} className="flex" disabled>
                            Show as Featured Staff on the website homepage?
                        </Label>
                    </div>
                </div>

                <div className="mr-2 w-1/2">
                    <ImageBlock dropzone={false}/>
                </div>
                <div className="mr-2 w-1/2">
                    <ImageBlock dropzone={false}/>
                </div>
            </div>
        </div>
    )
}