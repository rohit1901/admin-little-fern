import {Fragment, PropsWithChildren, useRef, useState} from "react";
import {Button, Modal, Spinner} from "flowbite-react";
import {usePathname} from "next/navigation";
import {WithId} from "mongodb";
import {
    AboutPageData,
    ContactPageData,
    GalleryPageData,
    HomePageData,
    ParentsPageData,
    SchoolProgram,
    SchoolProgramsBlock,
    StaffPageData
} from "@admin/types";
import {isEmailAuthorized, isPathnameAbout, isPathnameHome, isPathnamePrograms, isSchoolProgramsBlock} from "@admin/lib";
import {useSession} from "next-auth/react";
import {useSchoolProgramsPageStore} from "@admin/store/";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {IoIosSave} from "react-icons/io";
import {IoReload} from "react-icons/io5";
import {useStaffStore} from "@admin/store/useStaffStore";
import {API_PROGRAMS_UPDATE, API_STAFF_UPDATE, PATHNAME_MAPPING} from "@admin/lib/constants";

const getApiPath = (path: string, shouldUpdatePrograms?: boolean) => {
    if (shouldUpdatePrograms) return API_PROGRAMS_UPDATE
    return PATHNAME_MAPPING[path]
}
type LFFormProps = {
    data?: WithId<HomePageData | ParentsPageData | GalleryPageData | ContactPageData | AboutPageData>
    isProgram?: boolean
}

const handleProgramUpdate = async (programs: WithId<SchoolProgram>[], heading: string,
                                   pathname: string, setPrograms: (data: WithId<SchoolProgram>[]) => void,
                                   setHeading: (data: string) => void) => {
    // NOTE: this function executes only if the pathname is /website-pages/Home or /programs
    // which means that the request is to update the school programs block
    if (isPathnameHome(pathname) || isPathnamePrograms(pathname)) {
        const newSchoolProgramsBlock: SchoolProgramsBlock = {
            heading,
            schoolPrograms: programs,
            dateCreated: new Date(),
        }
        const res = await fetch(getApiPath(pathname, true), {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(newSchoolProgramsBlock)
        })
        const r = await res.json()
        if (isSchoolProgramsBlock(r.body)) {
            setPrograms(r.body.schoolPrograms)
            setHeading(r.body.heading)
        }
    }
    return
}

const LFForm = ({children, data, isProgram}: PropsWithChildren<LFFormProps>) => {
    const formRef = useRef<HTMLFormElement>(null);
    const {data: session} = useSession()
    const pathname = usePathname()
    const {programs, heading, setHeading, setPrograms} = useSchoolProgramsPageStore()
    const {
        staffDetails, homeTextBlock, aboutTextBlock, staffAssurancesBlock,
        setStaffDetails, setAboutTextBlock, setHomeTextBlock, setStaffAssurancesBlock
    } = useStaffStore()
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    return (<Fragment>
        <form ref={formRef} onSubmit={async (event) => {
            event.preventDefault()
            if (!pathname) {
                return
            }
            setLoading(true)
            if (!isProgram) {
                const res = await fetch(getApiPath(pathname), {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify(data)
                })
                const updatedData = await res.json()
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
                    await fetch(API_STAFF_UPDATE, {
                        method: 'POST', headers: {
                            'Content-Type': 'application/json',
                        }, body: JSON.stringify(newStaffPageData)
                    })
                }
            }
            await handleProgramUpdate(programs, heading ?? '', pathname, setPrograms, setHeading)
            setLoading(false)
            window.location.reload()
        }}>
            {children}
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to update this page?
                        </h3>
                        <p className={`text-sm font-normal text-gray-500 dark:text-gray-400`}>This action cannot be undone.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={loading} outline type="submit"
                            onClick={() => {
                                if (formRef.current) {
                                    const event = new Event('submit', {bubbles: true, cancelable: true});
                                    formRef.current.dispatchEvent(event);
                                }
                            }}>{loading ? <Spinner/> : 'Update'}</Button>
                    <Button color="light" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            {isEmailAuthorized(session) && <div className="flex flex-wrap gap-2 mt-2">
                <Button className="m-0" disabled={loading} outline onClick={() => {
                    window.location.reload()
                }}>
                    <div className="flex items-center">
                        <IoReload className="mr-2 h-5 w-5"/>
                        <p>Reset</p>
                    </div>
                </Button>
                <Button className="m-0" disabled={loading} onClick={() => setOpenModal(true)} outline>{loading ? <Spinner/> :
                    <div className="flex items-center">
                        <IoIosSave className="mr-2 h-5 w-5"/>
                        <p>Update</p>
                    </div>}
                </Button>
            </div>}
        </form>
    </Fragment>)
}
export default LFForm