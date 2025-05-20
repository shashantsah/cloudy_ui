// import { CheckIcon, ChevronDownIcon, HomeIcon, LayoutDashboardIcon, PlusIcon, SettingsIcon } from "lucide-react";
// import { Link } from "react-router-dom";

// import { Button } from "@/components/Button";
// import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/Dropdown";
// import { useAllUserWorkspaces } from "@/stores/user";
// import { useWorkspaceStore } from "@/stores/workspace";
// import { cn } from "@/utils";
// import { makeWorkspaceHomeUrl, makeWorkspaceSettingsUrl } from "@/utils/workspaces";

// export const WorkspaceSelector = () => {
// 	const currentWorkspace = useWorkspaceStore();
// 	const { data: allUserWorkspaces } = useAllUserWorkspaces();

// 	if (!currentWorkspace) {
// 		return null;
// 	}

// 	return (
// 		<div className="mb-2 flex max-w-full items-center justify-between gap-1 overflow-hidden border-b border-border px-4 py-2">
// 			<div className="flex flex-1 overflow-hidden">
// 				<Dropdown
// 					trigger={
// 						<Button
// 							variant="outline"
// 							className="flex h-12 flex-1 items-center justify-between overflow-hidden pr-2">
// 							<div className="flex flex-1 flex-col items-start overflow-hidden">
// 								<span className="text-xs text-secondary">Workspace</span>
// 								<span className="truncate">{currentWorkspace.name}</span>
// 							</div>
// 							<ChevronDownIcon className="size-4" />
// 						</Button>
// 					}>
// 					<div className="flex flex-col">
// 						<Link to={makeWorkspaceHomeUrl(currentWorkspace.slug)}>
// 							<DropdownItem>
// 								<HomeIcon className="size-4" />
// 								Workspace home
// 							</DropdownItem>
// 						</Link>
// 						<Link to={makeWorkspaceSettingsUrl(currentWorkspace.slug)}>
// 							<DropdownItem>
// 								<SettingsIcon className="size-4" />
// 								Workspace settings
// 							</DropdownItem>
// 						</Link>
// 						<DropdownSeparator />
// 						<span className="pb-0.5 pl-3 pt-1 text-xs font-medium text-secondary">Your Workspaces</span>
// 						{allUserWorkspaces?.map(workspace => (
// 							<Link to={`/workspaces/${workspace.slug}`} key={workspace.id}>
// 								<DropdownItem className={cn(workspace.id === currentWorkspace.id ? "bg-card/50" : "")}>
// 									{workspace.id === currentWorkspace.id ? (
// 										<CheckIcon className="h-4 w-4" />
// 									) : (
// 										<span className="w-4" />
// 									)}
// 									<span
// 										className={cn(
// 											"flex-1 text-sm",
// 											workspace.id === currentWorkspace.id ? "font-medium" : "",
// 										)}>
// 										{workspace.name}
// 									</span>
// 								</DropdownItem>
// 							</Link>
// 						))}
// 						<DropdownSeparator />
// 						<Link to="/onboarding/workspaces/new">
// 							<DropdownItem className="text-accent hover:bg-accent/10">
// 								<PlusIcon className="size-4" />
// 								Create new workspace
// 							</DropdownItem>
// 						</Link>
// 					</div>
// 				</Dropdown>
// 			</div>
// 		</div>
// 	);
// };




import {
  CheckIcon,
  ChevronDownIcon,
  HomeIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/Button";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/Dropdown";
import { cn } from "@/utils";

const currentWorkspace = {
  id: "w1",
  name: "Shashant's Workspace",
  slug: "mock-workspace",
};

const allUserWorkspaces = [
  {
    id: "w1",
    name: "Mock Workspace",
    slug: "mock-workspace",
  },
  {
    id: "w2",
    name: "Demo Workspace",
    slug: "demo-workspace",
  },
  {
    id: "w3",
    name: "Test Org",
    slug: "test-org",
  },
];

// Utility URLs (same as before)
const makeWorkspaceHomeUrl = (slug: string) => `/workspaces/${slug}`;
const makeWorkspaceSettingsUrl = (slug: string) => `/workspaces/${slug}/settings`;

export const WorkspaceSelector = () => {
  return (
    <div className="mb-2 flex max-w-full items-center justify-between gap-1 overflow-hidden border-b border-border px-4 py-2">
      <div className="flex flex-1 overflow-hidden">
        <Dropdown
          trigger={
            <Button
              variant="outline"
              className="flex h-12 flex-1 items-center justify-between overflow-hidden pr-2"
            >
              <div className="flex flex-1 flex-col items-start overflow-hidden">
                <span className="text-xs text-secondary">Workspace</span>
                <span className="truncate">{currentWorkspace.name}</span>
              </div>
              <ChevronDownIcon className="size-4" />
            </Button>
          }
        >
          <div className="flex flex-col">
            <Link to={makeWorkspaceHomeUrl(currentWorkspace.slug)}>
              <DropdownItem>
                <HomeIcon className="size-4" />
                Workspace home
              </DropdownItem>
            </Link>
            <Link to={makeWorkspaceSettingsUrl(currentWorkspace.slug)}>
              <DropdownItem>
                <SettingsIcon className="size-4" />
                Workspace settings
              </DropdownItem>
            </Link>

            <DropdownSeparator />
            <span className="pb-0.5 pl-3 pt-1 text-xs font-medium text-secondary">
              Your Workspaces
            </span>

            {allUserWorkspaces.map((workspace) => (
              <Link to={`/workspaces/${workspace.slug}`} key={workspace.id}>
                <DropdownItem
                  className={cn(
                    workspace.id === currentWorkspace.id ? "bg-card/50" : ""
                  )}
                >
                  {workspace.id === currentWorkspace.id ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <span className="w-4" />
                  )}
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      workspace.id === currentWorkspace.id ? "font-medium" : ""
                    )}
                  >
                    {workspace.name}
                  </span>
                </DropdownItem>
              </Link>
            ))}

            <DropdownSeparator />
            <Link to="/onboarding/workspaces/new">
              <DropdownItem className="text-accent hover:bg-accent/10">
                <PlusIcon className="size-4" />
                Create new workspace
              </DropdownItem>
            </Link>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

