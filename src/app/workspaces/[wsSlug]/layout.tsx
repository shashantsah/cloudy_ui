// import { WorkspaceRole, handleSupabaseError } from "@cloudy/utils/common";
"use client";
import { useEffect } from "react";
// import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { useAsync, useLocation } from "react-use";


// import { useUser, useUserOptions } from "@/stores/user";
// import { useWorkspaceStore } from "src/stores/workspace";

import { LoadingView } from "@/components/loading/LoadingView";
// import { SubscriptionModal } from "../pricing/PaymentGuard";
// import { useProject, useProjectStore } from "../projects/ProjectContext";



import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
const supabaseUrl = "https://hello.supabase.co";
const supabaseAnonKey = "<your-anon-key>";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const useWorkspaceSlug = (wsSlug: string) => {
// 	const user = useUser();
// 	const { workspace, role, setWorkspace, setRole } = useWorkspaceStore();



// 	useAsync(async () => {
// 		try {
// 			const workspace = handleSupabaseError(await supabase.from("workspaces").select("*").eq("slug", wsSlug).single());
// 			const { role } = handleSupabaseError(
// 				await supabase
// 					.from("workspace_users")
// 					.select("role")
// 					.eq("user_id", user.id)
// 					.eq("workspace_id", workspace.id)
// 					.single(),
// 			);

// 			setWorkspace(workspace);
// 			setRole(role as WorkspaceRole);

// 			return workspace;
// 		} catch (error) {
// 			console.error(error);
// 			redirect("/404");
// 		}
// 	}, [wsSlug, user.id]);

// 	return { isReady: Boolean(workspace && role), workspace, role };
// };

import { ReactNode } from "react";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
	// const { wsSlug, projectSlug } = useParams();
	// const userOptions = useUserOptions();
	// const { isReady } = useWorkspaceSlug(wsSlug!);

	// const { setProject } = useProjectStore();

	// useEffect(() => {
	// 	if (wsSlug && wsSlug !== "undefined") {
	// 		userOptions.set("last_opened_workspace", wsSlug);
	// 	}
	// }, [wsSlug]);

	// useEffect(() => {
	// 	if (!projectSlug) {
	// 		// Clear project when leaving project view
	// 		setProject(null);
	// 	}
	// }, [projectSlug, setProject]);

	// if (!wsSlug || wsSlug === "undefined") {
	// 	return <Navigate to="/" />;
	// }

	// if (!isReady) {
	// 	return <LoadingView />;
	// }

	return (
		<>
			{/* <Outlet /> */}
			{/* <SubscriptionModal /> */}
            {children}
		</>
	);
};
