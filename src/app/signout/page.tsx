"use client";

import { useAsync } from "react-use";

import { SimpleLayout } from "@/components/SimpleLayout";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
const supabaseUrl = "https://hello.supabase.co";
const supabaseAnonKey = "<your-anon-key>";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default function SignOutView(){
	useAsync(async () => {
		// await supabase.auth.signOut();
		redirect("/");
	}, []);

	return (
		<SimpleLayout>
			<div>
				<p>You have been signed out</p>
			</div>
		</SimpleLayout>
	);
};
