'use client'
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useHomePageStore} from "@admin/store";

const FAQsBlock = () => {
    const {homePageData: {faqBlock}, setFaqBlockHeading, setFaqQuestion, setFaqAnswer} = useHomePageStore()
    return <Fragment>
        <LFFormSection sectionTitle={'FAQ Block - Heading'}>
            <LFFormElement labelValue="FAQ Heading" labelName='faqHeading'>
                <TextInput id="faqHeading" type="text" placeholder="FAQ Heading"
                           value={faqBlock?.heading} required
                           onChange={(event) => setFaqBlockHeading(event.currentTarget.value)}/>
            </LFFormElement>
        </LFFormSection>
        <LFFormSection sectionTitle={'FAQ Block - FAQs'}>
            {faqBlock?.faqs?.map((faq) => {
                return (<Fragment key={faq._id.toString()}>
                    <LFFormElement labelValue="FAQ Question" labelName='faqQuestion'>
                        <TextInput id="faqQuestion" type="text" placeholder="FAQ Question"
                                   value={faq.question} required
                                   onChange={(event) => setFaqQuestion(faq._id, event.currentTarget.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="FAQ Answer" labelName='faqAnswer'>
                        <Textarea id="faqAnswer" placeholder="FAQ Answer"
                                  value={faq.answer} required
                                  onChange={(event) => setFaqAnswer(faq._id, event.currentTarget.value)}/>
                    </LFFormElement>
                </Fragment>)
            })}
        </LFFormSection>
    </Fragment>
}
export default FAQsBlock;