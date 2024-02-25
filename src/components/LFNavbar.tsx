import {
    Avatar,
    DarkThemeToggle,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand
} from "flowbite-react";
import Logo from "@admin/components/Logo";
import {getImageUrl} from "@admin/lib";

const LFNavbar = () => {
    return (
        <Navbar fluid rounded border className='fixed w-full z-50'>
            <button
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <svg
                    aria-hidden="true"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <svg
                    aria-hidden="true"
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <span className="sr-only">Toggle sidebar</span>
            </button>
            <NavbarBrand href="https://www.littlefern.in" className='mr-2'>
                <Logo className="mr-3 h-6 sm:h-9"/>
                <span
                    className="self-center whitespace-nowrap text-xl font-semibold text-primary-900 dark:text-primary-50">Little FERN Administration</span>
            </NavbarBrand>

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
                        <span className="block text-sm">Manju Khanduri</span>
                        <span className="block truncate text-sm font-medium">info@littlefern.in</span>
                    </DropdownHeader>
                    <DropdownItem>Dashboard</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Earnings</DropdownItem>
                    <DropdownDivider/>
                    <DropdownItem>Sign out</DropdownItem>
                </Dropdown>
            </div>
        </Navbar>
    )
}
export default LFNavbar