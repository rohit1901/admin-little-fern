'use client'
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useHomePageStore} from "@admin/store";

const FAQsBlock = () => {
    const {homePageData: {faqBlock}, setFaqBlockHeading, setFaqQuestion, setFaqAnswer} = useHomePageStore()
    return <LFFormSection sectionTitle={'FAQ Block - FAQs'}>
        <div className="p-4 lg:w-1/3 md:w-full"><LFFormElement labelValue="FAQ Heading" labelName='faqHeading'
                                                               elemValue={faqBlock?.heading}>
            <Textarea id="faqHeading" placeholder="FAQ Heading" className='h-text-area'
                      value={faqBlock?.heading} required
                      onChange={(event) => setFaqBlockHeading(event.currentTarget.value)}/>
        </LFFormElement>
        </div>
        <div className="p-4 lg:w-2/2 md:w-full">
            {faqBlock?.faqs?.map((faq) => {
                return (<Fragment key={faq._id.toString()}>
                    <LFFormElement labelValue="FAQ Question" labelName={`faqQuestion${faq._id.toString()}`}
                                   elemValue={faq.question}>
                        <TextInput id={`faqQuestion${faq._id.toString()}`} type="text" placeholder="FAQ Question"
                                   value={faq.question} required
                                   onChange={(event) => setFaqQuestion(faq._id, event.currentTarget.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="FAQ Answer" labelName={`faqAnswer${faq._id.toString()}`}
                                   elemValue={faq.answer}>
                        <Textarea id={`faqAnswer${faq._id.toString()}`} placeholder="FAQ Answer"
                                  value={faq.answer} required className='h-text-area'
                                  onChange={(event) => setFaqAnswer(faq._id, event.currentTarget.value)}/>
                    </LFFormElement>
                </Fragment>)
            })}</div>
    </LFFormSection>
}
export default FAQsBlock;