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
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiOfficeBuilding,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiTable,
    HiUser,
    HiViewBoards
} from 'react-icons/hi';
import {DeepPartial} from "flowbite-react/lib/esm/types";
import {HiCamera, HiHome, HiMiniDocument, HiMiniInformationCircle, HiPhone, HiUserGroup} from "react-icons/hi2";
import {twMerge} from "tailwind-merge";
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
        name: 'Home', href: '/', icon: HiHome,
    }, {
        name: 'About', href: '/about', icon: HiMiniInformationCircle,
    }, {
        name: 'Gallery', href: '/gallery', icon: HiCamera,
    }, {
        name: 'Programs',
        href: '/programs',
        icon: HiOfficeBuilding,
        children: programs?.map((program) => ({name: program.name, href: `/programs/${program.slug}`}))
    }, {
        name: 'Contact', href: '/contact', icon: HiPhone,
    }, {
        name: 'Parents', href: '/parents', icon: HiUserGroup,
    }]
    return (<Sidebar theme={customSidebarTheme}>
        <SidebarItems>
            <SidebarItemGroup>
                <SidebarItem href="/dashboard" icon={HiChartPie}>
                    Dashboard
                </SidebarItem>
                <SidebarCollapse icon={HiMiniDocument} label="Pages">
                    {pages?.map((page) => {
                        if (!page.children) return <SidebarItem href={`/website-pages/${page.name}`} key={page.name}
                                                                icon={page.icon}
                                                                className='text-ellipsis overflow-hidden text-sm'>
                            {page.name}
                        </SidebarItem>
                        return <SidebarCollapse icon={page.icon} label={page.name} key={page.name}
                                                className='text-ellipsis overflow-hidden text-sm'
                                                renderChevronIcon={(theme, open) => {
                                                    const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                                    return <IconComponent aria-hidden
                                                                          className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])}/>;
                                                }}>
                            {page.children.map((child) => <SidebarItem href={child.href} key={child.name}
                                                                       className='justify-start text-ellipsis overflow-hidden text-sm'>
                                {child.name}</SidebarItem>)}
                        </SidebarCollapse>
                    })}
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
