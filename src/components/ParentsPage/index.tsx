'use client'
import {ParentsPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import ParentsHero from "@admin/components/ParentsPage/Hero";
import ParentsEvents from "@admin/components/ParentsPage/Events";

type ParentsPageProps = {
    parentsPageData: ParentsPageData
}
const ParentsPageComponent = ({parentsPageData}: ParentsPageProps) => {
    return <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <LFForm>
            <ParentsHero parentsHero={parentsPageData.hero} heroItems={parentsPageData.heroItems}/>
            <ParentsEvents parentsEvents={parentsPageData.events} eventsText={parentsPageData.eventsText}/>
        </LFForm>
    </div>
}
export default ParentsPageComponent