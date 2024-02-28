'use client'
import LFFormSection from "@admin/components/LFFormSection";
import {Textarea, TextInput} from "flowbite-react";
import LFFormElement from "@admin/components/LFFormElement";
import {Fragment} from "react";
import {useAboutPageStore} from "@admin/store/useAboutPageStore";
import {ImageBlock} from "@admin/components/ImageBlock";

const AboutValueData = () => {
    const {
        aboutPageData: {valueData},
        setValueDataHeading,
        setValueDataSubHeading,
        setValueDataValue,
        setValueDataDescription
    } = useAboutPageStore()
    return (
        <LFFormSection sectionTitle={'Value Data'}>
            <div className="lg:flex-grow md:w-1/3 pr-4">
                <LFFormElement labelValue='Heading' labelName='value-heading'>
                    <TextInput id="value-heading" placeholder="Title for the Hero Block"
                               value={valueData?.heading} required
                               onChange={(event) => setValueDataHeading(event.target.value)}/>
                </LFFormElement>
                <LFFormElement labelValue='Sub-heading' labelName='value-sub-heading'>
                    <Textarea id="value-sub-heading" placeholder="sub-heading for the Hero Block"
                              className="h-text-area"
                              value={valueData?.subHeading} required
                              onChange={(event) => setValueDataSubHeading(event.target.value)}/>
                </LFFormElement>
                <ImageBlock imagePath={valueData?.image.src}/>
            </div>
            <div className="lg:flex-grow md:w-2/3 pr-4">
                {valueData?.values.map((value) => {
                    return (<Fragment key={value._id.toString()}>
                        <LFFormElement labelValue='Value' labelName='value-value'>
                            <TextInput id="value-value" placeholder="Value for the Value"
                                       value={value.value} required
                                       onChange={(event) => setValueDataValue(value._id.toString(), event.target.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue='Description' labelName='value-description'>
                            <Textarea id="value-description" placeholder="Description for the Value"
                                      className="h-text-area"
                                      value={value.description} required
                                      onChange={(event) => setValueDataDescription(value._id.toString(), event.target.value)}/>
                        </LFFormElement>
                    </Fragment>)
                })}
            </div>
        </LFFormSection>
    )

}
export default AboutValueData;