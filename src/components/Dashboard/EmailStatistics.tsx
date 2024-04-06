import {ApexOptions} from "apexcharts";
import {useNotificationsStore} from "@admin/store/useNotificationsStore";
import {MONTHS, MonthsType} from "@admin/lib/constants";
import {getDataForMonth, getDataTrend} from "@admin/lib";
import {useEffect, useState} from "react";
import dynamic from 'next/dynamic'
import {Card} from "flowbite-react";
import {TrendIcon} from "@admin/components/Dashboard/TrendIcon";

//NOTE: Fix for ApexCharts not working with SSR
const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});
/**
 * The ApexCharts options for the email statistics
 */
const chartData: ApexOptions = {
    chart: {
        height: "100%",
        type: "area",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
    },
    xaxis: {
        categories: MONTHS,
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
};
export const EmailStatistics = () => {
    const {notificationPageData} = useNotificationsStore()
    const [data, setData] =
        useState<number[]>(MONTHS.map((month: MonthsType) => getDataForMonth(month, notificationPageData?.notifications ?? [])))
    const [trend, setTrend] = useState(getDataTrend(data))
    useEffect(() => {
        setData(MONTHS.map((month: MonthsType) => getDataForMonth(month, notificationPageData?.notifications ?? [])))
        setTrend(getDataTrend(data))
    }, [notificationPageData])
    if (!notificationPageData || notificationPageData.notifications.length === 0) return null
    return (
        <Card className="w-full dark:bg-gray-800 dark:border-primary-50 px-4 md:px-6">
            <div className="text-cyan-800 dark:text-cyan-50 text-3xl">
                <h4 className="font-bold">Statistics</h4>
                <div
                    className="h-1 w-10 bg-cyan-800 rounded dark:bg-cyan-50"></div>
            </div>
            <div className="flex justify-between">
                <div>
                    <h5 className="leading-none text-3xl font-bold text-cyan-800 dark:text-cyan-50 pb-2">
                        <span>{notificationPageData?.notifications?.length ?? 0}</span>
                    </h5>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Enquiries this year</p>
                </div>
                <TrendIcon {...trend}/>
            </div>
            {<Chart options={chartData} series={[
                {
                    name: "Enquiries",
                    data: data,
                    color: "#155E75",
                },
            ]} type="area" width="100%" height={350}/>}
        </Card>

    );
}