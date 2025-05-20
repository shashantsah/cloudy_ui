import { HomeIcon, PlusIcon } from "lucide-react";
import Link  from "next/link";

import { useWorkspaceStore } from "@/stores/workspace";
import { cn } from "@/utils";

// import { useCreateDocument } from "../documentDetail/editor/hooks";

export const MobileTabBar = () => {
	const { workspace } = useWorkspaceStore();

	// const createDocumentMutation = useCreateDocument();

	return (
		<nav className="relative z-50 flex w-screen flex-row items-center justify-between border-t border-border bg-background py-3 md:hidden">
			<Tab icon={<HomeIcon className="size-5" />} label="Home" href="/" />
			{/* <Tab icon={<LightbulbIcon className="size-5" />} label="Quick note" onClick={() => {}} /> */}
			{workspace && (
				<Tab
					icon={<PlusIcon className="size-5" />}
					label="New note"
					// onClick={() => createDocumentMutation.mutate({})}
				/>
			)}
		</nav>
	);
};

const Tab = ({ icon, label, onClick, href }: { icon: React.ReactNode; label: string; onClick?: () => void; href?: string }) => {
	// const location = useLocation();
	const isActive = location.pathname === href;

	const inner = (
		<button
			onClick={onClick}
			className={cn("flex flex-1 flex-col items-center justify-center gap-1", isActive && "text-accent")}>
			{icon}
			<span className="text-xs">{label}</span>
		</button>
	);

	if (href) {
		// return (
		// 	<Link href={href} className="flex flex-1">
		// 		{inner}
		// 	</Link>
		// );
	}

	return inner;
};
