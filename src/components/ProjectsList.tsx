import { FolderGit2Icon, FolderKanbanIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { useWorkspace } from "@/stores/workspace";
import { makeNewProjectUrl } from "@/utils/projects";
import { useWorkspaceProjects } from "@/utils/workspaces";

export const ProjectsList = () => {
	const workspace = useWorkspace();
	// const workspaceProjects = useWorkspaceProjects();
	// Mock data for workspaceProjects
	const workspaceProjects = [
		{
			id: "1",
			slug: "project-1",
			name: "Project One",
			hasRepositoryConnection: true,
		},
		{
			id: "2",
			slug: "project-2",
			name: "Project Two",
			hasRepositoryConnection: false,
		},
	];

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between gap-1">
				<span className="mb-1 text-sm font-medium text-secondary">Projects</span>
				<Link href={makeNewProjectUrl(workspace.slug)}>
					<Button variant="ghost" size="icon-sm" className="text-secondary">
						<PlusIcon className="size-4" />
					</Button>
				</Link>
			</div>
			{workspaceProjects && workspaceProjects.length > 0 ? (
				workspaceProjects.map(project => (
					<Link href={`/workspaces/${workspace.slug}/projects/${project.slug}`} key={project.id}>
						<div className="flex w-full items-center gap-2 rounded px-2 py-1 text-sm hover:bg-card">
							{project.hasRepositoryConnection ? (
								<FolderGit2Icon className="size-4" />
							) : (
								<FolderKanbanIcon className="size-4" />
							)}
							<span>{project.name}</span>
						</div>
					</Link>
				))
			) : (
				<div className="mt-1 w-full rounded border border-dashed border-border px-4 py-1 text-center text-xs text-tertiary">
					No projects yet
				</div>
			)}
		</div>
	);
};
