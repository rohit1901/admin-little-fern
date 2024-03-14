import {LFDayRangePicker} from "@admin/components/LFDayRangePicker";
import {LFTimepicker} from "@admin/components/LFTimepicker";
import {Badge} from "flowbite-react";
import {parseScheduleString} from "@admin/lib";

type LFScheduleProps = {
    scheduleString: string;
    action: (scheduleString: string) => void;
}
export const LFSchedule = ({scheduleString, action}: LFScheduleProps) => {
    const {fromDay, toDay, fromTime, toTime} = parseScheduleString(scheduleString)
    const buildScheduleString = (dayString =`${fromDay}-${toDay}`, timeString = `from ${fromTime}-${toTime}`) => {
        //FIXME: Fix Bug here
        return `${dayString} ${timeString}`
    }
    return <div className="flex flex-col">
        <div className="mb-2 flex">
            <Badge color="green" className="cursor-not-allowed">{scheduleString}</Badge>
        </div>
        <div className="flex flex-wrap justify-between mb-2 items-center">
            <LFDayRangePicker fromDayString={fromDay} toDayString={toDay} action={(dayString) => action(buildScheduleString(dayString))}/>
            <LFTimepicker fromTimeString={fromTime} toTimeString={toTime}
                          action={(timeString) => action(buildScheduleString(undefined, timeString))}/>
        </div>
    </div>
}