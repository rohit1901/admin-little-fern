'use client'
import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {useAboutPageStore} from "@admin/store/useAboutPageStore";

const Stats = () => {
    const {
        aboutPageData: {statsBlock},
        setStatsBlockHeading,
        setStatsBlockStatLabel,
        setStatsBlockStatValue,
        setStatsBlockSubHeading
    } = useAboutPageStore()
    return <Fragment>
        <LFFormSection sectionTitle={'Stats'}>
            <div className="lg:flex-grow md:w-1/2 pr-4">
                <LFFormElement labelValue='Section Title' labelName='statsSectionTitle'>
                    <TextInput id="statsSectionTitle" placeholder="Title for the Stats Block"
                               value={statsBlock?.heading} required
                               onChange={(event) => setStatsBlockHeading(event.target.value)}/>
                </LFFormElement>
                <LFFormElement labelValue='Sub-heading' labelName='statsSubHeading'>
                    <Textarea id="statsSubHeading" placeholder="sub-heading for the Hero Block"
                              value={statsBlock?.subHeading} required className='h-text-area'
                              onChange={(event) => setStatsBlockSubHeading(event.target.value)}/>
                </LFFormElement>
            </div>
            <div className="lg:flex-grow md:w-1/2 pr-4">
                {statsBlock?.stats.map((stat) => {
                    return (
                        <Fragment key={stat._id.toString()}>
                            <LFFormElement labelValue='Title' labelName='stat-title'>
                                <TextInput id="stat-title" placeholder="Title for the Stat"
                                           value={stat?.label} required
                                           onChange={(event) => setStatsBlockStatLabel(stat._id.toString(), event.target.value)}/>
                            </LFFormElement>
                            <LFFormElement labelValue='Value' labelName='stat-value'>
                                <TextInput id="stat-value" placeholder="Value for the Stat"
                                           value={stat?.value} required
                                           onChange={(event) => setStatsBlockStatValue(stat._id.toString(), event.target.value)}/>
                            </LFFormElement>
                        </Fragment>
                    )
                })}
            </div>
        </LFFormSection>
    </Fragment>
}
export default Stats;