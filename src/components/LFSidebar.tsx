'use client';

import {Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react';
import {BiSolidDashboard, BiSolidHelpCircle, BiSolidPhoneCall} from 'react-icons/bi';
import {HiChartPie, HiOfficeBuilding} from 'react-icons/hi';
import {HiCamera, HiHome, HiMiniDocument, HiMiniInformationCircle, HiPhone, HiUserGroup} from "react-icons/hi2";
import {usePathname} from "next/navigation";
import {TbUsersGroup} from "react-icons/tb";
import {IoDocuments} from "react-icons/io5";
import {RiGalleryFill, RiHomeHeartFill} from "react-icons/ri";

const SidebarClasses = "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full " +
    "bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
const pages = [{
    name: 'Home', href: '/website-pages/Home', icon: RiHomeHeartFill,
}, {
    name: 'About', href: '/website-pages/About', icon: HiMiniInformationCircle,
}, {
    name: 'Gallery', href: '/website-pages/Gallery', icon: RiGalleryFill,
}, {
    name: 'Programs', href: '/programs/play-group', icon: HiOfficeBuilding,
}, {
    name: 'Contact', href: '/website-pages/Contact', icon: BiSolidPhoneCall,
}, {
    name: 'Parents', href: '/website-pages/Parents', icon: TbUsersGroup,
}]
const setActive = (href: string, slug: string | null) => {
    // set active to true if the slug includes '/programs'
    if (href.includes('/programs')) {
        return slug?.includes('/programs')
    }
    return slug === href
}
const LFSidebar = () => {
    const slug = usePathname()
    return (<Sidebar
        className={SidebarClasses}>
        <SidebarItems className="sidebar-items">
            <SidebarItemGroup>
                <SidebarItem href="/" icon={BiSolidDashboard} active={setActive('/', slug)}>
                    Dashboard
                </SidebarItem>
                <SidebarCollapse icon={IoDocuments} label="Pages" open>
                    {pages?.map((page) => (<SidebarItem href={page.href} key={page.name}
                                                        icon={page.icon}
                                                        className='text-ellipsis overflow-hidden text-sm'
                                                        active={setActive(page.href, slug)}>
                        {page.name}
                    </SidebarItem>))}
                </SidebarCollapse>
            </SidebarItemGroup>
            <SidebarItemGroup>
                <SidebarItem href="#" icon={BiSolidHelpCircle}>
                    Documentation
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>);
}
export default LFSidebar
