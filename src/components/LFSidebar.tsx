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
import {IoBalloon} from "react-icons/io5";

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

const LFSidebar = () => {
    const slug = usePathname()
    const {data: session} = useSession()
    const [openAddStaffModal, setOpenAddStaffModal] = useState(false)
    const [openRemoveStaffModal, setOpenRemoveStaffModal] = useState(false)
    const [openRemoveProgramModal, setOpenRemoveProgramModal] = useState(false)
    if (!session) return null
    return (<Sidebar>
        <NewStaff openModal={openAddStaffModal} setOpenModal={setOpenAddStaffModal}/>
        <RemoveStaff openModal={openRemoveStaffModal} setOpenModal={setOpenRemoveStaffModal}/>
        <RemoveProgram openModal={openRemoveProgramModal} setOpenModal={setOpenRemoveProgramModal}/>
        <SidebarItems>
            <SidebarItemGroup>
                <SidebarItem href="/" icon={MdInsertChartOutlined} active={setActive('/', slug)}>
                    Dashboard
                </SidebarItem>
                <SidebarCollapse icon={BiCopyAlt} label="Pages" open>
                    {pages?.map((page) => (<SidebarItem href={page.href} key={page.name}
                                                        icon={page.icon}
                                                        className='text-ellipsis overflow-hidden text-sm'
                                                        active={setActive(page.href, slug)}>
                        {page.name}
                    </SidebarItem>))}
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
                             className="text-red-700 px-0">
                    <div className="flex items-center px-0">
                        <IoBalloon className="mr-3 w-5 h-5 text-red-700"/>
                        <span className="text-cyan-800 dark:text-cyan-50">Little Fern PartyKit</span>
                    </div>
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>);
}
export default LFSidebar
