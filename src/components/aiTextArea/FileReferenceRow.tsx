import { PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { FileReferencePill } from "./FileReferencePill";
import { FileSearch } from "./FileSearch";
import { useAiTextAreaContext } from "./AiTextAreaContext";

const mockConnectFileToDocument = {
  mutate: (file:any) => console.log("Connect file:", file.path),
};
const mockDisconnectFileFromDocument = {
  mutate: (file:any) => console.log("Disconnect file:", file.path),
};
const FILE_REFERENCE_LIMIT = 8;

interface FileReferenceRowProps {
  disableAdd?: boolean;
  addButtonText?: string;
  showConnectTooltip?: boolean;
  showUnlinkIconInsteadOfX?: boolean;
}

export const FileReferenceRow = ({
  disableAdd,
  addButtonText = "Link files",
  showConnectTooltip = false,
  showUnlinkIconInsteadOfX,
}: FileReferenceRowProps) => {
  const { fileReferences, setFileReferences, existingLinkedFiles } = useAiTextAreaContext();

  type FileReference = {
    path: string;
    repoFullName?: string;
    fileUrl?: string;
    // add other properties if needed
  };

  const typedFileReferences = fileReferences as FileReference[];
  const typedExistingLinkedFiles = existingLinkedFiles as FileReference[];

  const isAtFileLimit = typedFileReferences.length >= FILE_REFERENCE_LIMIT;

  // const handleConnectFile = (file:any) => {
  //   mockConnectFileToDocument.mutate(file);
  //   setFileReferences(fileReferences.filter(f => f.path !== file.path));
  // };

  const handleDisconnectFile = (file:any) => {
    mockDisconnectFileFromDocument.mutate(file);
  };

  const totalItemCount = existingLinkedFiles.length + fileReferences.length;

  // Add handleConnectFile implementation
  const handleConnectFile = (file: FileReference) => {
    mockConnectFileToDocument.mutate(file);
    setFileReferences((prev: FileReference[]) => prev.filter(f => f.path !== file.path));
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-1 pt-1 border-2 border-red-200">
      {/* Dropdown for adding files */}
      {!disableAdd && (
        <Dropdown
          align="start"
          trigger={
            <Button
              variant="ghost"
              size="icon-xs"
              disabled={isAtFileLimit}
              className="flex items-center gap-1"
            >
              <PlusIcon className="size-4" />
              <span>{addButtonText}</span>
            </Button>
          }
        >
          <FileReferenceDropdownContent />
        </Dropdown>
      )}
      {/* Wrap mapped pills in a fragment */}
      <>
        {typedExistingLinkedFiles?.map(file => (
          <FileReferencePill
            key={file.path}
            path={file.path}
            repoFullName={file.repoFullName ?? ""}
            fileUrl={file.fileUrl ?? ""}
            isExisting
            showConnectTooltip={showConnectTooltip}
            showUnlinkIconInsteadOfX={showUnlinkIconInsteadOfX}
            onDisconnect={() => handleDisconnectFile({ path: file.path })}
          />
        ))}
        {typedFileReferences?.map(file => (
          <FileReferencePill
            key={file.path}
            path={file.path}
            repoFullName={file.repoFullName ?? ""}
            fileUrl={file.fileUrl ?? ""}
            onRemove={() => setFileReferences((prev: FileReference[]) => prev.filter(f => f.path !== file.path))}
            showConnectTooltip={showConnectTooltip}
            showUnlinkIconInsteadOfX={showUnlinkIconInsteadOfX}
            onConnect={() => handleConnectFile(file)}
          />
        ))}
      </>
      {isAtFileLimit && <span className="text-xs text-red-600">Maximum of 8 files reached</span>}
    </div>
  );
};

const FileReferenceDropdownContent = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="w-[32rem] border-2 border-red-200">
      <div className="border-b border-gray-300 bg-gray-50 px-1 py-1">
        <Input
          placeholder="Search files"
          className="border-none bg-transparent"
          prefix={<SearchIcon className="mr-2 size-4" />}
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>
      <FileSearch query={query} />
    </div>
  );
};