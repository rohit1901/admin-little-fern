import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import {useHomePageStore} from "@admin/store";

const Staff = () => {
    const {
        homePageData: {staff},
        setFeaturedStaffDescription,
        setFeaturedStaffName,
        setStaffDetailsName,
        setStaffDetailsRole,
        setStaffAssurancesBlockHeading,
        setStaffAssurancesBlockAssurances
    } = useHomePageStore(state => state)
    return <Fragment>
        <LFFormSection sectionTitle='Featured Staff Block'>
            {staff?.featuredStaffDescription?.map(({name, description, _id}) => {
                return (
                    <Fragment key={_id.toString()}>
                        <LFFormElement labelValue="Featured staff name"
                                       labelName={`featuredStaffName${_id.toString()}`}>
                            <TextInput id={`featuredStaffName${_id.toString()}`} type="text"
                                       placeholder="Featured staff name"
                                       value={name} required onChange={(event) => {
                                setFeaturedStaffName(_id, event.currentTarget.value)
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Featured staff description"
                                       labelName={`featuredStaffDescription${_id.toString()}`}>
                            <TextInput id={`featuredStaffDescription${_id.toString()}`} type="text"
                                       placeholder="Featured staff description"
                                       value={description} required onChange={(event) => {
                                setFeaturedStaffDescription(_id, event.currentTarget.value)
                            }}/>
                        </LFFormElement>
                    </Fragment>
                )
            })}
        </LFFormSection>
        {/*Staff Details*/}
        <LFFormSection sectionTitle='Staff Details'>
            {staff?.staffDetails?.map(({
                                           name,
                                           portraitImage,
                                           image,
                                           role, _id
                                       }) => {
                return (
                    <Fragment key={_id.toString()}>
                        <LFFormElement labelValue="Staff name" labelName={`staffName${_id.toString()}`}>
                            <TextInput id={`staffName${_id.toString()}`} type="text" placeholder="Staff name"
                                       value={name} required onChange={(event) => {
                                setStaffDetailsName(_id, event.currentTarget.value)
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Staff role" labelName={`staffRole${_id.toString()}`}>
                            <TextInput id={`staffRole${_id.toString()}`} type="text" placeholder="Staff role"
                                       value={role} required onChange={(event) => {
                                setStaffDetailsRole(_id, event.currentTarget.value)
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
            {staff?.assurancesBlock?.heading &&
                <LFFormElement labelValue="Staff Assurances Block Heading" labelName='staffAssurancesBlockHeading'>
                    <Textarea id="staffAssurancesBlockHeading" className='h-text-area'
                              placeholder="Staff Assurances Block Heading"
                              value={staff?.assurancesBlock?.heading} required
                              onChange={(event) => {
                                  setStaffAssurancesBlockHeading(event.currentTarget.value)
                              }}/>
                </LFFormElement>}
            {staff?.assurancesBlock?.assurances &&
                <LFFormElement labelValue="Staff Assurance" labelName='staffAssuranceText'>
                    <Textarea id="staffAssuranceText" placeholder="Staff Assurance" className='h-text-area'
                              value={staff?.assurancesBlock?.assurances} required onChange={(event) => {
                        setStaffAssurancesBlockAssurances(event.currentTarget.value)
                    }}/>
                </LFFormElement>}
        </LFFormSection>
    </Fragment>
}
export default Staff;