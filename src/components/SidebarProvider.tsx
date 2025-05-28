"use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useLocalStorage, useLocation } from "react-use";

// export const SidebarContext = createContext<{
// 	isSidebarCollapsed?: boolean;
// 	setIsSidebarCollapsed: (isSidebarCollapsed: boolean) => void;
// 	isSidebarFixed?: boolean;
// 	setIsSidebarFixed: (isSidebarFixed: boolean) => void;
// 	isMobileSidebarOpen?: boolean;
// 	setIsMobileSidebarOpen: (isMobileSidebarOpen: boolean) => void;
// }>({
// 	isSidebarCollapsed: false,
// 	setIsSidebarCollapsed: () => {},
// 	isSidebarFixed: false,
// 	setIsSidebarFixed: () => {},
// 	isMobileSidebarOpen: false,
// 	setIsMobileSidebarOpen: () => {},
// });

// export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage("isSidebarCollapsed", false);
// 	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
// 	const [isSidebarFixed, setIsSidebarFixed] = useState(false);

// 	const location = useLocation();

// 	useEffect(() => {
// 		setIsMobileSidebarOpen(false);
// 	}, [location.pathname]);

// 	return (
// 		<SidebarContext.Provider
// 			value={{
// 				isSidebarCollapsed,
// 				setIsSidebarCollapsed,
// 				isMobileSidebarOpen,
// 				setIsMobileSidebarOpen,
// 				isSidebarFixed,
// 				setIsSidebarFixed,
// 			}}>
// 			{children}
// 		</SidebarContext.Provider>
// 	);
// };

// export const useSidebarContext = ({ isFixed }: { isFixed?: boolean } = {}) => {
// 	const context = useContext(SidebarContext);

// 	useEffect(() => {
// 		if (typeof isFixed === "boolean") {
// 			context.setIsSidebarFixed(isFixed);
// 		}
// 	}, [isFixed, context]);

// 	return context;
// };



// SidebarProvider.tsx

import { createContext, useContext, useState, useEffect } from 'react';

type SidebarContextType = {
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: (value: boolean) => void;
    isMobileSidebarOpen: boolean;
    setIsMobileSidebarOpen: (value: boolean) => void;
    isSidebarFixed: boolean;
    setIsSidebarFixed: (value: boolean) => void;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType>({} as SidebarContextType);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isSidebarFixed, setIsSidebarFixed] = useState(false);

    const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);
    const toggleMobileSidebar = () => setIsMobileSidebarOpen(prev => !prev);

    // Optional: Persist state in localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState) {
            setIsSidebarCollapsed(JSON.parse(savedState));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
    }, [isSidebarCollapsed]);

    return (
        <SidebarContext.Provider value={{
            isSidebarCollapsed,
            setIsSidebarCollapsed,
            isMobileSidebarOpen,
            setIsMobileSidebarOpen,
            isSidebarFixed,
            setIsSidebarFixed,
            toggleSidebar,
            toggleMobileSidebar,
        }}>
            {children}
        </SidebarContext.Provider>
    );
}

export const useSidebarContext = () => useContext(SidebarContext);