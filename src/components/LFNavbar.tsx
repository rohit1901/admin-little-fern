'use client'
import {Avatar, Banner, Button, DarkThemeToggle, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand} from "flowbite-react";
import Logo from "@admin/components/Logo";
import {getImageUrl, isEmailAuthorized} from "@admin/lib";
import {signOut, useSession} from "next-auth/react";
import {MdInfo} from "react-icons/md";
import {HiArrowRight, HiChartPie, HiInbox, HiX} from "react-icons/hi";
import {Session} from "next-auth";
import {SiSubstack} from "react-icons/si";
import {FaSignOutAlt} from "react-icons/fa";
import {IoSettings} from "react-icons/io5";

const LFNavbar = () => {
    const {data: session} = useSession()
    const getUnauthorizedBanner = (session: Session | null) => {
        if (isEmailAuthorized(session)) {
            return null
        }
        return (
            <Banner>
                <div
                    className="flex w-full justify-between border-b border-gray-200 bg-gray-50 dark:border-cyan-50 dark:bg-cyan-50">
                    <div className="mx-auto flex items-center">
                        <p className="flex items-center text-sm font-normal text-cyan-900">
                            <MdInfo className="h-5 w-5 mr-2 ml-5"/>
                            <span className="[&_p]:inline">
                                You are not authorized to edit this information. For more information, please contact your administrator.
                                <Button
                                    onClick={() => signOut()}
                                    className="inline-flex items-center justify-center ml-0 md:ml-1 md:inline-flex dark:text-cyan-50"
                                    size='xs'>
                                    Login as a different user
                                    <HiArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </span>
                        </p>
                    </div>
                    <Banner.CollapseButton color="gray"
                                           className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
                        <HiX className="h-4 w-4"/>
                    </Banner.CollapseButton>
                </div>
            </Banner>
        )
    }
    return (
        <Navbar fluid rounded border className='fixed top-0 w-full z-50'>
            <NavbarBrand href="https://www.littlefern.in" className='mr-2'>
                <Logo className="mr-3 h-6 sm:h-9"/>
                <span
                    className="text-xl font-semibold text-cyan-800 dark:text-cyan-200">Little FERN Administration</span>
            </NavbarBrand>
            {getUnauthorizedBanner(session)}
            <div className="flex items-center lg:order-2">
                <DarkThemeToggle className='p-2 mr-2'/>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings"
                                img={getImageUrl('/images/stock/testimonials/female.avatar.jpg')} rounded/>
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">{session?.user.name}</span>
                        <span className="block truncate text-sm font-medium">{session?.user.email}</span>
                    </DropdownHeader>
                    <DropdownItem icon={HiChartPie} href="/">Dashboard</DropdownItem>
                    <DropdownItem as='a' href="http://email.littlefern.in" target='_blank' icon={HiInbox}>
                        Inbox
                    </DropdownItem>
                    <DropdownItem as='a' href="https://littlefernnoida.substack.com/" target='_blank' icon={SiSubstack}>
                        Newsletters
                    </DropdownItem>
                    <DropdownItem icon={IoSettings} href="/settings">Settings</DropdownItem>
                    <DropdownDivider/>
                    <DropdownItem icon={FaSignOutAlt} onClick={() => signOut()}>Sign out</DropdownItem>
                </Dropdown>
            </div>
        </Navbar>
    )
}
export default LFNavbar