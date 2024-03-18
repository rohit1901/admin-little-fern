'use client';

import {Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react';
import {BiSolidCopyAlt} from 'react-icons/bi';
import {usePathname} from "next/navigation";
import {IoCall} from "react-icons/io5";
import {RiHomeHeartFill} from "react-icons/ri";
import {MdInfo, MdInsertChart} from "react-icons/md";
import {IoMdSchool} from "react-icons/io";
import {FaImages, FaLaptopCode, FaMinus, FaPlus, FaUserMinus, FaUserPlus, FaUsers} from "react-icons/fa";
import {GiGraduateCap} from "react-icons/gi";
import {NewStaff} from "@admin/components/Staff/NewStaff";
import {useState} from "react";
import {PATHNAME_ABOUT, PATHNAME_CONTACT, PATHNAME_GALLERY, PATHNAME_HOME, PATHNAME_PARENTS, PATHNAME_PROGRAMS} from "@admin/lib/constants";
import {RemoveStaff} from "@admin/components/Staff/RemoveStaff";

const DeleteUser = () => {
    return <FaUserMinus className="h-6 w-6 text-red-600"/>
}
const pages = [{
    name: 'Home', href: PATHNAME_HOME, icon: RiHomeHeartFill,
}, {
    name: 'About', href: PATHNAME_ABOUT, icon: MdInfo,
}, {
    name: 'Gallery', href: PATHNAME_GALLERY, icon: FaImages,
}, {
    name: 'Programs', href: '/programs/play-group', icon: IoMdSchool,
}, {
    name: 'Contact', href: PATHNAME_CONTACT, icon: IoCall,
}, {
    name: 'Parents', href: PATHNAME_PARENTS, icon: FaUsers,
}]
const setActive = (href: string, slug: string | null) => {
    // set active to true if the slug includes '/programs'
    if (href.includes(PATHNAME_PROGRAMS)) {
        return slug?.includes(PATHNAME_PROGRAMS)
    }
    return slug === href
}
const ADD_ICON_CLASS =
    "absolute inline-flex items-center justify-center w-2 h-2 -top-0.5 -right-1 -end-2"
const AddGraduate = () => {
    return <div className="relative inline-flex">
        <GiGraduateCap className="h-6 w-6"></GiGraduateCap>
        <FaPlus className={ADD_ICON_CLASS}/>
    </div>
}
const RemoveGraduate = () => {
    return <div className="relative inline-flex">
        <GiGraduateCap className="h-6 w-6 text-red-600"></GiGraduateCap>
        <FaMinus className={`${ADD_ICON_CLASS} text-red-600`}/>
    </div>
}

const LFSidebar = () => {
    const slug = usePathname()
    const [openAddStaffModal, setOpenAddStaffModal] = useState(false)
    const [openRemoveStaffModal, setOpenRemoveStaffModal] = useState(false)
    return (<Sidebar>
        <NewStaff openModal={openAddStaffModal} setOpenModal={setOpenAddStaffModal}/>
        <RemoveStaff openModal={openRemoveStaffModal} setOpenModal={setOpenRemoveStaffModal}/>
        <SidebarItems>
            <SidebarItemGroup>
                <SidebarItem href="/" icon={MdInsertChart} active={setActive('/', slug)}>
                    Dashboard
                </SidebarItem>
                <SidebarCollapse icon={BiSolidCopyAlt} label="Pages" open>
                    {pages?.map((page) => (<SidebarItem href={page.href} key={page.name}
                                                        icon={page.icon}
                                                        className='text-ellipsis overflow-hidden text-sm'
                                                        active={setActive(page.href, slug)}>
                        {page.name}
                    </SidebarItem>))}
                </SidebarCollapse>
            </SidebarItemGroup>
            <SidebarItemGroup>
                <SidebarItem as="button" icon={FaUserPlus} onClick={() => setOpenAddStaffModal(true)}>
                    Add Staff
                </SidebarItem>
                <SidebarItem as="button" onClick={() => setOpenRemoveStaffModal(true)} icon={DeleteUser}>
                    <span className="text-red-600">Remove Staff</span>
                </SidebarItem>
                <SidebarItem href="#" icon={AddGraduate}>
                    Add Program
                </SidebarItem>
                <SidebarItem href="#" icon={RemoveGraduate}>
                    <span className="text-red-600">Remove Program</span>
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
