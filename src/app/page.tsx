import { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import Link from "next/link";
import { TitleArea } from "@/components/documentDetail/TitleArea";
import { EditorView } from "@/components/documentDetail/EditorView";
import  SidebarView  from "@/components/SideBar";


export default function Home() {
  return (
  //  <div className="bg-red-500 text-white p-4 text-center">
  //     <Button variant="outline" className="mt-4">
  //       <Link href="/auth">
  //       Get Started
  //       </Link>
  //       </Button>  
        
  //   </div>
  
   <div className="flex h-screen overflow-hidden">
  <div className="w-[250px] shrink-0 border-r">
    <SidebarView />
  </div>
  <div className="flex-1 overflow-auto">
    <EditorView />
  </div>
</div>
  );
}
