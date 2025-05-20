import { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import Link from "next/link";


export default function Home() {
  return (
   <div className="bg-red-500 text-white p-4 text-center">
      <Button variant="outline" className="mt-4">
        <Link href="/auth">
        Get Started
        </Link>
        </Button>       
    </div>
  );
}
