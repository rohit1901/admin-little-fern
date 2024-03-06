'use client';

import {Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react';
import {BiSolidHelpCircle} from 'react-icons/bi';
import {HiChartPie, HiOfficeBuilding} from 'react-icons/hi';
import {HiCamera, HiHome, HiMiniDocument, HiMiniInformationCircle, HiPhone, HiUserGroup} from "react-icons/hi2";
import {usePathname} from "next/navigation";

const SidebarClasses = "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full " +
    "bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
const pages = [{
    name: 'Home', href: '/website-pages/Home', icon: HiHome,
}, {
    name: 'About', href: '/website-pages/About', icon: HiMiniInformationCircle,
}, {
    name: 'Gallery', href: '/website-pages/Gallery', icon: HiCamera,
}, {
    name: 'Programs', href: '/programs/play-group', icon: HiOfficeBuilding,
}, {
    name: 'Contact', href: '/website-pages/Contact', icon: HiPhone,
}, {
    name: 'Parents', href: '/website-pages/Parents', icon: HiUserGroup,
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
                <SidebarItem href="/" icon={HiChartPie} active={setActive('/', slug)}>
                    Dashboard
                </SidebarItem>
                <SidebarCollapse icon={HiMiniDocument} label="Pages" open>
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
