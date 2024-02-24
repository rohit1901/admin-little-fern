import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {StatsBlock} from "@admin/types";

type StatsProps = {
    statsBlock: StatsBlock
}
const Stats = ({statsBlock}: StatsProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'Stats'}>
            <LFFormElement labelValue='Section Title' labelName='statsSectionTitle'>
                <TextInput id="statsSectionTitle" placeholder="Title for the Stats Block"
                           value={statsBlock.heading} required onChange={(event) => {
                    // update the description
                }}/>
            </LFFormElement>
            <LFFormElement labelValue='Sub-heading' labelName='statsSubHeading'>
                <TextInput id="statsSubHeading" placeholder="sub-heading for the Hero Block"
                           value={statsBlock.subHeading} required onChange={(event) => {
                    // update the description
                }}/>
            </LFFormElement>
            {statsBlock.stats.map((stat) => {
                return (
                    <Fragment key={`stat-${stat.label}`}>
                        <LFFormElement labelValue='Title' labelName='stat-title'>
                            <TextInput id="stat-title" placeholder="Title for the Stat"
                                       value={stat.label} required onChange={(event) => {
                                // update the description
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue='Value' labelName='stat-value'>
                            <TextInput id="stat-value" placeholder="Value for the Stat"
                                       value={stat.value} required onChange={(event) => {
                                // update the description
                            }}/>
                        </LFFormElement>
                    </Fragment>
                )
            })}
        </LFFormSection>
    </Fragment>
}
export default Stats;