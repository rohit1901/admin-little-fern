// charts.tsx/jsx

'use client' // if you use app dir, don't forget this line

import dynamic from "next/dynamic";
import {ApexOptions} from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), {ssr: false});


export function ExampleChart() {

    const options: ApexOptions = {
        series: [{
            name: 'Peter',
            data: [5, 5, 10, 8, 7, 5, 4, 8, 7, 2, 10, 10, 7, 8, 6, 9]
        }, {
            name: 'Johnny',
            data: [10, 15, 2, 12, 2, 10, 12, 15, 2, 2, 12, 2, 14, 2, 2, 2]
        }, {
            name: 'David',
            data: [2, 2, 2, 2, 3, 4, 1, 3, 4, 6, 7, 9, 5, 2, 2, 2]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            animations: {
                enabled: false
            }
        },
        stroke: {
            width: [5, 5, 4],
            curve: 'straight'
        },
        // create prop labels as a string of numbers from 1 to 16
        labels: Array.from({length: 16}, (_, i) => (i + 1).toString()),
        title: {
            text: 'Missing data (2 values)'
        },
        xaxis: {},
    };

    return (
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <ApexChart options={options} series={options.series} height={200} width={800}/>
        </div>
    )

}