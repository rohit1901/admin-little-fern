import {LFDayRangePicker} from "@admin/components/LFDayRangePicker";
import {LFTimepicker} from "@admin/components/LFTimepicker";
import {Badge} from "flowbite-react";
import {useState} from "react";
import {LFScheduleData} from "@admin/types";
import {createScheduleString, parseScheduleString} from "@admin/lib";
import {LFMultiSelect} from "@admin/components/LFMultiSelect";
import {DAYS_OF_WEEK, TIMES} from "@admin/lib/constants";

type LFScheduleProps = {
    scheduleString: string;
    action: (scheduleString: string) => void;
    multipleDayPicker?: boolean
}
const initialLFSchedule: LFScheduleData = {
    fromDay: DAYS_OF_WEEK[0],
    toDay: DAYS_OF_WEEK[0],
    fromTime: TIMES[0],
    toTime: TIMES[0]
}
const getInitialLFSchedule = (multipleDayPicker?: boolean): LFScheduleData => {
    return multipleDayPicker ? {...initialLFSchedule, days: DAYS_OF_WEEK} : initialLFSchedule
}
export const LFSchedule = ({scheduleString, action, multipleDayPicker}: LFScheduleProps) => {
    const parsedScheduleData = parseScheduleString(scheduleString, multipleDayPicker)
    const [scheduleData, setScheduleData] =
        useState<LFScheduleData>(parsedScheduleData ?? getInitialLFSchedule(multipleDayPicker))
    const buildScheduleString = (scheduleData: LFScheduleData, multipleDayPicker?: boolean) => {
        setScheduleData({...scheduleData})
        action(createScheduleString(scheduleData, multipleDayPicker))
    }
    return <div className="flex flex-wrap justify-between mb-2 items-center">
        <Badge color="green" className="cursor-not-allowed">{scheduleString}</Badge>
        {multipleDayPicker ? <LFMultiSelect options={DAYS_OF_WEEK}
                                            onChange={(selectedOptions) => buildScheduleString({
                                                ...scheduleData,
                                                days: selectedOptions
                                            }, true)}
                                            selected={scheduleData.days}/> :
            <LFDayRangePicker fromDay={scheduleData.fromDay} toDay={scheduleData.toDay}
                              action={(dayString) => buildScheduleString({...scheduleData, ...dayString})}/>}

        <LFTimepicker fromTimeString={scheduleData.fromTime} toTimeString={scheduleData.toTime}
                      action={(timeString) => buildScheduleString({...scheduleData, ...timeString}, multipleDayPicker)}/>
    </div>
}