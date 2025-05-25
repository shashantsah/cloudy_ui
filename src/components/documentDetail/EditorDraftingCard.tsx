import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/Button";
import Link from "next/link";

// Mock data
const mockWorkspace = {
  id: "workspace-1",
  slug: "sample-workspace",
};
const mockProject = {
  id: "project-1",
  slug: "sample-project",
};
const mockDocumentDraft = {
  pull_request_metadata: {
    repo: {
      owner: "example-owner",
      name: "example-repo",
    },
    pr_number: 123,
    id: "pr-123",
  },
  status: "DRAFT" as const,
};

// Mock utility functions
const makeGithubPrUrl = (owner: string, name: string, prNumber: number) =>
  `https://github.com/${owner}/${name}/pull/${prNumber}`;
const makePrDraftPath = ({
  workspaceSlug,
  projectSlug,
  prMetadataId,
}: {
  workspaceSlug: string;
  projectSlug: string;
  prMetadataId: string;
}) =>
  `/${workspaceSlug}/${projectSlug}/drafts/${prMetadataId}`;

// Placeholder for DraftingTitle and DraftingButtons
type DocumentDraft = typeof mockDocumentDraft;

const DraftingTitle = ({ documentDraft }: { documentDraft: DocumentDraft }) => (
  <h3 className="text-lg font-semibold">Draft for PR #{documentDraft.pull_request_metadata.pr_number}</h3>
);
const DraftingButtons = ({ documentDraft }: { documentDraft: DocumentDraft }) => (
  <div className="flex gap-2">
    <Button size="sm" variant="outline">
      Confirm
    </Button>
    <Button size="sm" variant="ghost">
      Skip
    </Button>
  </div>
);

export const EditorDraftingCard = () => {
  const workspace = mockWorkspace;
  const project = mockProject;
  const documentDraft = mockDocumentDraft;

  if (!documentDraft?.pull_request_metadata?.repo || !project) {
    return null;
  }

  const status = documentDraft.status;

  const githubPrUrl = makeGithubPrUrl(
		documentDraft.pull_request_metadata.repo.owner,
		documentDraft.pull_request_metadata.repo.name,
		documentDraft.pull_request_metadata.pr_number,
	);

  const prNumberContent = (
		<a href={githubPrUrl} className="font-medium text-accent hover:underline">
			<span>#{documentDraft.pull_request_metadata.pr_number}</span>
			<ExternalLinkIcon className="mb-1 ml-1 inline-block size-4" />
		</a>
	);

  const textStates = {
    PUBLISHED:<p>This doc is published and tied to pull request {prNumberContent}.</p>,
    DRAFT:(
			<p>
				This doc is a draft tied to pull request {prNumberContent}. Hit confirm to publish it when the pull request gets
				merged.
			</p>
		),
    CONFIRMED: (
			<p>
				This doc is confirmed to be published when pull request {prNumberContent}
				gets merged
			</p>
		),
    SKIPPED:  (
			<p>
				This doc is skipped and will not be published when pull request {prNumberContent}
				gets merged
			</p>
		),
  };

  return (
    <>
      <div className="mb-4">
        <Link
					href={makePrDraftPath({
						workspaceSlug: workspace.slug,
						projectSlug: project.slug,
						prMetadataId: documentDraft.pull_request_metadata.id,
					})}>
         <Button variant="ghost" size="sm">
						<ArrowLeftIcon className="size-4" />
						<span>Back to draft docs for PR #{documentDraft?.pull_request_metadata?.pr_number}</span>
					</Button>
        </Link>
      </div>
     <div className="flex flex-col gap-2 rounded-md border border-border p-4">
				<DraftingTitle documentDraft={documentDraft} />
				<div>{textStates[status]}</div>
				<div className="mt-2">
					<DraftingButtons documentDraft={documentDraft} />
				</div>
			</div>
    </>
  );
};