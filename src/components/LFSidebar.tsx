'use client';

import {Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react';
import {BiBuoy} from 'react-icons/bi';
import {HiChartPie, HiInbox, HiOfficeBuilding, HiUser, HiViewBoards} from 'react-icons/hi';
import {HiCamera, HiHome, HiMiniDocument, HiMiniInformationCircle, HiPhone, HiUserGroup} from "react-icons/hi2";
import {usePathname} from "next/navigation";

type LFSidebarProps = {
    programs?: {
        name?: string
        slug?: string
    }[]
}
const LFSidebar = ({programs}: LFSidebarProps) => {
    const slug = usePathname()
    //create a function to set active property to true based on the slug matching the current page
    const setActive = (href: string) => {
        // set active to true if the slug includes '/programs'
        if (href.includes('/programs')) {
            return slug.includes('/programs')
        }
        return slug === href
    }

    const pages = [{
        name: 'Home', href: '/website-pages/Home', icon: HiHome,
    }, {
        name: 'About', href: '/website-pages/About', icon: HiMiniInformationCircle,
    }, {
        name: 'Gallery', href: '/website-pages/Gallery', icon: HiCamera,
    }, {
        name: 'Programs', href: '/programs', icon: HiOfficeBuilding,
    }, {
        name: 'Contact', href: '/website-pages/Contact', icon: HiPhone,
    }, {
        name: 'Parents', href: '/website-pages/Parents', icon: HiUserGroup,
    }]
    const isSidebarCollapseOpen = () => {
        return slug.includes('/website-pages') || slug.includes('/programs')
    }
    return (<Sidebar className='fixed px-4 mt-16 mb-4'>
        <SidebarItems>
            <SidebarItemGroup>
                <SidebarItem href="/dashboard" icon={HiChartPie} active={setActive('/dashboard')}>
                    Dashboard
                </SidebarItem>
                <SidebarCollapse icon={HiMiniDocument} label="Pages" open={isSidebarCollapseOpen()}>
                    {pages?.map((page) => (<SidebarItem href={page.href} key={page.name}
                                                        icon={page.icon}
                                                        className='text-ellipsis overflow-hidden text-sm'
                                                        active={setActive(page.href)}>
                        {page.name}
                    </SidebarItem>))}
                </SidebarCollapse>
                <SidebarItem href="https://email.littlefern.in" target='_blank' icon={HiInbox}>
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
