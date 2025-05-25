import { Hotkey } from "@/components/ui/HotKey";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Dropdown, DropdownItem } from "@/components/Dropdown";
import { cn } from "@/utils/index"

// Mock thought data
const mockThought = {
  id: "thought-1",
  title: "Untitled",
  title_suggestion: "About AI and its impact on society",
};

interface ThoughtContext {
  thoughtId: string;
  isAiWriting: boolean;
  title: string;
  setTitle: (title: string) => void;
}

interface AiGenerationContext {
  isGenerating: boolean;
}

interface TitleAreaProps {
  thoughtContext: ThoughtContext;
  aiGenerationContext: AiGenerationContext;
}

export const TitleArea = ({ thoughtContext, aiGenerationContext }: TitleAreaProps) => {
  const { thoughtId, isAiWriting, title, setTitle } = thoughtContext;
  const { isGenerating } = aiGenerationContext;
  const thought = mockThought;

  const [isFocused, setIsFocused] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);

  const handleAcceptTitleSuggestion = () => {
    if (thought?.title_suggestion) {
      setTitle(thought.title_suggestion);
      setLocalTitle(thought.title_suggestion);
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 pb-4 md:pl-8",
        (isGenerating || isAiWriting) && "animate-pulse"
      )}
    >
      <div className={cn("flex-start flex", isGenerating && "opacity-0")}>
        <textarea
          className="no-scrollbar w-full resize-none appearance-none border-none bg-transparent text-2xl font-bold leading-8 outline-none md:text-3xl md:leading-10"
          placeholder={thought?.title_suggestion || "Untitled"}
          value={localTitle || ""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setLocalTitle(e.target.value);
            setTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              handleAcceptTitleSuggestion();
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
        {thought?.title_suggestion && !localTitle && (
          <div className="mt-1.5 flex gap-1">
            <Button size="sm" variant="outline" onClick={handleAcceptTitleSuggestion}>
              {isFocused && <Hotkey keys={["tab"]} />}
              <span>Accept</span>
            </Button>
            <Dropdown
              trigger={
                <Button size="icon-sm" variant="outline">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              }
            >
              <DropdownItem onSelect={() => console.log("Disable title suggestions for thought:", thoughtId)}>
                <XIcon className="size-4" />
                <span>Disable title suggestions for this doc</span>
              </DropdownItem>
            </Dropdown>
          </div>
        )}
      </div>
      {isGenerating && <div className="absolute left-8 top-0 h-10 w-1/2 animate-pulse rounded bg-gray-200 md:w-1/3" />}
    </div>
  );
};