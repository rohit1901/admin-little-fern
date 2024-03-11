import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {ImageBlock} from "@admin/components/ImageBlock";
import {useStaffStore} from "@admin/store/useStaffStore";


const Staff = () => {
    const {
        staffDetails,
        staffAssurancesBlock,
        homeTextBlock,
        aboutTextBlock,
        setHomeTextHeadline,
        setHomePageText,
        setHomeSubHeading,
        setAboutTextHeadline,
        setAboutPageText,
        setAboutSubHeading,
        setStaffDetailsName,
        setStaffDetailsDescription,
        setStaffDetailsRole,
        setStaffAssurancesBlockHeading,
        setStaffAssurancesBlockAssurances, setStaffDetailsFeatured
    } = useStaffStore()
    return <Fragment>
        <LFFormSection sectionTitle='Featured Staff Block'>
            <div
                className="w-full md:pr-12 md:py-8 md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-200">
                <LFFormElement labelValue="Featured Staff Block Heading"
                               labelName='featuredStaffBlockHeading'
                               elemValue={homeTextBlock.headline}>
                    <Textarea id="featuredStaffBlockHeading" className='h-text-area'
                              placeholder="Featured Staff Block Heading"
                              value={homeTextBlock.headline} required
                              onChange={(event) => {
                                  setHomeTextHeadline(event.currentTarget.value)
                              }}/>
                </LFFormElement>
                <LFFormElement labelValue="Featured Staff Block Subheading"
                               labelName='featuredStaffBlockSubHeading'
                               elemValue={homeTextBlock.subHeading}>
                    <TextInput id="featuredStaffBlockSubHeading" type="text" placeholder="Featured Staff Block Subheading"
                               value={homeTextBlock.subHeading} required onChange={(event) => {
                        setHomeSubHeading(event.currentTarget.value)
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Featured Staff Block Text"
                               labelName='featuredStaffBlockText'
                               elemValue={homeTextBlock.text}>
                    <Textarea id="featuredStaffBlockText" placeholder="Featured Staff Block Text"
                              className='h-text-area'
                              value={homeTextBlock.text} required onChange={(event) => {
                        setHomePageText(event.currentTarget.value)
                    }}/>
                </LFFormElement>
                {staffDetails?.filter(s => s.featured)?.map(({name, description, _id}) => {
                    return (
                        <Fragment key={_id.toString()}>
                            <LFFormElement labelValue="Featured staff name"
                                           labelName={`featuredStaffName${_id.toString()}`} elemValue={name}>
                                <TextInput id={`featuredStaffName${_id.toString()}`}
                                           placeholder="Featured staff name"
                                           value={name} required onChange={(event) => {
                                    setStaffDetailsName(_id.toString(), event.currentTarget.value)
                                }}/>
                            </LFFormElement>
                            <LFFormElement labelValue="Featured staff description"
                                           labelName={`featuredStaffDescription${_id.toString()}`}
                                           elemValue={description}>
                                <Textarea id={`featuredStaffDescription${_id.toString()}`}
                                          placeholder="Featured staff description"
                                          className='h-text-area'
                                          value={description} required onChange={(event) => {
                                    setStaffDetailsDescription(_id.toString(), event.currentTarget.value)
                                }}/>
                            </LFFormElement>
                        </Fragment>
                    )
                })}
            </div>
        </LFFormSection>
        {/*Staff Details*/}
        <LFFormSection sectionTitle='Featured Staff Details'>
            {staffDetails?.filter(s => s.featured)?.map(({
                                                             name,
                                                             portraitImage,
                                                             image,
                                                             role, _id
                                                         }) => {
                return (
                    <div key={_id.toString()} className="sm:w-1/2 px-4">
                        <LFFormElement labelValue="Staff name" labelName={`staffName${_id.toString()}`}
                                       elemValue={name}>
                            <TextInput id={`staffName${_id.toString()}`} type="text" placeholder="Staff name"
                                       value={name} required onChange={(event) => {
                                setStaffDetailsName(_id.toString(), event.currentTarget.value)
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Staff role" labelName={`staffRole${_id.toString()}`}
                                       elemValue={role}>
                            <TextInput id={`staffRole${_id.toString()}`} type="text" placeholder="Staff role"
                                       value={role} required onChange={(event) => {
                                setStaffDetailsRole(_id.toString(), event.currentTarget.value)
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
            <div className="p-4 lg:w-1/2 md:w-full">
                <LFFormElement labelValue="Staff Assurances Block Heading"
                               labelName='staffAssurancesBlockHeading'
                               elemValue={staffAssurancesBlock?.heading}>
                    <Textarea id="staffAssurancesBlockHeading" className='h-text-area'
                              placeholder="Staff Assurances Block Heading"
                              value={staffAssurancesBlock?.heading} required
                              onChange={(event) => {
                                  setStaffAssurancesBlockHeading(event.currentTarget.value)
                              }}/>
                </LFFormElement>
            </div>
            <div className="p-4 lg:w-1/2 md:w-full">
                <LFFormElement labelValue="Staff Assurance"
                               labelName='staffAssuranceText'
                               elemValue={staffAssurancesBlock?.assurances?.toString()}>
                    <Textarea id="staffAssuranceText" placeholder="Staff Assurance" className='h-text-area'
                              value={staffAssurancesBlock?.assurances} required onChange={(event) => {
                        setStaffAssurancesBlockAssurances(event.currentTarget.value)
                    }}/>
                </LFFormElement>
            </div>
        </LFFormSection>
    </Fragment>
}
export default Staff;