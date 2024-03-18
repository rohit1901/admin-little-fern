'use client';

import {Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react';
import {BiCopyAlt} from 'react-icons/bi';
import {usePathname} from "next/navigation";
import {RiEmotionSadLine, RiHomeHeartLine} from "react-icons/ri";
import {MdInsertChartOutlined, MdOutlineAddReaction, MdOutlineFolder, MdOutlineFolderDelete} from "react-icons/md";
import {FaImages, FaLaptopCode} from "react-icons/fa";
import {NewStaff} from "@admin/components/Staff/NewStaff";
import {useState} from "react";
import {PATHNAME_ABOUT, PATHNAME_CONTACT, PATHNAME_GALLERY, PATHNAME_HOME, PATHNAME_PARENTS, PATHNAME_PROGRAMS} from "@admin/lib/constants";
import {RemoveStaff} from "@admin/components/Staff/RemoveStaff";
import {RemoveProgram} from "@admin/components/ProgramsPage/RemoveProgram";
import {PiUsersBold} from "react-icons/pi";
import {IoMdCall, IoMdInformationCircleOutline} from "react-icons/io";

const pages = [{
    name: 'Home', href: PATHNAME_HOME, icon: RiHomeHeartLine,
}, {
    name: 'About', href: PATHNAME_ABOUT, icon: IoMdInformationCircleOutline,
}, {
    name: 'Gallery', href: PATHNAME_GALLERY, icon: FaImages,
}, {
    name: 'Programs', href: '/programs/play-group', icon: MdOutlineFolder,
}, {
    name: 'Contact', href: PATHNAME_CONTACT, icon: IoMdCall,
}, {
    name: 'Parents', href: PATHNAME_PARENTS, icon: PiUsersBold,
}]
const setActive = (href: string, slug: string | null) => {
    // set active to true if the slug includes '/programs'
    if (href.includes(PATHNAME_PROGRAMS)) {
        return slug?.includes(PATHNAME_PROGRAMS)
    }
    return slug === href
}

const LFSidebar = () => {
    const slug = usePathname()
    const [openAddStaffModal, setOpenAddStaffModal] = useState(false)
    const [openRemoveStaffModal, setOpenRemoveStaffModal] = useState(false)
    const [openRemoveProgramModal, setOpenRemoveProgramModal] = useState(false)
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
                <SidebarItem as="button" icon={MdOutlineAddReaction} size="sm" onClick={() => setOpenAddStaffModal(true)}>
                    Add Staff
                </SidebarItem>
                <SidebarItem as="button" onClick={() => setOpenRemoveStaffModal(true)} icon={RiEmotionSadLine}>
                    <span>Remove Staff</span>
                </SidebarItem>
                {/*TODO: Add Program*/}
                {/*<SidebarItem href="#" icon={AddGraduate}>
                    Add Program
                </SidebarItem>*/}
                <SidebarItem href="#" icon={MdOutlineFolderDelete} onClick={() => setOpenRemoveProgramModal(true)}>
                    <span>Remove Program</span>
                </SidebarItem>
            </SidebarItemGroup>
            <SidebarItemGroup>
                <SidebarItem href="#" icon={FaLaptopCode}>
                    Documentation
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>);
}
export default LFSidebar
