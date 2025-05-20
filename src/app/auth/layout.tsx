// import { HeroBackground } from "./Hero";
// import { SocialAuth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

// import { supabase } from "src/clients/supabase";
// import { SimpleLayout } from "./SimpleLayout";
// import { useUserGuard } from "./user";

// const appearance = {
// 	theme: ThemeSupa,
// 	variables: {
// 		default: {
// 			colors: {
// 				brand: "rgb(var(--color-accent))",
// 				brandAccent: "rgb(var(--color-accent) / 0.8)",
// 			},
// 			radii: {
// 				borderRadiusButton: "0.25rem",
// 			},
// 		},
// 	},
// 	className: {
// 		container: "font-sans",
// 		// button: "bg-accent text-background border-none font-sans font-medium rounded-md hover:bg-red-500",
// 		label: "font-sans font-medium",
// 		input: "font-sans rounded",
// 		message: "font-sans",
// 		anchor: "font-sans",
// 	},
// };

// export const AuthView = () => {
// 	const { user } = useUserGuard();
// 	const location = useLocation();

// 	if (user) {
// 		return <Navigate to="/" />;
// 	}

// 	return (
// 		<SimpleLayout className="p-2 md:p-8">
// 			<HeroBackground />
// 			<div className="flex h-dvh w-full flex-col items-center justify-center overflow-y-scroll p-0 md:p-8">
// 				<div className="absolute top-4 flex w-full justify-center">
// 					<img src="/logo.png" className="w-12" alt="Cloudy" />
// 				</div>
// 				<div className="relative w-full rounded-lg border border-border bg-background/90 p-6 md:w-[28rem] md:p-8">
// 					<div className="flex flex-col items-center justify-center gap-4">
// 						<div className="text-center font-display text-2xl font-bold">
// 							{location.pathname === "/auth/signup" ? "Sign up to Cloudy" : "Sign in to Cloudy"}
// 						</div>
// 					</div>
// 					<div className="w-full">
// 						<SocialAuth supabaseClient={supabase} providers={["google"]} appearance={appearance} />
// 						<Outlet />
// 					</div>
// 					<div className="absolute -bottom-12 left-0 flex w-full justify-center md:-bottom-8">
// 						<p className="mx-8 text-center text-xs text-tertiary">
// 							By signing up, you agree to our{" "}
// 							<Link to="https://usecloudy.com/tos" className="text-accent hover:text-accent/70 hover:underline">
// 								Terms of Service
// 							</Link>
// 							{" and "}
// 							<Link to="https://usecloudy.com/pp" className="text-accent hover:text-accent/70 hover:underline">
// 								Privacy Policy
// 							</Link>
// 							.
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</SimpleLayout>
// 	);
// };

// "use client";

// import { HeroBackground } from "./Hero";
// import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
// import { SimpleLayout } from "./SimpleLayout";

// // Mock user check just to render the view without navigation guard
// const useUserGuard = () => ({ user: null });

// export const AuthView = () => {
// 	const { user } = useUserGuard();
// 	const location = useLocation();

// 	if (user) {
// 		return <Navigate to="/" />;
// 	}

// 	return (
// 		<SimpleLayout className="p-2 md:p-8">
// 			<HeroBackground />
// 			<div className="flex h-dvh w-full flex-col items-center justify-center overflow-y-scroll p-0 md:p-8">
// 				<div className="absolute top-4 flex w-full justify-center">
// 					<img src="/logo.png" className="w-12" alt="Cloudy" />
// 				</div>
// 				<div className="relative w-full rounded-lg border border-border bg-background/90 p-6 md:w-[28rem] md:p-8">
// 					<div className="flex flex-col items-center justify-center gap-4">
// 						<div className="text-center font-display text-2xl font-bold">
// 							{location.pathname === "/auth/signup" ? "Sign up to Cloudy" : "Sign in to Cloudy"}
// 						</div>
// 					</div>
// 					<div className="w-full mt-4">
// 						{/* Static Sign-In Button */}
// 						<button className="w-full rounded bg-accent px-4 py-2 text-white hover:bg-accent/80">
// 							Sign in with Google
// 						</button>
// 						<Outlet />
// 					</div>
// 					<div className="absolute -bottom-12 left-0 flex w-full justify-center md:-bottom-8">
// 						<p className="mx-8 text-center text-xs text-tertiary">
// 							By signing up, you agree to our{" "}
// 							<Link to="https://usecloudy.com/tos" className="text-accent hover:text-accent/70 hover:underline">
// 								Terms of Service
// 							</Link>{" "}
// 							and{" "}
// 							<Link to="https://usecloudy.com/pp" className="text-accent hover:text-accent/70 hover:underline">
// 								Privacy Policy
// 							</Link>
// 							.
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</SimpleLayout>
// 	);
// };


"use client";

import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import { SimpleLayout } from "../../components/SimpleLayout";
import { SocialAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { HeroBackground } from "@/components/ui/Hero";


const supabaseUrl = "https://hello.supabase.co";
const supabaseAnonKey = "<your-anon-key>";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const appearance = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: "rgb(var(--color-accent))",
        brandAccent: "rgb(var(--color-accent) / 0.8)",
      },
      radii: {
        borderRadiusButton: "0.25rem",
      },
    },
  },
  className: {
    container: "font-sans",
    label: "font-sans font-medium",
    input: "font-sans rounded",
    message: "font-sans",
    anchor: "font-sans",
  },
};

// Mock user check
const useUserGuard = () => ({ user: null });

export default function AuthView( { children }: { children: React.ReactNode }){
  const { user } = useUserGuard();
  const pathname = usePathname();

  if (user) {
    redirect("/");
  }

  return (
    <SimpleLayout className="p-2 md:p-8">
      <HeroBackground />
      
      <div className="flex h-dvh w-full flex-col items-center justify-center overflow-y-scroll p-0 md:p-8">
        <div className="absolute top-4 flex w-full justify-center">
          <img src="/logo.png" className="w-12" alt="Cloudy" />
        </div>
        <div className="relative w-full rounded-lg border border-border bg-background/90 p-6 md:w-[28rem] md:p-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center font-display text-2xl font-bold">
              {pathname === "/auth/signup" ? "Sign up to Cloudy" : "Sign in to Cloudy"}
            </div>
          </div>
          <div className="w-full mt-4">
            <SocialAuth supabaseClient={supabase} providers={["google"]} appearance={appearance} />
            {children}
          </div>
          <div className="absolute -bottom-12 left-0 flex w-full justify-center md:-bottom-8">
            <p className="mx-8 text-center text-xs text-tertiary">
              By signing up, you agree to our{" "}
              <Link href="https://usecloudy.com/tos" className="text-accent hover:text-accent/70 hover:underline">
                Terms of Service
              </Link>
              {" and "}
              <Link href="https://usecloudy.com/pp" className="text-accent hover:text-accent/70 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    
    </SimpleLayout>
  );
};
