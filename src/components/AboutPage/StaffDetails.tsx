'use client'
import LFFormElement from "@admin/components/LFFormElement";
import {Checkbox, Label, Textarea, TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {ImageBlock} from "@admin/components/ImageBlock";
import {useStaffStore} from "@admin/store/useStaffStore";

const StaffDetails = () => {
    const {
        aboutTextBlock,
        staffDetails,
        setAboutTextHeadline,
        setAboutTextText,
        setStaffDetailsName,
        setStaffDetailsRole,
        setStaffDetailsFeatured
    } = useStaffStore()
    return (
        <LFFormSection sectionTitle='Staff Details' addElemButton>
            <div className="lg:flex-grow md:w-1/2 pr-4">
                <LFFormElement labelValue="Heading" labelName='staffHeading' elemValue={aboutTextBlock?.headline}>
                    <TextInput id="staffHeading" type="text" placeholder="Staff heading"
                               value={aboutTextBlock?.headline} required
                               onChange={(event) => setAboutTextHeadline(event.target.value)}/>
                </LFFormElement>

                <LFFormElement labelValue="Sub-heading" labelName='staffSubHeading' elemValue={aboutTextBlock?.text}>
                    <Textarea id="staffSubHeading" placeholder="Staff sub-heading"
                              value={aboutTextBlock?.text} required className='h-text-area'
                              onChange={(event) => setAboutTextText(event.target.value)}/>
                </LFFormElement>
            </div>
            {staffDetails?.map(({
                                    name,
                                    portraitImage,
                                    image,
                                    featured,
                                    role, _id
                                }) => {
                return (
                    <div key={_id.toString()} className="sm:w-1/2 px-4">
                        <LFFormElement labelValue="Staff name" labelName={`staffName-${_id.toString()}`}
                                       elemValue={name}>
                            <TextInput id={`staffName-${_id.toString()}`} type="text" placeholder="Staff name"
                                       value={name} required
                                       onChange={(event) => setStaffDetailsName(_id.toString(), event.target.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Staff role" labelName={`staffRole-${_id.toString()}`}
                                       elemValue={role}>
                            <TextInput id={`staffRole-${_id.toString()}`} type="text" placeholder="Staff role"
                                       value={role} required
                                       onChange={(event) => setStaffDetailsRole(_id.toString(), event.target.value)}/>
                        </LFFormElement>
                        <div className="flex pt-4">
                            <Checkbox id={`staffFeatured-${_id.toString()}`} checked={featured} className="mr-2"
                                      onChange={(event) => setStaffDetailsFeatured(_id.toString(), event.target.checked)}/>
                            <Label htmlFor={`staffFeatured-${_id.toString()}`} className="flex" disabled>
                                Show as Featured Staff on the website homepage?
                            </Label>
                        </div>
                        <ImageBlock imagePath={portraitImage}/>
                        <ImageBlock imagePath={image}/>
                    </div>
                )
            })}
        </LFFormSection>
    )
}
export default StaffDetails
