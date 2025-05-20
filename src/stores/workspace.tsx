// import { WorkspaceRecord, WorkspaceRole, handleSupabaseError } from "@cloudy/utils/common";
import { useQuery } from "@tanstack/react-query";
// import { create } from "zustand";

// import { workspaceQueryKeys } from "src/api/queryKeys";
// import { supabase } from "src/clients/supabase";

// export const useWorkspaceStore = create<{
// 	workspace: WorkspaceRecord | null;
// 	role: WorkspaceRole | null;
// 	setWorkspace: (workspace: WorkspaceRecord | null) => void;
// 	setRole: (role: WorkspaceRole | null) => void;
// }>(set => ({
// 	workspace: null,
// 	role: null,
// 	setWorkspace: workspace => set({ workspace }),
// 	setRole: role => set({ role }),
// }));

// export const useWorkspace = () => {
// 	const { workspace } = useWorkspaceStore();
// 	return workspace!;
// };

// export const useWorkspaceSlug = () => {
// 	const { workspace } = useWorkspaceStore();
// 	return workspace!.slug;
// };

// export const useWorkspaceRole = () => {
// 	const { role } = useWorkspaceStore();
// 	return role!;
// };

// export const getUserWorkspaceAndRole = async (userId: string) => {
// 	const workspaceAndRole = handleSupabaseError(
// 		await supabase.from("workspace_users").select("workspace:workspaces(*), role").eq("user_id", userId).limit(1).single(),
// 	);

// 	return workspaceAndRole as { workspace: WorkspaceRecord; role: WorkspaceRole };
// };

// export const getAllUserWorkspaces = async (userId: string) => {
// 	const workspaces = handleSupabaseError(
// 		await supabase.from("workspace_users").select("workspace:workspaces(*)").eq("user_id", userId),
// 	).flatMap(({ workspace }) => (workspace ? [workspace] : []));

// 	return workspaces;
// };

// export const useWorkspaceGithubInstallations = () => {
// 	const workspace = useWorkspace();

// 	return useQuery({
// 		queryKey: workspaceQueryKeys.workspaceGithubInstallations(workspace.slug),
// 		queryFn: async () => {
// 			const installations = handleSupabaseError(
// 				await supabase.from("workspace_github_connections").select("*").eq("workspace_id", workspace.id),
// 			);

// 			return installations;
// 		},
// 	});
// };




// src/mocks/mockWorkspace.ts

type WorkspaceRecord = {
  id: string;
  slug: string;
  name: string;
};

type WorkspaceRole = "admin" | "member" | "viewer";

export const useWorkspaceStore = () => {
  return {
    workspace: {
      id: "ws_001",
      slug: "mock-workspace",
      name: "Mock Workspace",
    } as WorkspaceRecord,
    role: "admin" as WorkspaceRole,
    setWorkspace: (workspace: WorkspaceRecord | null) => {
      console.log("Mock setWorkspace:", workspace);
    },
    setRole: (role: WorkspaceRole | null) => {
      console.log("Mock setRole:", role);
    },
  };
};

export const useWorkspace = (): WorkspaceRecord => {
  return {
    id: "ws_001",
    slug: "mock-workspace",
    name: "Mock Workspace",
  };
};

export const useWorkspaceSlug = (): string => {
  return "mock-workspace";
};

export const useWorkspaceRole = (): WorkspaceRole => {
  return "admin";
};

export const getUserWorkspaceAndRole = async (userId: string): Promise<{
  workspace: WorkspaceRecord;
  role: WorkspaceRole;
}> => {
  return {
    workspace: {
      id: "ws_001",
      slug: "mock-workspace",
      name: "Mock Workspace",
    },
    role: "admin",
  };
};

export const getAllUserWorkspaces = async (userId: string): Promise<WorkspaceRecord[]> => {
  return [
    {
      id: "ws_001",
      slug: "mock-workspace",
      name: "Mock Workspace1",
    },
    {
      id: "ws_002",
      slug: "another-workspace",
      name: "Another Workspace",
    },
  ];
};

export const useWorkspaceGithubInstallations = () => {
  return {
    data: [
      {
        id: "gh_001",
        workspace_id: "ws_001",
        installation_id: 123456,
      },
    ],
    isLoading: false,
    error: null,
  };
};

