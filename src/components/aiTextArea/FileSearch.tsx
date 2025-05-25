import { ChevronRightIcon, SearchIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { forwardRef, useState, useMemo, useRef } from "react";
import { Button } from "@/components/Button";
import { Hotkey } from "@/components/ui/HotKey";
import { useAiTextAreaContext } from "./AiTextAreaContext";
import { cn } from "@/utils/index";
const mockRepoPaths = [
  {
    path: "src",
    repoFullName: "owner/repo1",
    fileUrl: "https://github.com/owner/repo1/tree/main/src",
    type: "directory",
    fileName: "src",
    children: [
      {
        path: "src/index.js",
        repoFullName: "owner/repo1",
        fileUrl: "https://github.com/owner/repo1/blob/main/src/index.js",
        type: "file",
        fileName: "index.js",
      },
      {
        path: "src/utils.js",
        repoFullName: "owner/repo1",
        fileUrl: "https://github.com/owner/repo1/blob/main/src/utils.js",
        type: "file",
        fileName: "utils.js",
      },
    ],
  },
  {
    path: "README.md",
    repoFullName: "owner/repo1",
    fileUrl: "https://github.com/owner/repo1/blob/main/README.md",
    type: "file",
    fileName: "README.md",
  },
];

const FILE_REFERENCE_LIMIT = 8;



type FileTreeItem = {
  path: string;
  repoFullName: string;
  fileUrl: string;
  type: "file" | "directory";
  fileName: string;
  children?: FileTreeItem[];
};

type FileTreeItemComponentProps = {
  item: FileTreeItem;
  depth?: number;
  expandedDirs: Set<string>;
  onToggle: (path: string) => void;
  onSelect: (file: FileTreeItem) => void;
  selectedFiles: Set<string>;
  onRemove: (file: FileTreeItem) => void;
  keyboardSelectedPath: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

const FileTreeItemComponent = ({
  item,
  depth = 0,
  expandedDirs,
  onToggle,
  onSelect,
  selectedFiles,
  onRemove,
  keyboardSelectedPath,
  scrollRef,
}: FileTreeItemComponentProps) => {
  const paddingLeft = `${depth * 1.25 + 0.25}rem`;
  const isExpanded = expandedDirs.has(item.path);
  const isDirectory = item.type === "directory";
  const isSelected = selectedFiles.has(item.path);

  return (
    <>
      <div
        className={cn(
          "relative flex cursor-pointer flex-row items-center gap-1 rounded px-2 py-0.5 text-sm hover:bg-gray-100",
          item.path === keyboardSelectedPath ? "bg-blue-100" : isSelected ? "bg-gray-50" : "",
        )}
        style={{ paddingLeft }}
        onClick={() => (isDirectory ? onToggle(item.path) : onSelect(item))}
      >
        {depth > 0 && (
          <>
            {[...Array(depth)].map((_, index) => (
              <div
                key={index}
                className="absolute left-0 h-full w-px bg-gray-300"
                style={{ left: `${index * 1.125 + 0.875}rem` }}
              />
            ))}
          </>
        )}
        <div>
          {isDirectory ? (
            <ChevronRightIcon className={`size-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
          ) : (
            <div className="h-4 w-2" />
          )}
        </div>
        <span className="shrink-0">{item.fileName}</span>
        <span className="flex-1 truncate text-xs text-gray-500">{item.path}</span>
        {isSelected && !isDirectory && (
          <Button
            size="icon-xs"
            variant="ghost"
            className="text-gray-600 hover:bg-red-600/20 hover:text-red-600"
            onClick={e => {
              e.stopPropagation();
              onRemove(item);
            }}
          >
            <XIcon className="size-4" />
          </Button>
        )}
      </div>
      {isExpanded && item.children && (
        <div className="relative flex flex-col gap-0.5">
          {item.children.map(child => (
            <FileTreeItemComponent
              key={child.path}
              item={child}
              depth={depth + 1}
              expandedDirs={expandedDirs}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedFiles={selectedFiles}
              onRemove={onRemove}
              keyboardSelectedPath={keyboardSelectedPath}
              scrollRef={scrollRef}
            />
          ))}
        </div>
      )}
    </>
  );
};

const LoadingState = () => {
	return (
		<div className="flex flex-col gap-0.5 px-2">
			{[...Array(3)].map((_, i) => (
				<div key={i} className="flex h-7 animate-pulse items-center gap-2 rounded bg-card/50 px-2">
					<div className="h-4 w-4 rounded bg-card" />
					<div className="h-4 w-24 rounded bg-card" />
				</div>
			))}
		</div>
	);
};

export interface FileSearchRef {
  onKeyDown: (params: { event: React.KeyboardEvent<HTMLDivElement>; hide: () => void }) => boolean;
}

interface FlattenTree {
  (tree: FileTreeItem[], expandedDirs: Set<string>): FileTreeItem[];
}

const flattenTree: FlattenTree = (tree, expandedDirs) => {
  const flattened: FileTreeItem[] = [];
  const traverse = (items: FileTreeItem[]) => {
    items.forEach(item => {
      flattened.push(item);
      if (item.type === "directory" && expandedDirs.has(item.path) && item.children) {
        traverse(item.children);
      }
    });
  };
  traverse(tree);
  return flattened;
};

interface FileSearchProps {
  query: string;
  onSelect?: (file: FileTreeItem) => void;
  shouldMention?: boolean;
}

export const FileSearch = forwardRef<FileSearchRef, FileSearchProps>(
  (
    { query, onSelect, shouldMention }, ref) => {
    const { fileReferences, setFileReferences } = useAiTextAreaContext();
    // Ensure fileReferences is typed as FileTreeItem[]
    const typedFileReferences = fileReferences as FileTreeItem[];
    const [expandedDirs, setExpandedDirs] = useState(new Set(["src"]));
    const [keyboardSelectedPath, setKeyboardSelectedPath] = useState(mockRepoPaths[0].path);
const selectedFiles = new Set(typedFileReferences.map(f => f.path));
const isLoading = false;
const isAtFileLimit = fileReferences.length >= FILE_REFERENCE_LIMIT;

    const filteredFiles: FileTreeItem[] = query
      ? mockRepoPaths.flatMap(item => {
          const results: FileTreeItem[] = [];
          if (item.path.toLowerCase().includes(query.toLowerCase())) results.push(item as FileTreeItem);
          if (item.children) {
            item.children.forEach(child => {
              if (child.path.toLowerCase().includes(query.toLowerCase())) results.push(child as FileTreeItem);
            });
          }
          return results;
        })
      : (mockRepoPaths as FileTreeItem[]);

    interface ToggleDirectory {
      (path: string): void;
    }

    const toggleDirectory: ToggleDirectory = (path) => {
      setExpandedDirs((prev: Set<string>) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
      });
    };

    interface HandleSelectParams {
      type: "file" | "directory";
      path: string;
      repoFullName: string;
      fileUrl: string;
      fileName: string;
      children?: FileTreeItem[];
    }

    // const handleSelect = (file: HandleSelectParams): void => {
    //   if (file.type !== "directory" && !selectedFiles.has(file.path) && !isAtFileLimit) {
    //   setFileReferences([
    //     ...fileReferences,
    //     { ...(file as FileTreeItem), mentioned: shouldMention } as FileTreeItem & { mentioned?: boolean }
    //   ]);
    //   onSelect?.(file);
    //   }
    // };

    // Remove interface HandleRemoveParams and accept the full file object
    // const handleRemove = (file: FileTreeItem): void => {
    //   setFileReferences(fileReferences.filter((f: FileTreeItem) => f.path !== file.path));
    // };

    const flattenedItems = flattenTree(filteredFiles, expandedDirs);

    const handleArrowDown = () => {
      const currentIndex = flattenedItems.findIndex(item => item.path === keyboardSelectedPath);
      const nextIndex = currentIndex + 1;
      if (nextIndex < flattenedItems.length) {
        setKeyboardSelectedPath(flattenedItems[nextIndex].path);
      }
    };

    const handleArrowUp = () => {
      const currentIndex = flattenedItems.findIndex(item => item.path === keyboardSelectedPath);
      const nextIndex = currentIndex - 1;
      if (nextIndex >= 0) {
        setKeyboardSelectedPath(flattenedItems[nextIndex].path);
      }
    };

    const handleArrowRight = () => {
      const selectedItem = flattenedItems.find(item => item.path === keyboardSelectedPath);
      if (selectedItem?.type === "directory") {
        setExpandedDirs(prev => new Set([...Array.from(prev), selectedItem.path]));
      }
    };

    const handleArrowLeft = () => {
      const selectedItem = flattenedItems.find(item => item.path === keyboardSelectedPath);
      if (selectedItem?.type === "directory" && expandedDirs.has(selectedItem.path)) {
        setExpandedDirs(prev => {
          const next = new Set(prev);
          next.delete(selectedItem.path);
          return next;
        });
      }
    };

    const handleEnter = () => {
      const selectedItem = flattenedItems.find(item => item.path === keyboardSelectedPath);
      if (!selectedItem) return;
      if (selectedItem.type === "directory") {
        toggleDirectory(selectedItem.path);
      } else {
        if (selectedFiles.has(selectedItem.path)) {
          () => {};
        } else {
          () => {};
        }
      }
    };

    // Add this ref for the scroll container
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    return (
      <>
        <div
          ref={scrollContainerRef}
          className="no-scrollbar pointer-events-auto flex max-h-[40vh] min-h-36 w-[28rem] flex-col gap-0.5 overflow-y-auto overscroll-contain px-2 py-2">
					{isLoading ? (
						<LoadingState />
					) : filteredFiles.length > 0 ? (
						filteredFiles.map(file => (
							<FileTreeItemComponent
								key={file.path}
								item={file}
								expandedDirs={expandedDirs}
								onToggle={toggleDirectory}
								onSelect={() => {}}
								selectedFiles={selectedFiles}
								onRemove={() => {}}
								keyboardSelectedPath={keyboardSelectedPath}
								scrollRef={scrollContainerRef}
							/>
						))
					) : query ? (
						<div className="flex flex-col items-center justify-center gap-2 py-8">
							<SearchIcon className="size-5 text-tertiary" />
							<div className="text-sm text-tertiary">
								No results found for <span className="text-primary">"{query}"</span>
							</div>
						</div>
					) : null}
				</div>
				<div className="flex w-full flex-col gap-2 border-t border-border px-3 py-2">
					{isAtFileLimit && (
						<div className="flex w-full items-center gap-1">
							<TriangleAlertIcon className="size-4 text-red-600" />
							<span className="text-xs text-red-600">Maximum of 8 files reached</span>
						</div>
					)}
					<div className="flex w-full items-center gap-3">
						<div className="text-xs text-tertiary">Type to search</div>
						<div className="flex items-center gap-1">
							<Hotkey keys={["up", "down"]} />
							<span className="text-xs text-tertiary">Move selection</span>
						</div>
						<div className="flex items-center gap-1">
							<Hotkey keys={["Enter"]} />
							<span className="text-xs text-tertiary">Select file/Open folder</span>
						</div>
					</div>
				</div>
			</>
    );
  },
);