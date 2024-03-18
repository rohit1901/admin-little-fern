'use client'
import {ParentsPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import ParentsHero from "@admin/components/ParentsPage/Hero";
import ParentsEvents from "@admin/components/ParentsPage/Events";
import {useParentsPageStore} from "@admin/store/";
import {useEffect} from "react";
import {WithId} from "mongodb";
import {PageHeader} from "@admin/components/PageHeader";

type ParentsPageProps = {
    pageData: WithId<ParentsPageData>
}
const ParentsPageComponent = ({pageData}: ParentsPageProps) => {
    const {parentsPageData, setParentsPageData} = useParentsPageStore()
    useEffect(() => {
        setParentsPageData(pageData)
    }, [])
    return <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
        <LFForm data={parentsPageData}>
            <PageHeader title='Parents Page'/>
            <ParentsHero/>
            <ParentsEvents/>
        </LFForm>
    </div>
}
export default ParentsPageComponent