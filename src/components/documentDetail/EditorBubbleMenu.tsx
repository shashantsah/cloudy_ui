import { Hotkey } from "@/components/ui/HotKey";
import { BubbleMenu } from "@tiptap/react";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  Link2OffIcon,
  ListIcon,
  ListOrderedIcon,
  SparklesIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  UnderlineIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/Button";
import { useBreakpoint } from "@/utils/tailwind";

interface EditorBubbleMenuProps {
  thoughtContext: {
    editor: any;
    showAiSelectionMenu: () => void;
    isShowingAiSelectionMenu: boolean;
    hideAiSelectionMenu: () => void;
  };
}

export const EditorBubbleMenu = ({ thoughtContext }: EditorBubbleMenuProps) => {
  const editor = thoughtContext.editor;
  const isMdBreakpoint = useBreakpoint("md");
  const bubbleMenuRef = useRef<HTMLDivElement>(null);

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu 
      editor={editor} 
      tippyOptions={{ 
        duration: 100, 
        maxWidth: "1024px",
        appendTo: () => document.body
      }}
    >
      <div
        ref={bubbleMenuRef}
        className="flex max-w-[100vw] flex-row flex-wrap items-center gap-0.5 rounded-md border border-border bg-background px-2 py-2 shadow-lg"
      >
        <div className="pr-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="text-accent"
            onClick={() => {
              if (thoughtContext.isShowingAiSelectionMenu) {
                thoughtContext.hideAiSelectionMenu();
              } else {
                thoughtContext.showAiSelectionMenu();
              }
            }}
          >
            {isMdBreakpoint && <Hotkey keys={["Command", "K"]} />}
            <span>Ask Cloudy</span>
            <SparklesIcon className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-accent/20 text-accent" : ""}
          variant="ghost"
          size="icon-sm"
        >
          <BoldIcon className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant="ghost"
          size="icon-sm"
          className={editor.isActive("italic") ? "bg-accent/20 text-accent" : ""}
        >
          <ItalicIcon className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant="ghost"
          size="icon-sm"
          className={editor.isActive("underline") ? "bg-accent/20 text-accent" : ""}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant="ghost"
          size="icon-sm"
          className={editor.isActive("strike") ? "bg-accent/20 text-accent" : ""}
        >
          <StrikethroughIcon className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          variant="ghost"
          size="icon-sm"
          className={editor.isActive("code") ? "bg-accent/20 text-accent" : ""}
        >
          <CodeIcon className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant="ghost"
          size="icon-sm"
          className={editor.isActive("bulletList") ? "bg-accent/20 text-accent" : ""}
        >
          <ListIcon className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant="ghost"
          size="icon-sm"
          className={editor.isActive("orderedList") ? "bg-accent/20 text-accent" : ""}
        >
          <ListOrderedIcon className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant="ghost"
          size="icon-sm"
          className={editor.isActive("blockquote") ? "bg-accent/20 text-accent" : ""}
        >
          <TextQuoteIcon className="h-4 w-4" />
        </Button>
        
        {editor.isActive("link") && (
          <Button 
            onClick={() => editor.chain().focus().unsetLink().run()} 
            variant="ghost" 
            size="icon-sm"
          >
            <Link2OffIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </BubbleMenu>
  );
};