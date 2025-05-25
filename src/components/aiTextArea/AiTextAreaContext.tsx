export interface RepoReferenceWithMention {
  path: string;
  repoFullName: string;
  fileUrl: string;
  mentioned?: boolean;
}

// Define or import FileTreeItem type here
export interface FileTreeItem {
  id: string;
  name: string;
  path: string;
  // Add other properties as needed
}

import React, { ReactNode } from "react";

// export const AiTextAreaContext = {
//   Provider: ({ value, children }: { value?: any; children: ReactNode }) => <div>{children}</div>,
// };
export const AiTextAreaContext = React.createContext<{
  fileReferences: FileTreeItem[];
  setFileReferences: React.Dispatch<React.SetStateAction<FileTreeItem[]>>;
}>({
  fileReferences: [],
  setFileReferences: () => {},
});

export const useAiTextAreaContext = () => ({
  existingLinkedFiles: [],
  fileReferences: [],
  setFileReferences: () => {},
});