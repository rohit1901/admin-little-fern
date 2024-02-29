'use client'
import {ParentsPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import ParentsHero from "@admin/components/ParentsPage/Hero";
import ParentsEvents from "@admin/components/ParentsPage/Events";
import {useParentsPageStore} from "@admin/store/useParentsPageStore";
import {useEffect} from "react";
import {isParentsPageData} from "@admin/lib";

type ParentsPageProps = {
    pageData: ParentsPageData
}
const ParentsPageComponent = ({pageData}: ParentsPageProps) => {
    const {setParentsPageData} = useParentsPageStore()
    useEffect(() => {
        setParentsPageData(pageData)
    }, [])
    return <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <LFForm data={pageData} updateState={(data) => {
            if (!isParentsPageData(data)) return
            setParentsPageData(data)
        }}>
            <ParentsHero/>
            <ParentsEvents/>
        </LFForm>
    </div>
}
export default ParentsPageComponent