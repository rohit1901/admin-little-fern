'use client';

import {Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react';
import {BiBuoy} from 'react-icons/bi';
import {HiChartPie, HiInbox, HiOfficeBuilding, HiUser, HiViewBoards} from 'react-icons/hi';
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
    //create a function to set active property to true based on the slug matching the current page


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
                <SidebarItem href="http://email.littlefern.in" target='_blank' icon={HiInbox}>
                    Inbox
                </SidebarItem>
                <SidebarItem href="#" icon={HiUser}>
                    Users
                </SidebarItem>
            </SidebarItemGroup>
            <SidebarItemGroup>
                <SidebarItem href="#" icon={HiViewBoards}>
                    Documentation
                </SidebarItem>
                <SidebarItem href="#" icon={BiBuoy}>
                    Help
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>);
}
export default LFSidebar
