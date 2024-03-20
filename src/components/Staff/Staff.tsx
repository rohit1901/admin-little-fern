import {Fragment, useEffect} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {ImageBlock} from "@admin/components/ImageBlock";
import {useStaffStore} from "@admin/store/useStaffStore";
import {API_STAFF_GET} from "@admin/lib/constants";


const Staff = () => {
    const {
        staffDetails,
        staffAssurancesBlock,
        homeTextBlock,
        setStaffAssurancesBlock,
        setHomeTextBlock,
        setAboutTextBlock,
        setStaffDetails,
        staffPageDataId,
        setStaffPageDataId,
        setHomeTextHeadline,
        setHomePageText,
        setHomeSubHeading,
        setStaffDetailsName,
        setStaffDetailsDescription,
        setStaffDetailsRole,
        setStaffAssurancesBlockHeading,
        setStaffAssurancesBlockAssurances,
    } = useStaffStore()
    useEffect(() => {
        if (!staffPageDataId) {
            fetch(API_STAFF_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    setStaffDetails(data.body.staffDetails)
                    setStaffAssurancesBlock(data.body.assurancesBlock)
                    setHomeTextBlock(data.body.homeTextBlock)
                    setAboutTextBlock(data.body.aboutTextBlock)
                    setStaffPageDataId(data.body._id)
                }).catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [])
    return <Fragment>
        <LFFormSection sectionTitle='Featured Staff Block' column>
            <div className="flex flex-row">
                <LFFormElement labelValue="Featured Staff Block Heading"
                               labelName='featuredStaffBlockHeading'
                               elemValue={homeTextBlock?.headline} className="w-full mr-2">
                    <Textarea id="featuredStaffBlockHeading" className='h-text-area'
                              placeholder="Featured Staff Block Heading"
                              value={homeTextBlock?.headline} required
                              onChange={(event) => {
                                  setHomeTextHeadline(event.currentTarget.value)
                              }}/>
                </LFFormElement>
                <LFFormElement labelValue="Featured Staff Block Subheading"
                               labelName='featuredStaffBlockSubHeading'
                               elemValue={homeTextBlock?.subHeading} className="w-full mr-2">
                    <TextInput id="featuredStaffBlockSubHeading" type="text" placeholder="Featured Staff Block Subheading"
                               value={homeTextBlock?.subHeading} required onChange={(event) => {
                        setHomeSubHeading(event.currentTarget.value)
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Featured Staff Block Text"
                               labelName='featuredStaffBlockText'
                               elemValue={homeTextBlock?.text} className="w-full">
                    <Textarea id="featuredStaffBlockText" placeholder="Featured Staff Block Text"
                              className='h-text-area'
                              value={homeTextBlock?.text} required onChange={(event) => {
                        setHomePageText(event.currentTarget.value)
                    }}/>
                </LFFormElement>
            </div>
            {staffDetails?.filter(s => s.featured)?.map(({name, description, _id}) => {
                return (
                    <div className="flex flex-row" key={_id.toString()}>
                        <LFFormElement labelValue="Featured staff name"
                                       labelName={`featuredStaffName${_id.toString()}`} elemValue={name} className="w-full mr-2">
                            <TextInput id={`featuredStaffName${_id.toString()}`}
                                       placeholder="Featured staff name"
                                       value={name} required onChange={(event) => {
                                setStaffDetailsName(_id.toString(), event.currentTarget.value)
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Featured staff description"
                                       labelName={`featuredStaffDescription${_id.toString()}`}
                                       elemValue={description} className="w-full">
                            <Textarea id={`featuredStaffDescription${_id.toString()}`}
                                      placeholder="Featured staff description"
                                      className='h-text-area'
                                      value={description} required onChange={(event) => {
                                setStaffDetailsDescription(_id.toString(), event.currentTarget.value)
                            }}/>
                        </LFFormElement>
                    </div>
                )
            })}
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
        {staffAssurancesBlock?.heading && <LFFormSection sectionTitle='Staff Assurances'>
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
        </LFFormSection>}
    </Fragment>
}
export default Staff;