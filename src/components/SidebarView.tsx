
"use client";
import {
	CircleFadingArrowUp,
	PanelLeftCloseIcon,
	SearchIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/Button";
import { FeedbackDropdown } from "@/components/Feedback";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip";
import { cn } from "@/utils";
import { pluralize } from "@/utils/strings";
import { WorkspaceSelector } from "@/components/WorkspaceSelector";
import { SidebarDropdown } from "@/components/SidebarDropdown";
import { ProjectSelector } from "@/components/ProjectSelector";

const minimalSidebarRoutePaths = [
	"/workspaces/new/setup",
	"/auth/invite-accept",
	"/auth/complete-account-setup",
];

export default function SidebarView() {
	// const location = useLocation();
	// const isMinimalSidebar = minimalSidebarRoutePaths.includes(location.pathname);
	const isSidebarFixed = false;
	const isSidebarCollapsed = false;
	const setIsSidebarCollapsed = () => {};
	const userRecord = { email: "shashant.sah@gmail.com" };
	const workspace = { slug: "Shashant's Workspace" };
	const customerStatus = { isTrialing: true, remainingDaysInTrial: 7 };
	const project = true;

	return (
		<div className={cn("relative h-full md:h-dvh md:w-64")}> 
			<div
				className={cn(
					"absolute top-0 z-50 flex h-full w-screen flex-col overflow-hidden border-r border-border bg-background py-2 pt-4 transition-transform duration-200 ease-in-out md:sticky md:h-dvh md:w-64 md:pt-2",
				)}>
				{isSidebarFixed && (
					<div className="border-b border-border px-4 pb-2">
						<Button variant="ghost" size="icon-sm" onClick={() => setIsSidebarCollapsed()}>
							<PanelLeftCloseIcon className="size-5" />
						</Button>
					</div>
				)}
				<WorkspaceSelector />
				{project && (
					<div className="mb-4">
						<ProjectSelector />
					</div>
				)}
				{workspace && (
					<>
						<div className="flex items-center gap-1 px-4">
							<Button variant="secondary">+ New Note</Button>
							<Button variant="secondary">+ Generate Doc</Button>
						</div>
						<div className="no-scrollbar mt-4 flex flex-1 flex-col gap-4 overflow-y-auto px-4">
							<Button
								variant="secondary"
								className="w-full justify-start border border-border text-sm font-medium text-secondary hover:bg-card/50 hover:text-secondary"
							>
								<SearchIcon className="size-4" />
								<span>Search</span>
							</Button>
							<div className="border p-4 rounded-md">Projects List Placeholder</div>
							<div className="border p-4 rounded-md">Library View Placeholder</div>
						</div>
					</>
				)}
				<div className="flex w-full flex-col gap-2 px-4 py-2">
					<div className="hidden w-full flex-col items-stretch md:flex">
						<FeedbackDropdown />
					</div>
					{customerStatus?.isTrialing && (
						<div className="flex flex-row items-center justify-between rounded bg-card px-3 py-2">
							<div className="flex flex-col">
								<span className="text-sm font-medium text-secondary">Trial Status</span>
								<span className="text-sm">
									{`${pluralize(customerStatus.remainingDaysInTrial ?? 0, "day")} remaining`}
								</span>
							</div>
							{/* <Tooltip>
								<TooltipTrigger>
									<Link to={`/workspaces/${workspace?.slug}/settings`}>
										<Button variant="ghost" size="icon-sm" className="text-accent">
											<CircleFadingArrowUp className="size-5" />
										</Button>
									</Link>
								</TooltipTrigger>
								<TooltipContent>Upgrade plan</TooltipContent>
							</Tooltip> */}
						</div>
					)}
				</div>
				<div className="flex w-full flex-row items-center justify-between border-t border-border px-4 pb-2 pt-3">
					<div className="flex flex-col">
						<span className="text-sm font-medium text-secondary">Signed in as</span>
						<span className="text-sm">{userRecord.email}</span>
					</div>
					<SidebarDropdown />
				</div>
			</div>
		</div>
	);
}

