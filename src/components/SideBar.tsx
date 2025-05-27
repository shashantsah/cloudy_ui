
"use client";
// import {
//     CircleFadingArrowUp,
//     PanelLeftCloseIcon,
//     SearchIcon,
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// import { Button } from "@/components/Button";
// import { FeedbackDropdown } from "@/components/Feedback";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip";
// import { cn } from "@/utils";
// import { pluralize } from "@/utils/strings";
// import { WorkspaceSelector } from "@/components/WorkspaceSelector";
// import { SidebarDropdown } from "@/components/SidebarDropdown";
// import { ProjectSelector } from "@/components/ProjectSelector";
// import { useSidebarContext } from "./SidebarProvider";
// import { useEffect } from "react";
// import { useBreakpoint } from "@/utils/tailwind";
// import { NewNote } from "./NewNote";
// import { ProjectsList } from "./ProjectsList";
// import { GenerateDoc } from "./GenerateDoc";
// import { LibraryView } from "./LibraryView";


// const minimalSidebarRoutePaths = [
//     "/workspaces/new/setup",
//     "/auth/invite-accept",
//     "/auth/complete-account-setup",
// ];

// export default function SidebarView() {
//     // const location = useLocation();
//     // const isMinimalSidebar = minimalSidebarRoutePaths.includes(location.pathname);
//     const { isSidebarCollapsed, setIsSidebarCollapsed, isMobileSidebarOpen, isSidebarFixed } = useSidebarContext();

//     const isMdBreakpoint = useBreakpoint("md");
// 	const isMobile = !isMdBreakpoint;
//     const userRecord = { email: "user@example.com" };
//     const workspace = { slug: "mock-workspace" };
//     const customerStatus = { isTrialing: true, remainingDaysInTrial: 7 };
//     const project = true;

//     useEffect(() => {
// 		const handleEscPress = (e: KeyboardEvent) => {
// 			if (e.key === "Escape" && isSidebarFixed) {
// 				setIsSidebarCollapsed(true);
// 			}
// 		};

// 		window.addEventListener("keydown", handleEscPress);
// 		return () => window.removeEventListener("keydown", handleEscPress);
// 	}, [isSidebarFixed, setIsSidebarCollapsed]);

//     if (isMobile && !isMobileSidebarOpen) {
// 		return null;
// 	}

//     return (
        
            
//         <div className={cn("relative h-full md:h-dvh md:w-64", isSidebarFixed && "transition-transform duration-200 md:w-0")}>
//             <div
// 				className={cn(
// 					"absolute top-0 z-50 flex h-full w-screen flex-col overflow-hidden border-r border-border bg-background py-2 pt-4 transition-transform duration-200 ease-in-out md:sticky md:h-dvh md:w-64 md:pt-2",
// 					isSidebarFixed && "md:absolute",
// 					isSidebarFixed && isSidebarCollapsed ? "-translate-x-full" : "translate-x-0",
// 				)}>
//                 {isSidebarFixed && (
// 					<div className="border-b border-border px-4 pb-2">
// 						<Button variant="ghost" size="icon-sm" onClick={() => setIsSidebarCollapsed(true)}>
// 							<PanelLeftCloseIcon className="size-5" />
// 						</Button>
// 					</div>
// 				)}
//                 <WorkspaceSelector />
//                 {project && (
// 					<div className="mb-4">
// 						<ProjectSelector />
// 					</div>
// 				)}
//               {workspace && (
// 					<>
// 						<div className="flex items-center gap-1 px-4">
// 							<NewNote />
// 							<GenerateDoc />
// 						</div>
// 						<div className="no-scrollbar mt-4 flex flex-1 flex-col gap-4 overflow-y-auto px-4">
// 							<Button
// 								variant="secondary"
// 								className="w-full justify-start border border-border text-sm font-medium text-secondary hover:bg-card/50 hover:text-secondary"
// 								// onClick={() => setIsSearchBarOpen(true)}
//                                 >
// 								<SearchIcon className="size-4" />
// 								<span>Search</span>
// 							</Button>
// 							{!project && <ProjectsList />}
//                             <ProjectsList />
// 							<LibraryView />
// 							{/* <LatestThoughts /> */}
// 							{/* <Collections /> */}
// 							{/* {project && <PendingPullRequests />} */}
// 							<div className="h-4" />
// 						</div>
// 					</>
// 				)}

             
//                 <div className="flex w-full flex-row items-center justify-between border-t border-border px-4 pb-2 pt-3">
// 					{userRecord && (
// 						<div className="flex flex-col">
// 							<span className="text-sm font-medium text-secondary">Signed in as</span>
// 							<span className="text-sm">{userRecord.email}</span>
// 						</div>
// 					)}
// 					<SidebarDropdown />
// 				</div>
                
//             </div>
//             {isSidebarFixed && (
// 				<div
// 					className={cn(
// 						"absolute bottom-0 left-0 right-0 top-0 z-40 h-screen w-screen bg-black/5 backdrop-blur-sm transition-opacity duration-200 ease-in-out",
// 						isSidebarCollapsed ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
// 					)}
// 					onClick={() => setIsSidebarCollapsed(true)}
// 				/>
// 			)}
            
//         </div>   
//     );
// }


import {
    CircleFadingArrowUp,
    PanelLeftCloseIcon,
    PanelLeftOpenIcon,
    SearchIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/Button";
import { FeedbackDropdown } from "@/components/Feedback";
import { cn } from "@/utils";
import { pluralize } from "@/utils/strings";
import { WorkspaceSelector } from "@/components/WorkspaceSelector";
import { SidebarDropdown } from "@/components/SidebarDropdown";
import { ProjectSelector } from "@/components/ProjectSelector";
import { useSidebarContext } from "./SidebarProvider";
import { useEffect } from "react";
import { useBreakpoint } from "@/utils/tailwind";
import { NewNote } from "./NewNote";
import { ProjectsList } from "./ProjectsList";
import { GenerateDoc } from "./GenerateDoc";
import { LibraryView } from "./LibraryView";

const minimalSidebarRoutePaths = [
    "/workspaces/new/setup",
    "/auth/invite-accept",
    "/auth/complete-account-setup",
];

export default function SidebarView() {
    const { 
        isSidebarCollapsed, 
        setIsSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isSidebarFixed,
        toggleSidebar,
        toggleMobileSidebar
    } = useSidebarContext();

    const isMdBreakpoint = useBreakpoint("md");
    const isMobile = !isMdBreakpoint;
    const userRecord = { email: "user@example.com" };
    const workspace = { slug: "mock-workspace" };
    const customerStatus = { isTrialing: true, remainingDaysInTrial: 7 };
    const project = true;

    useEffect(() => {
        const handleEscPress = (e: KeyboardEvent) => {
            if (e.key === "Escape" && (isSidebarFixed || isMobileSidebarOpen)) {
                if (isMobile) {
                    setIsMobileSidebarOpen(false);
                } else {
                    setIsSidebarCollapsed(true);
                }
            }
        };

        window.addEventListener("keydown", handleEscPress);
        return () => window.removeEventListener("keydown", handleEscPress);
    }, [isSidebarFixed, isMobileSidebarOpen, isMobile]);

    if (isMobile && !isMobileSidebarOpen) {
        return null;
    }

    const handleClose = () => {
        if (isMobile) {
            setIsMobileSidebarOpen(false);
        } else {
            setIsSidebarCollapsed(true);
        }
    };

    return (
        <>
            {/* Toggle button - shows when sidebar is collapsed on desktop */}
            {isSidebarCollapsed && !isMobile && (
                <div className="fixed left-0 top-4 z-50">
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="ml-2 border border-border bg-background shadow-sm hover:bg-card/50"
                        onClick={() => setIsSidebarCollapsed(false)}
                    >
                        <PanelLeftOpenIcon className="size-5" />
                    </Button>
                </div>
            )}

            {/* Sidebar container */}
            <div className={cn(
                "fixed inset-0 z-40 h-full md:relative md:h-dvh",
                "transition-all duration-200",
                isSidebarCollapsed ? "md:w-0" : "md:w-64",
                isMobile ? "z-50" : "z-40"
            )}>
                {/* Mobile backdrop */}
                {isMobile && (
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                )}
                
                {/* Sidebar content */}
                <div className={cn(
                    "absolute left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-background py-2 pt-4 transition-transform duration-200 ease-in-out md:relative md:pt-2",
                    isMobile && !isMobileSidebarOpen ? "-translate-x-full" : "translate-x-0",
                    isSidebarCollapsed && !isMobile ? "md:-translate-x-full" : "md:translate-x-0"
                )}>
                    {/* Header with close button */}
                    <div className="flex items-center justify-between border-b border-border px-4 pb-2">
                        {/* {!isSidebarFixed && (
                            <span className="text-sm font-medium text-secondary">Navigation</span>
                        )} */}
                        <Button 
                            variant="ghost" 
                            size="icon-sm" 
                            onClick={handleClose}
                            className="mr-auto"
                        >
                            <PanelLeftCloseIcon className="size-5" />
                        </Button>
                    </div>

                    <WorkspaceSelector />
                    {project && (
                        <div className="mb-4">
                            <ProjectSelector />
                        </div>
                    )}
                    {workspace && (
                        <>
                            <div className="flex items-center gap-1 px-4">
                                <NewNote />
                                <GenerateDoc />
                            </div>
                            <div className="no-scrollbar mt-4 flex flex-1 flex-col gap-4 overflow-y-auto px-4">
                                <Button
                                    variant="secondary"
                                    className="w-full justify-start border border-border text-sm font-medium text-secondary hover:bg-card/50 hover:text-secondary"
                                >
                                    <SearchIcon className="size-4" />
                                    <span>Search</span>
                                </Button>
                                {!project && <ProjectsList />}
                                <ProjectsList />
                                <LibraryView />
                                <div className="h-4" />
                            </div>
                        </>
                    )}

                    <div className="flex w-full flex-row items-center justify-between border-t border-border px-4 pb-2 pt-3">
                        {userRecord && (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-secondary">Signed in as</span>
                                <span className="text-sm">{userRecord.email}</span>
                            </div>
                        )}
                        <SidebarDropdown />
                    </div>
                </div>
            </div>
        </>
    );
}