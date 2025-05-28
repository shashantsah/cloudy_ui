"use client";
import { ReactNode, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import Link from "next/link";
import { TitleArea } from "@/components/documentDetail/TitleArea";
import { EditorView }  from "@/components/documentDetail/EditorView";
import  SidebarView  from "@/components/SideBar";

import { SidebarProvider } from "@/components/SidebarProvider";
import { useSidebarContext } from "@/components/SidebarProvider"; // wherever it's defined
import { cn } from "@/utils";

export default function Home() {
  const { isSidebarCollapsed } = useSidebarContext();

  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    
 <div className="flex h-screen overflow-hidden">
      <div
        className={cn(
          "transition-all duration-200",
          isSidebarCollapsed ? "w-10" : "w-64",
          "relative shrink-0"
        )}
      >
        <SidebarView />
      </div>
      <div className="flex-1 overflow-auto">
        <EditorView />
      </div>
    </div>

   
  );
}
