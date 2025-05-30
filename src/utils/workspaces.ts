// import { handleSupabaseError } from "@cloudy/utils/common";
import { useQuery } from "@tanstack/react-query";

// import { supabase } from "src/clients/supabase";
// import { useWorkspace } from "src/stores/workspace";



import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hello.supabase.co";
const supabaseAnonKey = "<your-anon-key>";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const makeWorkspaceHomeUrl = (wsSlug: string) => {
	return `/workspaces/${wsSlug}`;
};

export const makeWorkspaceSettingsUrl = (wsSlug: string) => {
	return `/workspaces/${wsSlug}/settings`;
};

export const useWorkspaceProjects = () => {
	// const workspace = useWorkspace();
	const workspace = {
		slug: "shashant",
		id: "1234",
	};

	// return useQuery({
	// 	queryKey: ["workspace", workspace?.id, "projects"],
	// 	queryFn: async () => {
	// 		const data = handleSupabaseError(
	// 			await supabase
	// 				.from("projects")
	// 				.select("*, repository_connections:repository_connections(id)")
	// 				.eq("workspace_id", workspace?.id),
	// 		);

	// 		return data.map(project => ({
	// 			...project,
	// 			hasRepositoryConnection: project.repository_connections.length > 0,
	// 		}));
	// 	},
	// });
};
