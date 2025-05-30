import { CircleHelpIcon, HandshakeIcon, LogOutIcon, MenuIcon, MoonIcon, ScrollTextIcon, SunIcon } from "lucide-react";


import { Button } from "@/components/Button";
import { Dropdown, DropdownItem } from "@/components/Dropdown";
// import { useTheme } from "@/stores/theme";

export const SidebarDropdown = () => {
	// const { theme, toggleTheme } = useTheme();

	// const handleSignOut = () => {
	// 	supabase.auth.signOut();
	// };

	return (
		<Dropdown
			trigger={
				<Button variant="ghost" size="icon" aria-label="New thought">
					<MenuIcon size={24} />
				</Button>
			}
			className="w-64 pt-2">
			<DropdownItem onSelect={() => {}} className="text-sm">
				{true ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
				<span>{true ? "Dark Mode" : "Light Mode"}</span>
			</DropdownItem>
			<div className="my-2 border-b border-border" />
			<a href="https://usecloudy.com/support">
				<DropdownItem>
					<CircleHelpIcon className="size-4" />
					<span>Support</span>
				</DropdownItem>
			</a>
			<a href="https://usecloudy.com/pp">
				<DropdownItem>
					<HandshakeIcon className="size-4" />
					<span>Privacy Policy</span>
				</DropdownItem>
			</a>
			<a href="https://usecloudy.com/tos">
				<DropdownItem>
					<ScrollTextIcon className="size-4" />
					<span>Terms of Service</span>
				</DropdownItem>
			</a>
			<div className="my-2 border-b border-border" />
			<DropdownItem onSelect={()=>{}} className="text-red-600">
				<LogOutIcon className="size-4" />
				<span>Sign out</span>
			</DropdownItem>
		</Dropdown>
	);
};
