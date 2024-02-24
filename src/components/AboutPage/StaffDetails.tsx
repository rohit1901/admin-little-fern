import {StaffBlock} from "@admin/types";
import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import LFFormSection from "@admin/components/LFFormSection";

type StaffDetailsProps = {
    staffBlock: StaffBlock
}
const StaffDetails = ({staffBlock}: StaffDetailsProps) => {
    return (
        <LFFormSection sectionTitle='Staff Details'>
            <LFFormElement labelValue="Heading" labelName='staffHeading'>
                <TextInput id="staffHeading" type="text" placeholder="Staff heading"
                           value={staffBlock.heading} required onChange={(event) => {
                    // update the name
                }}/>
            </LFFormElement>
            <LFFormElement labelValue="Sub-heading" labelName='staffSubHeading'>
                <TextInput id="staffSubHeading" type="text" placeholder="Staff sub-heading"
                           value={staffBlock.subHeading} required onChange={(event) => {
                    // update the name
                }}/>
            </LFFormElement>
            {staffBlock.staffDetails?.map(({
                                               name,
                                               portraitImage,
                                               image,
                                               role
                                           }) => {
                return (
                    <Fragment key={`staff-details-${name}`}>
                        <LFFormElement labelValue="Staff name" labelName='staffName'>
                            <TextInput id="staffName" type="text" placeholder="Staff name"
                                       value={name} required onChange={(event) => {
                                // update the name
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Staff role" labelName='staffRole'>
                            <TextInput id="staffRole" type="text" placeholder="Staff role"
                                       value={role} required onChange={(event) => {
                                // update the name
                            }}/>
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
