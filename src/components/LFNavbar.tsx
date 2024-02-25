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
        <Navbar fluid rounded border className='fixed top-0 w-full z-50'>
            <NavbarBrand href="https://www.littlefern.in" className='mr-2'>
                <Logo className="mr-3 h-6 sm:h-9"/>
                <span
                    className="text-xl font-semibold text-cyan-800 dark:text-cyan-200">Little FERN Administration</span>
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