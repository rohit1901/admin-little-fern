'use client';

import {
    FlowbiteSidebarTheme,
    Sidebar,
    SidebarCollapse,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems
} from 'flowbite-react';
import {BiBuoy} from 'react-icons/bi';
import {HiArrowSmRight, HiChartPie, HiInbox, HiOfficeBuilding, HiTable, HiUser, HiViewBoards} from 'react-icons/hi';
import {DeepPartial} from "flowbite-react/lib/esm/types";
import {HiCamera, HiHome, HiMiniDocument, HiMiniInformationCircle, HiPhone, HiUserGroup} from "react-icons/hi2";
// Define your custom theme
const customSidebarTheme: DeepPartial<FlowbiteSidebarTheme> = {
    root: {
        base: 'fixed overflow-y-auto scrolling-touch top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700', // Tailwind class for background color
        inner: 'py-5 px-7 h-full bg-white dark:bg-gray-800', // Tailwind class for background color
    },
};
type LFSidebarProps = {
    programs?: {
        name?: string
        slug?: string
    }[]
}
const LFSidebar = ({programs}: LFSidebarProps) => {
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
    return (<Sidebar theme={customSidebarTheme}>
        <SidebarItems>
            <SidebarItemGroup>
                <SidebarItem href="/dashboard" icon={HiChartPie}>
                    Dashboard
                </SidebarItem>
                <SidebarCollapse icon={HiMiniDocument} label="Pages">
                    {pages?.map((page) => (<SidebarItem href={page.href} key={page.name}
                                                        icon={page.icon}
                                                        className='text-ellipsis overflow-hidden text-sm'>
                        {page.name}
                    </SidebarItem>))}
                </SidebarCollapse>
                <SidebarItem href="https://email.littlefern.in" target='_blank' icon={HiInbox}>
                    Inbox
                </SidebarItem>
                <SidebarItem href="#" icon={HiUser}>
                    Users
                </SidebarItem>
                <SidebarItem href="#" icon={HiArrowSmRight}>
                    Sign In
                </SidebarItem>
                <SidebarItem href="#" icon={HiTable}>
                    Sign Up
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
