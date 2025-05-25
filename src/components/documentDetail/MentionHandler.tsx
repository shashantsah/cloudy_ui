import * as React from "react";
import type { JSX } from "react";
import { Hotkey } from "@/components/ui/HotKey";
import { useQuery } from "@tanstack/react-query";
import { SuggestionProps } from "@tiptap/suggestion";
import { ArrowRightIcon, NotebookTextIcon, PlusIcon } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/utils/index";
import { makeHumanizedTime } from "@/utils/strings";
import { makeThoughtLabel } from "@/utils/thought";

const mockThoughts = [
  {
    id: "thought-1",
    title: "Sample Note 1",
    content_md: "This is sample content for note 1",
    content_plaintext: "This is sample content for note 1",
    updated_at: new Date().toISOString(),
  },
  {
    id: "thought-2",
    title: "Sample Note 2",
    content_md: "This is sample content for note 2",
    content_plaintext: "This is sample content for note 2",
    updated_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: "thought-3",
    title: null,
    content_md: "This is a note without a title",
    content_plaintext: "This is a note without a title",
    updated_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

const useSearchThoughts = (query: string) => {
  return useQuery({
    enabled: !!query && query.length > 2,
    queryKey: ["thoughts", query],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter mock data based on query
      return mockThoughts.filter(thought => 
        (thought.title?.toLowerCase().includes(query.toLowerCase()) ||
        thought.content_plaintext?.toLowerCase().includes(query.toLowerCase()))
      );
    },
    staleTime: 1000,
  });
};

const useLatestThoughts = () => {
  return useQuery({
    queryKey: ["latest_thoughts"],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockThoughts;
    },
  });
};

const menuOptions = ["latest_notes", "new_note"];

export const MentionHandler = forwardRef(({ query, command }: SuggestionProps, ref: React.Ref<any>) => {
  const { data, isLoading: isLoadingThoughtSearch } = useSearchThoughts(query);
  const { data: latestThoughts, isLoading: isLoadingLatestThoughts } = useLatestThoughts();
  
  const [currentView, setCurrentView] = useState<"latest_notes" | "default" | "search">("default");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayingData = (currentView === "search" ? data : latestThoughts) ?? [];

  const upHandler = () => {
    if (currentView === "default") {
      setSelectedIndex((selectedIndex + menuOptions.length - 1) % menuOptions.length);
      return;
    }
    if (displayingData.length === 0) return;
    setSelectedIndex((selectedIndex + displayingData.length - 1) % displayingData.length);
  };

  const downHandler = () => {
    if (currentView === "default") {
      setSelectedIndex((selectedIndex + 1) % menuOptions.length);
      return;
    }
    if (displayingData.length === 0) return;
    setSelectedIndex((selectedIndex + 1) % displayingData.length);
  };

  const apply = (index: number) => {
    const selectedThought = displayingData[index];
    command({
      id: selectedThought.id,
      label: makeThoughtLabel(selectedThought),
    });
  };

  const enterHandler = () => {
    if (currentView === "default") {
      if (selectedIndex === 0) {
        setCurrentView("latest_notes");
      } else if (selectedIndex === 1) {
        // Mock creating a new document
        const newDocument = {
          id: `thought-${Date.now()}`,
          title: "Untitled",
          updated_at: new Date().toISOString()
        };
        command({
          id: newDocument.id,
          label: "Untitled",
        });
      }
    } else if (currentView === "search" || currentView === "latest_notes") {
      apply(selectedIndex);
    }
  };

  // ... rest of the component remains exactly the same ...
  // (including the useEffect hooks, useImperativeHandle, and the render method)

  // Define the title based on the current view
  let title = "";
  if (currentView === "default") {
    title = "Select an option";
  } else if (currentView === "latest_notes") {
    title = "Latest Notes";
  } else if (currentView === "search") {
    title = "Search Results";
  }

  // Map currentView to the appropriate JSX
  const viewMap: Record<string, JSX.Element> = {
    default: (
      <div>
        <div
          className={cn(
            "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1 hover:bg-card",
            selectedIndex === 0 ? "bg-accent/10" : "",
          )}
          onClick={() => setCurrentView("latest_notes")}
        >
          <ArrowRightIcon className="size-4 flex-shrink-0 text-secondary" />
          <span className="flex-1 truncate text-sm font-medium">Latest Notes</span>
          <Hotkey keys={["enter"]} />
        </div>
        <div
          className={cn(
            "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1 hover:bg-card",
            selectedIndex === 1 ? "bg-accent/10" : "",
          )}
          onClick={() => {
            // Mock creating a new document
            const newDocument = {
              id: `thought-${Date.now()}`,
              title: "Untitled",
              updated_at: new Date().toISOString()
            };
            command({
              id: newDocument.id,
              label: "Untitled",
            });
          }}
        >
          <PlusIcon className="size-4 flex-shrink-0 text-secondary" />
          <span className="flex-1 truncate text-sm font-medium">Create New Note</span>
          <Hotkey keys={["enter"]} />
        </div>
      </div>
    ),
    latest_notes: (
      <ResultsView
        displayingData={latestThoughts ?? []}
        selectedIndex={selectedIndex}
        apply={apply}
        isLoading={isLoadingLatestThoughts}
      />
    ),
    search: (
      <ResultsView
        displayingData={data ?? []}
        selectedIndex={selectedIndex}
        apply={apply}
        isLoading={isLoadingThoughtSearch}
      />
    ),
  };

  return (
    <div className="w-full rounded-md border border-border bg-background p-2 shadow-md md:w-[28rem]">
      <div className="mb-2 ml-1 text-sm text-secondary">{title}</div>
      {viewMap[currentView]}
    </div>
  );
});

// ResultsView component remains exactly the same
const ResultsView = ({
  displayingData,
  selectedIndex,
  apply,
  isLoading,
}: {
  displayingData: typeof mockThoughts;
  selectedIndex: number;
  apply: (index: number) => void;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner size="xs" />
      </div>
    );
  }

  if (displayingData.length === 0) {
    return <div className="p-2 text-center text-sm text-secondary">No results found.</div>;
  }

  return (
    <>
      {displayingData.map((thought, index) => (
        <div
          key={thought.id}
          className={cn(
            "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1 hover:bg-card",
            selectedIndex === index ? "bg-accent/10" : "",
          )}
          onClick={() => apply(index)}>
          <NotebookTextIcon className="size-4 flex-shrink-0 text-secondary" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-xs text-secondary">{makeHumanizedTime(thought.updated_at)}</span>
            <span className={cn("truncate text-sm", thought.title ? "font-medium" : "text-primary/80")}>
              {thought.title || thought.content_plaintext || thought.content_md}
            </span>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1 text-xs text-secondary">
            <Hotkey keys={["enter"]} />
            <span>Link</span>
          </div>
        </div>
      ))}
    </>
  );
};