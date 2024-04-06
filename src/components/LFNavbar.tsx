'use client'
import {Avatar, Banner, Button, DarkThemeToggle, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand} from "flowbite-react";
import Logo from "@admin/components/Logo";
import {isEmailAuthorized} from "@admin/lib";
import {signOut, useSession} from "next-auth/react";
import {MdInfo, MdInsertChart} from "react-icons/md";
import {HiArrowRight, HiInbox, HiX} from "react-icons/hi";
import {Session} from "next-auth";
import {SiSubstack} from "react-icons/si";
import {IoSettings} from "react-icons/io5";
import {LFNotifications} from "@admin/components/LFNotifications";
import {PiSignOutBold} from "react-icons/pi";
import Link from "next/link";

type UnauthorizedBannerProps = {
    session: Session | null
}
const UnauthorizedBanner = ({session}: UnauthorizedBannerProps) => {
    if (isEmailAuthorized(session)) {
        return null
    }
    return (
        <Banner>
            <div
                className="flex w-full justify-between border-b border-gray-200 bg-gray-50 dark:border-cyan-50 dark:bg-cyan-50">
                <div className="mx-auto flex items-center">
                    <p className="flex items-center text-sm font-normal text-cyan-800">
                        <MdInfo className="h-5 w-5 mr-2 ml-5"/>
                        <span className="[&_p]:inline">
                                You are not authorized to edit anything. For more information, please contact your administrator.
                                <Button
                                    onClick={() => signOut()}
                                    className="inline-flex items-center justify-center ml-0 md:ml-1 md:inline-flex dark:bg-cyan-800"
                                    size='xs'>
                                    <p className="dark:text-cyan-50">Login as a different user</p>
                                    <HiArrowRight className="ml-2 h-4 w-4 dark:text-cyan-50"/>
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

const LFNavbar = () => {
    const {data: session, status} = useSession()
    if (status === 'loading' || status === "unauthenticated") return null
    return (
        <Navbar fluid rounded border className='fixed top-0 w-full z-50'>
            <NavbarBrand href="https://www.littlefern.in" className='mr-2'>
                <Logo className="mr-3 h-6 sm:h-9"/>
                <span
                    className="text-xl font-semibold text-cyan-800 dark:text-cyan-50">Little FERN Administration</span>
            </NavbarBrand>
            <UnauthorizedBanner session={session}/>
            <div className="flex items-center lg:order-2">
                <DarkThemeToggle className='mr-3 text-cyan-800 dark:text-yellow-200'/>
                <LFNotifications/>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User avatar"
                                img={session?.user?.image ?? ""} rounded/>
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm text-cyan-800 dark:text-cyan-50">{session?.user?.name}</span>
                        <span className="block truncate text-sm font-medium text-cyan-800 dark:text-cyan-50">{session?.user?.email}</span>
                    </DropdownHeader>
                    <Link href="/">
                        <DropdownItem as="div" icon={MdInsertChart} href="/" className="text-cyan-800 dark:text-cyan-50">Dashboard</DropdownItem>
                    </Link>
                    <DropdownItem as='a' href="http://email.littlefern.in" target='_blank' icon={HiInbox}
                                  className="text-cyan-800 dark:text-cyan-50">
                        Inbox
                    </DropdownItem>
                    <DropdownItem as='a' href="https://littlefernnoida.substack.com/" target='_blank' icon={SiSubstack}
                                  className="text-cyan-800 dark:text-cyan-50">
                        Newsletters
                    </DropdownItem>
                    <Link href="/settings">
                        <DropdownItem icon={IoSettings} className="text-cyan-800 dark:text-cyan-50">Settings</DropdownItem>
                    </Link>
                    <DropdownDivider/>
                    <DropdownItem icon={PiSignOutBold} onClick={() => signOut()} className="text-cyan-800 dark:text-cyan-50">Sign out</DropdownItem>
                </Dropdown>
            </div>
        </Navbar>
    )
}
export default LFNavbar