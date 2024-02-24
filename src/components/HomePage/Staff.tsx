import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import {Staff} from "@admin/types";

type StaffProps = {
    staff: Staff
}
const Staff = ({staff}: StaffProps) => {
    return <Fragment>
        <LFFormSection sectionTitle='Featured Staff Block'>
            {staff.featuredStaffDescription?.map(({name, description}) => {
                return (
                    <Fragment key={name}>
                        <LFFormElement labelValue="Featured staff name" labelName='featuredStaffName'>
                            <TextInput id="featuredStaffName" type="text"
                                       placeholder="Featured staff name"
                                       value={name} required onChange={(event) => {
                                // update the name
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Featured staff description"
                                       labelName='featuredStaffDescription'>
                            <TextInput id="featuredStaffDescription" type="text"
                                       placeholder="Featured staff description"
                                       value={description} required onChange={(event) => {
                                // update the name
                            }}/>
                        </LFFormElement>
                    </Fragment>
                )
            })}
        </LFFormSection>
        {/*Staff Details*/}
        <LFFormSection sectionTitle='Staff Details'>
            {staff.staffDetails?.map(({
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
        {/*Staff Assurances Block */}
        <LFFormSection sectionTitle='Staff Assurances'>
            <LFFormElement labelValue="Staff Assurances Block Heading" labelName='staffAssurancesBlockHeading'>
                <TextInput id="staffAssurancesBlockHeading" type="text"
                           placeholder="Staff Assurances Block Heading"
                           value={staff.assurancesBlock?.heading} required
                           onChange={(event) => {
                               // update the name
                           }}/>
            </LFFormElement>
            {staff.assurancesBlock?.assurances?.map((assurance) => {
                return (<Fragment key={assurance}>
                    <LFFormElement labelValue="Staff Assurance" labelName='staffAssuranceText'>
                        <TextInput id="staffAssuranceText" type="text" placeholder="Staff Assurance"
                                   value={assurance} required onChange={(event) => {
                            // update the name
                        }}/>
                    </LFFormElement>
                </Fragment>)
            })}
        </LFFormSection>
    </Fragment>
}
export default Staff;