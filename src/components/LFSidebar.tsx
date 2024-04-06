'use client';

import {Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react';
import {BiCopyAlt} from 'react-icons/bi';
import {usePathname} from "next/navigation";
import {RiEmotionSadLine, RiHomeHeartLine} from "react-icons/ri";
import {MdInsertChartOutlined, MdOutlineAddReaction, MdOutlineFolder, MdOutlineFolderDelete} from "react-icons/md";
import {FaLaptopCode, FaRegImages} from "react-icons/fa";
import {NewStaff} from "@admin/components/Staff/NewStaff";
import {useState} from "react";
import {PATHNAME_ABOUT, PATHNAME_CONTACT, PATHNAME_GALLERY, PATHNAME_HOME, PATHNAME_PARENTS, PATHNAME_PROGRAMS} from "@admin/lib/constants";
import {RemoveStaff} from "@admin/components/Staff/RemoveStaff";
import {RemoveProgram} from "@admin/components/ProgramsPage/RemoveProgram";
import {PiUsersBold} from "react-icons/pi";
import {IoMdCall, IoMdInformationCircleOutline} from "react-icons/io";
import {getPartyKitHostname, isEmailAuthorized} from "@admin/lib";
import {useSession} from "next-auth/react";
import Link from "next/link";

const pages = [{
    name: 'Home', href: PATHNAME_HOME, icon: RiHomeHeartLine,
}, {
    name: 'About', href: PATHNAME_ABOUT, icon: IoMdInformationCircleOutline,
}, {
    name: 'Gallery', href: PATHNAME_GALLERY, icon: FaRegImages,
}, {
    name: 'Programs', href: '/programs/play-group', icon: MdOutlineFolder,
}, {
    name: 'Contact', href: PATHNAME_CONTACT, icon: IoMdCall,
}, {
    name: 'Parents', href: PATHNAME_PARENTS, icon: PiUsersBold,
}]
/**
 * Function to set the active sidebar item
 * @param href {string} - the href of the sidebar item
 * @param slug {string | null} - the slug of the current page
 * @returns {boolean} - true if the sidebar item is active, false otherwise
 */
const setActive = (href: string, slug: string | null): boolean => {
    // set active to true if the slug includes '/programs'
    if (href.includes(PATHNAME_PROGRAMS)) {
        return !!slug?.includes(PATHNAME_PROGRAMS)
    }
    return slug === href
}
export const RedBalloon = () => {
    return <svg width="25px" height="25px" viewBox="0 0 128 128"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true" role="img" className="iconify iconify--noto"
                preserveAspectRatio="xMidYMid meet">
        <path d="M75.87 102.1c3 4.9-2.38 10.12 1.85 13.91c7.84 7 17.44-12.05 29.49 7.49" fill="none" stroke="#64b5f6"
              strokeWidth="3" strokeMiterlimit="10"></path>
        <path
            d="M74.5 106.88l5.63-1a2.86 2.86 0 0 0 2.07-4.1a34.64 34.64 0 0 0-7.2-9.62c-.44 2.89-2.16 7.38-3.62 10.8a2.85 2.85 0 0 0 3.12 3.92z"
            fill="#f44336"></path>
        <path
            d="M25.56 51.54C33.14 83.3 64.22 97.75 75.68 95s32.1-32 25.08-61.43C95.79 12.8 74.93 0 54.16 4.97s-33.57 25.83-28.6 46.6v-.03z"
            fill="#f44336"></path>
        <path
            d="M73.43 98.11l5.16-1.23c1.63-.39 2.64-2.02 2.25-3.65s-2.02-2.64-3.65-2.25L72 92.21c-1.63.39-2.64
            2.02-2.25 3.65s2.02 2.64 3.65 2.25h.03z"
            fill="#c62828"></path>
        <path
            d="M78.28 13.44c-4.07-2.48-9.9-4.13-13.2.55c-1.76 2.49-.1 7.15 3.53 8.2c6.14 1.79 7.21 4 8.46
            5.79c1.51 2.1 2.94 4.73 5.49 5.14s4-1.51 3.89-5.21c-.02-5.92-3.11-11.4-8.17-14.47z"
            fill="#ff847a"></path>
    </svg>
}
const LFSidebar = () => {
    const slug = usePathname()
    const {data: session, status} = useSession()
    const [openAddStaffModal, setOpenAddStaffModal] = useState(false)
    const [openRemoveStaffModal, setOpenRemoveStaffModal] = useState(false)
    const [openRemoveProgramModal, setOpenRemoveProgramModal] = useState(false)
    if (status === 'loading' || status === "unauthenticated") return null
    return (<Sidebar>
        <NewStaff openModal={openAddStaffModal} setOpenModal={setOpenAddStaffModal}/>
        <RemoveStaff openModal={openRemoveStaffModal} setOpenModal={setOpenRemoveStaffModal}/>
        <RemoveProgram openModal={openRemoveProgramModal} setOpenModal={setOpenRemoveProgramModal}/>
        <SidebarItems>
            <SidebarItemGroup>
                <Link href="/">
                    <SidebarItem icon={MdInsertChartOutlined} active={setActive('/', slug)} as="div">
                        Dashboard
                    </SidebarItem>
                </Link>
                <SidebarCollapse icon={BiCopyAlt} label="Pages" open>
                    {pages?.map((page) => (<Link href={page.href} key={page.name}>
                        <SidebarItem
                            as="div" icon={page.icon}
                            className='text-ellipsis overflow-hidden text-sm my-2' active={setActive(page.href, slug)}>
                        {page.name}
                        </SidebarItem>
                    </Link>))}
                </SidebarCollapse>
            </SidebarItemGroup>
            <SidebarItemGroup>
                <SidebarItem as="button" icon={MdOutlineAddReaction} size="sm" className={!isEmailAuthorized(session) ? 'cursor-not-allowed' : ''}
                             onClick={() => setOpenAddStaffModal(true)} disabled={!isEmailAuthorized(session)}>
                    Add Staff
                </SidebarItem>
                <SidebarItem as="button" icon={RiEmotionSadLine} size="sm" className={!isEmailAuthorized(session) ? 'cursor-not-allowed' : ''}
                             onClick={() => setOpenRemoveStaffModal(true)} disabled={!isEmailAuthorized(session)}>
                    Remove Staff
                </SidebarItem>
                {/*TODO: Add Program*/}
                {/*<SidebarItem href="#" icon={AddGraduate}>
                    Add Program
                </SidebarItem>*/}
                <SidebarItem as="button" icon={MdOutlineFolderDelete} onClick={() => setOpenRemoveProgramModal(true)}
                             className={!isEmailAuthorized(session) ? 'cursor-not-allowed' : ''} disabled={!isEmailAuthorized(session)}>
                    <span>Remove Program</span>
                </SidebarItem>
            </SidebarItemGroup>
            <SidebarItemGroup>
                <SidebarItem href="#" icon={FaLaptopCode}>
                    Documentation
                </SidebarItem>
                <SidebarItem as="a" target="_blank" href={getPartyKitHostname(process.env.NEXT_PUBLIC_PARTYKIT_HOSTNAME)}
                             icon={RedBalloon}>
                    PartyKit Server
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>);
}
export default LFSidebar
