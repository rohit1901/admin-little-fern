import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useHomePageStore} from "@admin/store";
import {ImageBlock} from "@admin/components/ImageBlock";

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
            <div
                className="md:w-1/2 md:pr-12 md:py-8 md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-200">
                {staff?.featuredStaffDescription?.map(({name, description, _id}) => {
                    return (
                        <Fragment key={_id.toString()}>
                            <LFFormElement labelValue="Featured staff name"
                                           labelName={`featuredStaffName${_id.toString()}`}>
                                <TextInput id={`featuredStaffName${_id.toString()}`}
                                           placeholder="Featured staff name"
                                           value={name} required onChange={(event) => {
                                    setFeaturedStaffName(_id, event.currentTarget.value)
                                }}/>
                            </LFFormElement>
                            <LFFormElement labelValue="Featured staff description"
                                           labelName={`featuredStaffDescription${_id.toString()}`}>
                                <Textarea id={`featuredStaffDescription${_id.toString()}`}
                                          placeholder="Featured staff description"
                                          className='h-text-area'
                                          value={description} required onChange={(event) => {
                                    setFeaturedStaffDescription(_id, event.currentTarget.value)
                                }}/>
                            </LFFormElement>
                        </Fragment>
                    )
                })}
            </div>
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
                    <div key={_id.toString()} className="sm:w-1/2 px-4">
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
                        <ImageBlock imagePath={portraitImage}/>
                        <ImageBlock imagePath={image}/>
                    </div>
                )
            })}
        </LFFormSection>
        {/*Staff Assurances Block */}
        <LFFormSection sectionTitle='Staff Assurances'>
            {staff?.assurancesBlock?.heading &&
                <div className="p-4 lg:w-1/2 md:w-full"><LFFormElement labelValue="Staff Assurances Block Heading"
                                                                       labelName='staffAssurancesBlockHeading'>
                    <Textarea id="staffAssurancesBlockHeading" className='h-text-area'
                              placeholder="Staff Assurances Block Heading"
                              value={staff?.assurancesBlock?.heading} required
                              onChange={(event) => {
                                  setStaffAssurancesBlockHeading(event.currentTarget.value)
                              }}/>
                </LFFormElement></div>}
            {staff?.assurancesBlock?.assurances &&
                <div className="p-4 lg:w-1/2 md:w-full"><LFFormElement labelValue="Staff Assurance"
                                                                       labelName='staffAssuranceText'>
                    <Textarea id="staffAssuranceText" placeholder="Staff Assurance" className='h-text-area'
                              value={staff?.assurancesBlock?.assurances} required onChange={(event) => {
                        setStaffAssurancesBlockAssurances(event.currentTarget.value)
                    }}/>
                </LFFormElement></div>}
        </LFFormSection>
    </Fragment>
}
export default Staff;