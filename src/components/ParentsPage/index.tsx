'use client'
import LFForm from "@admin/components/LFForm";
import ParentsHero from "@admin/components/ParentsPage/Hero";
import ParentsEvents from "@admin/components/ParentsPage/Events";
import {useParentsPageStore} from "@admin/store/";
import {useEffect, useState} from "react";
import {PageHeader} from "@admin/components/PageHeader";
import {API_PARENTS_GET} from "@admin/lib/constants";
import {isParentsPageData} from "@admin/lib";
import Loader from "@admin/components/Loader";

const ParentsPageComponent = () => {
    const [loading, setLoading] = useState(false)
    const {parentsPageData, setParentsPageData} = useParentsPageStore()
    useEffect(() => {
        if (!parentsPageData || !parentsPageData._id) {
            setLoading(true)
            fetch(API_PARENTS_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    setParentsPageData(data.body)
                }).catch((error) => {
                console.error('Error:', error);
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [])
    return (
        <Loader loading={loading}>
            <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
                <LFForm data={parentsPageData} afterSubmit={(data) => {
                    if (!isParentsPageData(data)) return
                    setParentsPageData(data)
                }}>
                    <PageHeader title='Parents Page'/>
                    <ParentsHero/>
                    <ParentsEvents/>
                </LFForm>
            </div>
        </Loader>
    )
}
export default ParentsPageComponent