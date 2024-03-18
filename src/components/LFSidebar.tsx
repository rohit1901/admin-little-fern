'use client';

import {Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react';
import {BiSolidCopyAlt} from 'react-icons/bi';
import {usePathname} from "next/navigation";
import {IoCall} from "react-icons/io5";
import {RiHomeHeartFill} from "react-icons/ri";
import {MdAddReaction, MdInfo, MdInsertChart} from "react-icons/md";
import {IoMdSchool} from "react-icons/io";
import {FaImages, FaLaptopCode, FaPlus, FaUsers} from "react-icons/fa";
import {GiGraduateCap} from "react-icons/gi";
import {NewStaff} from "@admin/components/AboutPage/NewStaff";
import {useState} from "react";

const SidebarClasses = "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full " +
    "bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
const pages = [{
    name: 'Home', href: '/website-pages/Home', icon: RiHomeHeartFill,
}, {
    name: 'About', href: '/website-pages/About', icon: MdInfo,
}, {
    name: 'Gallery', href: '/website-pages/Gallery', icon: FaImages,
}, {
    name: 'Programs', href: '/programs/play-group', icon: IoMdSchool,
}, {
    name: 'Contact', href: '/website-pages/Contact', icon: IoCall,
}, {
    name: 'Parents', href: '/website-pages/Parents', icon: FaUsers,
}]
const setActive = (href: string, slug: string | null) => {
    // set active to true if the slug includes '/programs'
    if (href.includes('/programs')) {
        return slug?.includes('/programs')
    }
    return slug === href
}
const ADD_ICON_CLASS =
    "absolute inline-flex items-center justify-center w-2 h-2 -top-0.5 -right-1 -end-2"
const AddGraduate = () => {
    return <div className="relative inline-flex">
        <GiGraduateCap className="text-cyan-800 dark:text-cyan-50 h-6 w-6"></GiGraduateCap>
        <FaPlus className={ADD_ICON_CLASS}/>
    </div>
}

const LFSidebar = () => {
    const slug = usePathname()
    const [openModal, setOpenModal] = useState(false)
    return (<Sidebar
        className={SidebarClasses}>
        <NewStaff openModal={openModal} setOpenModal={setOpenModal}/>
        <SidebarItems className="sidebar-items">
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
                <SidebarItem as="button" icon={MdAddReaction} onClick={() => setOpenModal(true)}>
                    Add Staff
                </SidebarItem>
                <SidebarItem href="#" icon={AddGraduate}>
                    Add Program
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
