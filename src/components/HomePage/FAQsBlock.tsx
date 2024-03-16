'use client'
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useHomePageStore} from "@admin/store";

const FAQsBlock = () => {
    const {homePageData: {faqBlock}, setFaqBlockHeading, setFaqQuestion, setFaqAnswer} = useHomePageStore()
    return <LFFormSection sectionTitle={'FAQ Block - FAQs'} row>
        <LFFormElement labelValue="FAQ Heading" labelName='faqHeading'
                       elemValue={faqBlock?.heading} className=" w-1/2 mr-2">
            <Textarea id="faqHeading" placeholder="FAQ Heading" className='h-text-area'
                      value={faqBlock?.heading} required
                      onChange={(event) => setFaqBlockHeading(event.currentTarget.value)}/>
        </LFFormElement>
        <div className="flex flex-col w-full">
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
                                  value={faq.answer} required className='h-text-area-2'
                                  onChange={(event) => setFaqAnswer(faq._id, event.currentTarget.value)}/>
                    </LFFormElement>
                </Fragment>)
            })}</div>
    </LFFormSection>
}
export default FAQsBlock;