'use client'
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Fragment} from "react";
import {Textarea, TextInput} from "flowbite-react";
import {useParentsPageStore} from "@admin/store/useParentsPageStore";
import {ImageBlock} from "@admin/components/ImageBlock";

const ParentsEvents = () => {
    const {
        parentsPageData,
        setEventDates,
        setEventDescription,
        setEventName,
        setEventsHeadline,
        setEventsText
    } = useParentsPageStore()
    return <Fragment>
        <LFFormSection sectionTitle={'Parents Events Text'}>
            <div className="lg:flex-grow md:w-1/2 pr-4">
                <LFFormElement labelValue="Title" labelName="parents-events-title"
                               elemValue={parentsPageData?.eventsText?.headline}>
                    <TextInput id="parents-events-title" placeholder="Title"
                               value={parentsPageData?.eventsText?.headline}
                               required
                               onChange={(event) => setEventsHeadline(event.target.value)}/>
                </LFFormElement>
            </div>
            <div className="lg:flex-grow md:w-1/2 pr-4">
                <LFFormElement labelValue="Description" labelName="parents-events-description"
                               elemValue={parentsPageData?.eventsText?.text}>
                    <Textarea id="parents-events-description" placeholder="Description"
                              value={parentsPageData?.eventsText?.text} required className="h-text-area"
                              onChange={(event) => setEventsText(event.target.value)}/>
                </LFFormElement>
            </div>
        </LFFormSection>
        <LFFormSection sectionTitle={'Parents Events'}>
            {parentsPageData?.events?.map((event, index) => {
                return <div key={event._id.toString()} className="sm:w-1/2 px-4">
                    <LFFormElement labelValue="Name" labelName={`parents-event-name${event._id.toString()}`}
                                   elemValue={event?.name}>
                        <TextInput id={`parents-event-name${event._id.toString()}`} placeholder="Event Name"
                                   value={event?.name} required
                                   onChange={(e) => setEventName(event._id.toString(), e.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Description"
                                   labelName={`parents-event-description${event._id.toString()}`}
                                   elemValue={event?.description}>
                        <TextInput placeholder="Event Description"
                                   id={`parents-event-description${event._id.toString()}`}
                                   value={event?.description} required
                                   onChange={(e) => setEventDescription(event._id.toString(), e.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Dates" labelName={`parents-event-dates${event._id.toString()}`}
                                   elemValue={event?.dates}>
                        <TextInput placeholder="Event Dates" value={event?.dates} required
                                   id={`parents-event-dates${event._id.toString()}`}
                                   onChange={(e) => setEventDates(event._id.toString(), e.target.value)}/>
                    </LFFormElement>
                    <ImageBlock imagePath={event?.image}/>
                </div>
            })}
        </LFFormSection>
    </Fragment>
}
export default ParentsEvents