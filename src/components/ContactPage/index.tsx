'use client'
import {ContactPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {useContactPageStore} from "@admin/store/useContactPageStore";
import {useEffect} from "react";

type ContactPageProps = {
    contactPageData: ContactPageData
}
const ContactPageComponent = ({contactPageData}: ContactPageProps) => {
    const {
        contactPageData: {contactInformation, textBlock},
        setContactPageData,
        setHeroTagline,
        setHeroHeadline,
        setHeroText,
        setContactInformationAddress,
        setContactInformationPhone,
        setContactInformationEmail,
        setTextBlockHeadline,
        setTextBlockText
    } = useContactPageStore()
    useEffect(() => {
        setContactPageData(contactPageData)
    }, [])
    return (
        <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <LFForm>
                <LFFormSection sectionTitle={'Contact Page Text'}>
                    {/* Hero properties */}
                    <LFFormElement labelValue="Title" labelName="contact-events-title">
                        <TextInput id="contact-events-title" placeholder="Title"
                                   value={textBlock?.headline} required
                                   onChange={(event) => setTextBlockHeadline(event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Description" labelName="contact-events-description">
                        <TextInput id="contact-events-description" placeholder="Description"
                                   value={textBlock?.text} required
                                   onChange={(event) => setTextBlockText(event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Address" labelName="contact-address">
                        <TextInput id="contact-address" placeholder="Address"
                                   value={contactInformation?.address} required
                                   onChange={(event) => setContactInformationAddress(event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Phone" labelName="contact-phone">
                        <TextInput id="contact-phone" placeholder="Phone"
                                   value={contactInformation?.phone} required
                                   onChange={(event) => setContactInformationPhone(event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Email" labelName="contact-email">
                        <TextInput id="contact-email" placeholder="Email"
                                   value={contactInformation?.email} required
                                   onChange={(event) => setContactInformationEmail(event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Tagline" labelName="contact-hero-tagline">
                        <TextInput id="contact-hero-tagline" placeholder="Tagline for the Hero Block"
                                   value={contactInformation?.hero?.tagline} required
                                   onChange={(event) => setHeroTagline(event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Headline" labelName="contact-hero-headline">
                        <TextInput id="contact-hero-headline" placeholder="Headline for the Hero Block"
                                   value={contactInformation?.hero?.headline} required
                                   onChange={(event) => setHeroHeadline(event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Text" labelName="contact-hero-text">
                        <TextInput id="contact-hero-text" placeholder="Text for the Hero Block" className="h-text-area"
                                   value={contactInformation?.hero?.text} required
                                   onChange={(event) => setHeroText(event.target.value)}/>
                    </LFFormElement>
                </LFFormSection>
            </LFForm>
        </div>
    );
}
export default ContactPageComponent