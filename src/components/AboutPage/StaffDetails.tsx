'use client'
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {useAboutPageStore} from "@admin/store/useAboutPageStore";
import {ImageBlock} from "@admin/components/ImageBlock";

const StaffDetails = () => {
    const {
        aboutPageData: {staffBlock},
        setStaffBlockHeading,
        setStaffBlockSubHeading,
        setStaffBlockName,
        setStaffBlockRole
    } = useAboutPageStore()
    return (
        <LFFormSection sectionTitle='Staff Details'>
            <div className="lg:flex-grow md:w-1/2 pr-4">
                <LFFormElement labelValue="Heading" labelName='staffHeading'>
                    <TextInput id="staffHeading" type="text" placeholder="Staff heading"
                               value={staffBlock?.heading} required
                               onChange={(event) => setStaffBlockHeading(event.target.value)}/>
                </LFFormElement>

                <LFFormElement labelValue="Sub-heading" labelName='staffSubHeading'>
                    <Textarea id="staffSubHeading" placeholder="Staff sub-heading"
                              value={staffBlock?.subHeading} required className='h-text-area'
                              onChange={(event) => setStaffBlockSubHeading(event.target.value)}/>
                </LFFormElement>
            </div>
            {staffBlock?.staffDetails?.map(({
                                                name,
                                                portraitImage,
                                                image,
                                                role, _id
                                            }) => {
                return (
                    <div key={_id.toString()} className="sm:w-1/2 px-4">
                        <LFFormElement labelValue="Staff name" labelName='staffName'>
                            <TextInput id="staffName" type="text" placeholder="Staff name"
                                       value={name} required
                                       onChange={(event) => setStaffBlockName(_id.toString(), event.target.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Staff role" labelName='staffRole'>
                            <TextInput id="staffRole" type="text" placeholder="Staff role"
                                       value={role} required
                                       onChange={(event) => setStaffBlockRole(_id.toString(), event.target.value)}/>
                        </LFFormElement>
                        <ImageBlock imagePath={portraitImage}/>
                        <ImageBlock imagePath={image}/>
                    </div>
                )
            })}
        </LFFormSection>
    )
}
export default StaffDetails
