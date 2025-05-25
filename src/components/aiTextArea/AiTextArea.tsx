import { Hotkey } from "@/components/ui/HotKey";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "react-router-dom";

// Mock editor and dependencies
interface MarkdownStorage {
    getMarkdown: () => string;
}

interface EditorStorage {
    markdown: MarkdownStorage;
}

interface EditorCommands {
    focus: () => void;
    clearContent: () => void;
    first: (commands: Array<() => void>) => void;
    newlineInCode: () => void;
    createParagraphNear: () => void;
    liftEmptyBlock: () => void;
    splitBlock: () => void;
}

interface EditorJSONContent {
    type: string;
    content: Array<{ type: string; content?: Array<{ type: string; text: string }> }>;
}

interface MockEditor {
    getText: () => string;
    storage: EditorStorage;
    commands: EditorCommands;
    getJSON: () => EditorJSONContent;
}

const mockEditor: MockEditor = {
    getText: () => "Sample input",
    storage: { markdown: { getMarkdown: () => "Sample input" } },
    commands: {
        focus: () => console.log("Editor focused"),
        clearContent: () => console.log("Content cleared"),
        first: (commands: Array<() => void>) => commands[3](), // Simulate Shift+Enter
        newlineInCode: () => console.log("Newline in code"),
        createParagraphNear: () => console.log("Create paragraph near"),
        liftEmptyBlock: () => console.log("Lift empty block"),
        splitBlock: () => console.log("Split block"),
    },
    getJSON: () => ({
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: "Sample input" }] }],
    }),
};

const mockFileReferences = [
  {
    path: "src/index.js",
    repoFullName: "owner/repo1",
    fileUrl: "https://github.com/owner/repo1/blob/main/src/index.js",
    mentioned: true,
  },
  {
    path: "src/utils.js",
    repoFullName: "owner/repo1",
    fileUrl: "https://github.com/owner/repo1/blob/main/src/utils.js",
    mentioned: false,
  },
];

const mockExistingLinkedFiles = [
  {
    path: "src/main.js",
    repoFullName: "owner/repo1",
    fileUrl: "https://github.com/owner/repo1/blob/main/src/main.js",
  },
];

const mockProject = { id: "project-1", slug: "sample-project" };
const mockWorkspace = { slug: "sample-workspace" };
const mockProjectRepos = [{ id: "repo-1", fullName: "owner/repo1" }];
const mockGetAllNodesWithType = () => [{ id: "src/index.js" }, { id: "src/utils.js" }];
const mockMakeNewProjectUrl = () => "/workspaces/sample-workspace/new-project";
const mockMakeProjectSettingsUrl = () => "/workspaces/sample-workspace/projects/sample-project/settings";

// Mock components
const EditorContent = ({ editor }: { editor: MockEditor }) => (
  <textarea
    className="w-full resize-none border-none bg-transparent text-sm outline-none"
    defaultValue="Sample input"
    onChange={() => console.log("Editor content updated")}
  />
);

// Mock context
const AiTextAreaContext = {
  Provider: ({ value, children }: { value: any; children: React.ReactNode }) => <div>{children}</div>,
};

import { Button } from "@/components/Button";
import { FileReferenceRow } from "./FileReferenceRow";
import { useState } from "react";

interface AiTextAreaProps {
  onSubmit?: (text: string, references: any[]) => void;
  onSecondaryAction?: (text: string, references: any[]) => void;
  onCancel?: () => void;
  placeholder?: string;
  secondaryButtonText?: string;
  submitButtonText?: string;
  showEditButton?: boolean;
  onEdit?: () => void;
  existingLinkedFiles?: any[];
  disableNewFileReference?: boolean;
  addButtonText?: string;
  showConnectTooltip?: boolean;
}

export const AiTextArea = ({
  onSubmit = () => {},
  onSecondaryAction,
  onCancel = () => console.log("Cancel"),
  placeholder = "Ask a question or describe what you want to do",
  submitButtonText = "Submit",
  onEdit,
  existingLinkedFiles = mockExistingLinkedFiles,
  disableNewFileReference,
  secondaryButtonText,
  addButtonText,
  showConnectTooltip = false,
}: AiTextAreaProps) => {
  const hasGitRepoConnected = mockProjectRepos.length > 0;
  const [fileReferences, setFileReferences] = useState(mockFileReferences);
  const [mentionedPaths, setMentionedPaths] = useState(["src/index.js", "src/utils.js"]);
  const editor = mockEditor;
  const hasContent = editor.getText().trim().length > 0;

  const handleSubmit = (isSecondaryAction = false) => {
    if (editor && editor.getText().trim()) {
      const content = editor.storage.markdown.getMarkdown();
      if (isSecondaryAction) {
        onSecondaryAction?.(content, fileReferences);
      } else {
        onSubmit(content, fileReferences);
      }
      setFileReferences([]);
      setMentionedPaths([]);
      editor.commands.clearContent();
    }
  };

  return (
    <AiTextAreaContext.Provider
      value={{ fileReferences, setFileReferences, existingLinkedFiles }}
    >
      <div className="relative flex w-full flex-col gap-4 p-2">
        <EditorContent editor={editor} />
        <div className="flex flex-row items-start justify-between gap-2">
          {hasGitRepoConnected ? (
            <FileReferenceRow
              disableAdd={disableNewFileReference}
              addButtonText={addButtonText}
              showConnectTooltip={showConnectTooltip}
            />
          ) : mockProject ? (
            <Link to={mockMakeProjectSettingsUrl()}>
              <Button size="xs" variant="outline">
                <SiGithub className="size-3" />
                <span>Connect a git repo to reference files</span>
              </Button>
            </Link>
          ) : (
            <div className="flex-1 overflow-hidden">
              <Link to={mockMakeNewProjectUrl()} className="block">
                <Button size="xs" variant="outline" className="mt-0.5 w-full">
                  <SiGithub className="size-3 shrink-0" />
                  <span className="truncate">Create a project with a git repo to reference files</span>
                </Button>
              </Link>
            </div>
          )}
          <div className="flex shrink-0 flex-row gap-1">
            {onSecondaryAction && (
              <Button
                size="sm"
                variant="ghost"
                className="text-blue-600"
                onClick={() => handleSubmit(true)}
                disabled={!hasContent}
              >
                <Hotkey keys={["cmd", "Enter"]} />
                <span>{secondaryButtonText || "Secondary Action"}</span>
              </Button>
            )}
            <Button size="sm" variant="default" onClick={() => handleSubmit()} disabled={!hasContent}>
              <Hotkey keys={["Enter"]} />
              <span>{submitButtonText}</span>
            </Button>
          </div>
        </div>
      </div>
    </AiTextAreaContext.Provider>
  );
};