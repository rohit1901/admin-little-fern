import {PropsWithChildren, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import {WithId} from "mongodb";
import {AboutPageData, ContactPageData, GalleryPageData, HomePageData, ParentsPageData, StaffPageData} from "@admin/types";
import {getUpdateAPIPath, handleProgramUpdate, isPathnameAbout, isPathnameHome} from "@admin/lib";
import {useSession} from "next-auth/react";
import {useSchoolProgramsPageStore} from "@admin/store/";
import {useStaffStore} from "@admin/store/useStaffStore";
import {API_STAFF_UPDATE} from "@admin/lib/constants";
import {LFFormButtonGroup} from "@admin/components/LFFormButtonGroup";

type LFFormProps = {
    data?: WithId<HomePageData | ParentsPageData | GalleryPageData | ContactPageData | AboutPageData>
    isProgram?: boolean
    afterSubmit?: (data?: WithId<HomePageData | ParentsPageData | GalleryPageData | ContactPageData | AboutPageData>,
                   staffPage?: WithId<StaffPageData>) => void
}

const LFForm = ({children, data, isProgram, afterSubmit}: PropsWithChildren<LFFormProps>) => {
    const formRef = useRef<HTMLFormElement>(null);
    const {data: session} = useSession()
    const pathname = usePathname()
    const {programs, heading, setHeading, setPrograms} = useSchoolProgramsPageStore()
    const {
        staffPageDataId, staffDetails, homeTextBlock, aboutTextBlock, staffAssurancesBlock,
        setStaffDetails, setAboutTextBlock, setHomeTextBlock, setStaffAssurancesBlock, setStaffPageDataId
    } = useStaffStore()
    const [loading, setLoading] = useState(false)
    return (
        <form ref={formRef} onSubmit={async (event) => {
            event.preventDefault()
            if (!pathname) {
                return
            }
            setLoading(true)
            if (!isProgram) {
                const res = await fetch(getUpdateAPIPath(pathname), {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify(data)
                })
                const json = await res.json()
                const updatedData: WithId<HomePageData | ParentsPageData | GalleryPageData | ContactPageData | AboutPageData> = json.body
                afterSubmit?.(updatedData)
                // NOTE: this block of code executes only if the pathname is /website-pages/Home or /website-pages/About
                // and updates the staff page data
                // after updating the staff page data, the new data is set in the store
                if (isPathnameHome(pathname) || isPathnameAbout(pathname)) {
                    const newStaffPageData: Omit<StaffPageData, 'dateCreated'> = {
                        staffDetails,
                        homeTextBlock,
                        aboutTextBlock,
                        assurancesBlock: staffAssurancesBlock,
                    }
                    const updatedStaffPageData = await fetch(API_STAFF_UPDATE, {
                        method: 'POST', headers: {
                            'Content-Type': 'application/json',
                        }, body: JSON.stringify(newStaffPageData)
                    })
                    const staffJson = await updatedStaffPageData.json()
                    const staffPage: WithId<StaffPageData> = staffJson.body
                    setStaffPageDataId(staffPage._id)
                    setStaffDetails(staffPage.staffDetails)
                    setAboutTextBlock(staffPage.aboutTextBlock)
                    setHomeTextBlock(staffPage.homeTextBlock)
                    setStaffAssurancesBlock(staffPage.assurancesBlock)
                }
            }
            await handleProgramUpdate(programs, heading ?? '', pathname, setPrograms, setHeading)
            setLoading(false)
        }}>
            {children}
            <LFFormButtonGroup session={session} loading={loading}/>
        </form>
    )
}
export default LFForm