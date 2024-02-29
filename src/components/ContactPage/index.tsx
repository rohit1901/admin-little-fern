'use client'
import {ContactPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
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
                    {/* Map */}
                    <div
                        className="lg:w-2/3 md:w-2/3 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <iframe loading="lazy" width="100%" height="100%"
                                className="absolute inset-0 grayscale opacity-20" title="map"
                                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"></iframe>
                        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md dark:bg-gray-800">
                            <div className="lg:w-1/2 px-6">
                                {contactInformation?.address &&
                                    <LFFormElement labelValue="Address" labelName="contact-address">
                                        <Textarea id="contact-address" placeholder="Address"
                                                  value={contactInformation?.address} required className="h-text-area"
                                                  onChange={(event) => setContactInformationAddress(event.target.value)}/>
                                    </LFFormElement>}
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                {contactInformation?.phone &&
                                    <LFFormElement labelValue="Phone" labelName="contact-phone">
                                        <TextInput id="contact-phone" placeholder="Phone"
                                                   value={contactInformation?.phone} required
                                                   onChange={(event) => setContactInformationPhone(event.target.value)}/>
                                    </LFFormElement>}
                                {contactInformation?.email &&
                                    <LFFormElement labelValue="Email" labelName="contact-email">
                                        <TextInput id="contact-email" placeholder="Email"
                                                   value={contactInformation?.email} required
                                                   onChange={(event) => setContactInformationEmail(event.target.value)}/>
                                    </LFFormElement>}
                            </div>
                        </div>
                    </div>
                    {/* Properties */}
                    <div
                        className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 dark:bg-gray-800">
                        {contactInformation?.hero?.tagline &&
                            <LFFormElement labelValue="Tagline" labelName="contact-hero-tagline">
                                <TextInput id="contact-hero-tagline" placeholder="Tagline for the Hero Block"
                                           value={contactInformation?.hero?.tagline} required
                                           onChange={(event) => setHeroTagline(event.target.value)}/>
                            </LFFormElement>}
                        {contactInformation?.hero?.headline &&
                            <LFFormElement labelValue="Headline" labelName="contact-hero-headline">
                                <TextInput id="contact-hero-headline" placeholder="Headline for the Hero Block"
                                           value={contactInformation?.hero?.headline} required
                                           onChange={(event) => setHeroHeadline(event.target.value)}/>
                            </LFFormElement>}
                        {contactInformation?.hero?.text &&
                            <LFFormElement labelValue="Text" labelName="contact-hero-text">
                                <Textarea id="contact-hero-text" placeholder="Text for the Hero Block"
                                          className="h-text-area"
                                          value={contactInformation?.hero?.text} required
                                          onChange={(event) => setHeroText(event.target.value)}/>
                            </LFFormElement>}
                        {textBlock?.headline && <LFFormElement labelValue="Title" labelName="contact-events-title">
                            <TextInput id="contact-events-title" placeholder="Title"
                                       value={textBlock?.headline} required
                                       onChange={(event) => setTextBlockHeadline(event.target.value)}/>
                        </LFFormElement>}
                        {textBlock?.text &&
                            <LFFormElement labelValue="Description" labelName="contact-events-description">
                                <Textarea id="contact-events-description" placeholder="Description"
                                          value={textBlock?.text} required className="h-text-area"
                                          onChange={(event) => setTextBlockText(event.target.value)}/>
                            </LFFormElement>}
                    </div>
                </LFFormSection>
            </LFForm>
        </div>
    );
}
export default ContactPageComponent