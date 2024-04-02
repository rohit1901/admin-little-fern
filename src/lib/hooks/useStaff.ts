import {useStaffStore} from "@admin/store/useStaffStore";
import {API_STAFF_GET} from "@admin/lib/constants";
import {useEffect, useState} from "react";

export const useStaff = () => {
    const [loading, setLoading] = useState(false)
    const {
        staffDetails,
        staffAssurancesBlock,
        homeTextBlock,
        setStaffAssurancesBlock,
        setHomeTextBlock,
        setAboutTextBlock,
        setStaffDetails,
        staffPageDataId,
        setStaffPageDataId,
        setHomeTextHeadline,
        setHomePageText,
        setHomeSubHeading,
        setStaffDetailsName,
        setStaffDetailsDescription,
        setStaffDetailsRole,
        setStaffAssurancesBlockHeading,
        setStaffAssurancesBlockAssurances,
    } = useStaffStore()
    useEffect(() => {
        if (!staffPageDataId) {
            setLoading(true)
            fetch(API_STAFF_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    setStaffDetails(data.body.staffDetails)
                    setStaffAssurancesBlock(data.body.assurancesBlock)
                    setHomeTextBlock(data.body.homeTextBlock)
                    setAboutTextBlock(data.body.aboutTextBlock)
                    setStaffPageDataId(data.body._id)
                }).catch((error) => {
                console.error('Error:', error);
            }).finally(() => setLoading(false))
        }
    }, [])
    return {
        loading,
        setLoading,
        staffDetails,
        staffAssurancesBlock,
        homeTextBlock,
        setStaffAssurancesBlock,
        setHomeTextBlock,
        setAboutTextBlock,
        setStaffDetails,
        staffPageDataId,
        setStaffPageDataId,
        setHomeTextHeadline,
        setHomePageText,
        setHomeSubHeading,
        setStaffDetailsName,
        setStaffDetailsDescription,
        setStaffDetailsRole,
        setStaffAssurancesBlockHeading,
        setStaffAssurancesBlockAssurances,
    }
}