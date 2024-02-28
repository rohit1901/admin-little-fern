'use client'
import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import LFFormSection from "@admin/components/LFFormSection";
import {useAboutPageStore} from "@admin/store/useAboutPageStore";

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
            <LFFormElement labelValue="Heading" labelName='staffHeading'>
                <TextInput id="staffHeading" type="text" placeholder="Staff heading"
                           value={staffBlock?.heading} required
                           onChange={(event) => setStaffBlockHeading(event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Sub-heading" labelName='staffSubHeading'>
                <TextInput id="staffSubHeading" type="text" placeholder="Staff sub-heading"
                           value={staffBlock?.subHeading} required
                           onChange={(event) => setStaffBlockSubHeading(event.target.value)}/>
            </LFFormElement>
            {staffBlock?.staffDetails?.map(({
                                                name,
                                                portraitImage,
                                                image,
                                                role, _id
                                            }) => {
                return (
                    <Fragment key={_id.toString()}>
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
                        <Dropzone imagePath={portraitImage} withPopover/>
                        <Dropzone imagePath={image} withPopover/>
                    </Fragment>
                )
            })}
        </LFFormSection>
    )
}
export default StaffDetails
