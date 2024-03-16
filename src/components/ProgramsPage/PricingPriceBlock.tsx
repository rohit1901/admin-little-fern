import LFFormElement from "@admin/components/LFFormElement";
import {Dropdown, TextInput} from "flowbite-react";
import {HiCurrencyRupee} from "react-icons/hi";
import {Pricing} from "@admin/types";
import {useSchoolProgramsPageStore} from "@admin/store";
import {Fragment} from "react";
import {LFSchedule} from "@admin/components/LFSchedule";
import {INTERVALS} from "@admin/lib/constants";

type PricingProps = {
    id: "1" | "2"
    programSlug: string
    programId: string
    pricing: Pricing
}
export const PricingPriceBlock = ({programId, pricing, id, programSlug}: PricingProps) => {
    const {
        setProgramPricingSectionPricing1Price,
        setProgramPricingSectionPricing1Interval,
        setProgramPricingSectionPricing1ShortDescription,
        setProgramPricingSectionPricing2Price,
        setProgramPricingSectionPricing2Interval,
        setProgramPricingSectionPricing2ShortDescription,
        setPricing1Feature,
        setPricing2Feature
    } = useSchoolProgramsPageStore()
    return (<Fragment>
        <div className="flex flex-row gap-2">
            <LFFormElement labelValue="Price" labelName={`program-pricing-${id}-price`}
                           elemValue={pricing?.price} className="w-full">
                <TextInput id={`program-pricing-${id}-price`} placeholder="Price for the Pricing Block"
                           value={pricing?.price} required
                           icon={HiCurrencyRupee}
                           onChange={(event) => {
                               if (id === "1") {
                                   setProgramPricingSectionPricing1Price(programId, event.target.value)
                               } else {
                                   setProgramPricingSectionPricing2Price(programId, event.target.value)
                               }
                           }}/>
            </LFFormElement>
            <LFFormElement labelValue="Interval"
                           elemValue={pricing?.interval} className="w-full">
                <Dropdown label={pricing?.interval ?? "Interval"}
                          id={`program-pricing-${id}-interval`} className="w-32" value={pricing?.interval} arrowIcon={false}>
                    {INTERVALS.map((i, index) =>
                        <Dropdown.Item key={`${i}-${id}`} className="dropdown-item"
                                       type="button" value={i} onClick={() => {
                            if (id === "1") {
                                setProgramPricingSectionPricing1Interval(programId, i)
                            } else {
                                setProgramPricingSectionPricing2Interval(programId, i)
                            }
                        }}>{i}</Dropdown.Item>)
                    }
                </Dropdown>
            </LFFormElement>
            <div className="w-full">
                {pricing?.features.map((feature, index) => {
                    return <LFFormElement key={feature._id.toString()} labelValue={`Feature ${index + 1}`}
                                          labelName={`program-pricing${id}-feature-${feature._id.toString()}`} elemValue={feature.feature}>
                        <TextInput id={`program-pricing${id}-feature-${feature._id.toString()}`} placeholder='Feature'
                                   value={feature?.feature} required onChange={(event) => {
                            if (id === "1") {
                                setPricing1Feature(programSlug, feature._id.toString(), event.target.value)
                            } else {
                                setPricing2Feature(programSlug, feature._id.toString(), event.target.value)
                            }
                        }}/>
                    </LFFormElement>
                })}
            </div>
        </div>
        <LFFormElement labelValue="Schedule"
                       elemValue={pricing?.shortDescription} className="w-full mx-auto">
            <div className="flex items-center">
                <LFSchedule scheduleString={pricing?.shortDescription} action={(scheduleString) => {
                    if (id === "1") {
                        setProgramPricingSectionPricing1ShortDescription(programId, scheduleString)
                    } else {
                        setProgramPricingSectionPricing2ShortDescription(programId, scheduleString)
                    }
                }} multipleDayPicker/>
            </div>
        </LFFormElement>
    </Fragment>)
}