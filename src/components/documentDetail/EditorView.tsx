"use client";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useState, useRef, useCallback, createContext, useContext, useEffect } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import { cn } from "@/utils/index";
import { EditorBubbleMenu } from "./EditorBubbleMenu";
import { EditorDraftingCard } from "./EditorDraftingCard";
import { FooterRow } from "./FooterRow";
import { TitleArea } from "./TitleArea";
import { DocumentLoadingPlaceholder } from "@/components/DocumentLoadingPlaceholder";
import { EditorErrorBoundary } from "./EditorErrorBoundary";
import { EditorContent, Extension, JSONContent, useEditor } from "@tiptap/react";
import { GripVertical, X } from "lucide-react";
import { tiptapExtensions } from "./tiptap";
import { createFileHandlerExtension } from "./fileHandlerExtension";
// import { ChatSectionView } from "./ChatSectionView";
import Suggestion from "./suggestion/Suggestion";
import { fetchInitialSuggestion, pollWebSuggestion, pollWritingSuggestion } from "./suggestion/hooks/useSuggestions";
import { TbTopologyStar3 } from "react-icons/tb";
import { IoGlobeOutline } from "react-icons/io5";
import SuggestionFixed from "./suggestion/SuggestionFixed";
import { GhostSuggestion } from "./GhostSuggestion";

const documentId = "123";
const isEditMode = true;
const ydoc = new Y.Doc();
const provider = new WebrtcProvider("example-room", ydoc);
const userRecord = { name: "User", email: "Y6A9o@example.com" };


const mockThought = {
  id: "thought-1",
  title: "Untitled",
  content_json: {
    type: "doc",
    content: [{ type: "paragraph", content: [{ type: "text", text: "Sample text for selection" }] }],
  },
};

export const ThoughtContext = createContext<any>({});
const AiGenerationContext = createContext<any>({});

interface Suggestion {
  id: number;
  icon: string;
  title: string;
  description: string;
  timeDiff: string;
}



const SuggestionsPanel = ({ 
  isOpen, 
  onClose, 
  suggestions 
}: {
  isOpen: boolean;
  onClose: () => void;
  suggestions: Suggestion[];
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth - 400 : 0, 
    y: 100 
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if clicking on the header
    const target = e.target as HTMLElement;
    if (target.closest('.drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      e.preventDefault(); // Prevent text selection while dragging
    }
  };

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Boundary checks to keep panel within viewport
      const boundedX = Math.max(0, Math.min(newX, window.innerWidth - (panelRef.current?.offsetWidth || 0)));
      const boundedY = Math.max(0, Math.min(newY, window.innerHeight - (panelRef.current?.offsetHeight || 0)));
      
      setPosition({
        x: boundedX,
        y: boundedY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={cn(
        "fixed w-96 max-w-[90vw] h-[60vh] max-h-[80vh]",
        "bg-background border rounded-lg shadow-xl overflow-hidden",
        "transition-transform duration-200", // Smoother transform
        "z-50 select-none", // Disable text selection
        isDragging ? "cursor-grabbing shadow-2xl" : "cursor-default"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      {/* Header with drag handle */}
      <div 
        className="drag-handle flex items-center justify-between p-4 border-b bg-accent/10 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-lg text-secondary font-semibold">Tochan's Suggestions</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-accent/20 transition-colors"
          aria-label="Close suggestions"
        >
          <X className="h-5 w-5 text-primary" />
        </button>
      </div>

      {/* Content with scroll */}
      <div className="h-[calc(100%-56px)] overflow-y-auto p-4">
        <Suggestion suggestions={suggestions} />
      </div>
    </div>
  );
};

export const EditorView = () => {
    const [title, setTitle] = useState(mockThought.title);
  const [isAiWriting, setIsAiWriting] = useState(false);
  const [isEditingDisabled, setIsEditingDisabled] = useState(false);
  const [previewingKey, setPreviewingKey] = useState<string | null>(null);
  const [isShowingAiEditorMenu, setShowAiEditorMenu] = useState(false);
  const [isShowingAiSelectionMenu, setIsShowingAiSelectionMenu] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);


  const disableUpdatesRef = useRef(false);
  const storedContentRef = useRef<JSONContent | null>(null);
  const contentAfterApplyRef = useRef<JSONContent | null>(null);

  const editor = useEditor({
      editorProps: {
        attributes: { class: "main-editor doc-editor" },
      },
      immediatelyRender: false,
      extensions: [
        ...tiptapExtensions,
        createFileHandlerExtension(documentId),
       GhostSuggestion.configure({
        onAccept: () => {
         
          setSuggestions((s) => s.filter((x) => x.id !== 3));
         
        },
      }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: userRecord.name ?? userRecord.email,
            color: "#b694ff",
          },
        }),
        Extension.create({
          name: "hotkeys",
          addKeyboardShortcuts() {
            return {
              "Mod-o": () => {
                showAiEditor();
                return true;
              },
              "Mod-k": () => {
                showAiSelectionMenu();
                return true;
              },
              Escape: () => {
                hideAiEditor();
                return true;
              },
            };
          },
        }),
      ],
      content: "",
      onUpdate: ({ transaction }) => {
        if (transaction.getMeta("y-sync$")) {
          // Ignore y-sync updates
          return;
        }
        onUpdate();
      },
      autofocus: !documentId,
      editable: isEditMode && !isEditingDisabled,
    });
  







  const onUpdate = useCallback(() => {
    // Simulate update without backend call
    console.log("Document updated");
  }, []);

  const storeContentIfNeeded = useCallback(() => {
    if (!storedContentRef.current) {
      storedContentRef.current = editor?.getJSON() ?? null;
    }
  }, [editor]);

  const storeContentAsApplyContent = useCallback(() => {
    contentAfterApplyRef.current = editor?.getJSON() ?? null;
  }, [editor]);

  const restoreFromLastContent = useCallback(() => {
    if (storedContentRef.current) {
      editor?.commands.setContent(storedContentRef.current);
      storedContentRef.current = null;
      contentAfterApplyRef.current = null;
    }
  }, [editor]);

  const clearStoredContent = useCallback(() => {
    storedContentRef.current = null;
  }, []);

  const clearApplyContent = useCallback(() => {
    contentAfterApplyRef.current = null;
  }, []);

  const convertSelectionToEditMark = useCallback(() => {
    if (!editor) return;
    editor.chain().setMark("editHighlight").run();
  }, [editor]);

  const showAiSelectionMenu = useCallback(() => {
    if (!editor) return;
    disableUpdatesRef.current = true;
    if (editor.view.state.selection.content().size > 0) {
      convertSelectionToEditMark();
      setIsShowingAiSelectionMenu(true);
    }
  }, [editor, convertSelectionToEditMark]);

  const showAiEditor = useCallback(() => {
    if (!editor) return;
    disableUpdatesRef.current = true;
    setShowAiEditorMenu(true);
  }, [editor]);

  const onStartAiEdits = useCallback(() => {
    setIsAiWriting(true);
    setIsEditingDisabled(true);
  }, []);

  const onFinishAiEdits = useCallback(() => {
    setIsAiWriting(false);
  }, []);

  const applySuggestedChanges = useCallback(() => {
    if (!editor) return;
    editor.commands.setContent(contentAfterApplyRef.current ?? "");
    setPreviewingKey(null);
    setIsEditingDisabled(false);
    clearApplyContent();
    clearStoredContent();
    onFinishAiEdits();
    disableUpdatesRef.current = false;
    onUpdate();
  }, [editor, clearStoredContent, clearApplyContent, onFinishAiEdits, onUpdate]);

  const hideAiEditor = useCallback(() => {
    if (!editor) return;
    setShowAiEditorMenu(false);
    restoreFromLastContent();
    clearApplyContent();
    clearStoredContent();
    onFinishAiEdits();
    disableUpdatesRef.current = false;
  }, [editor, restoreFromLastContent, clearStoredContent, clearApplyContent, onFinishAiEdits]);

  const hideAiSelectionMenu = useCallback(() => {
    if (!editor) return;
    setIsShowingAiSelectionMenu(false);
    restoreFromLastContent();
    clearApplyContent();
    clearStoredContent();
    onFinishAiEdits();
    disableUpdatesRef.current = false;
  }, [editor, restoreFromLastContent, clearStoredContent, clearApplyContent, onFinishAiEdits]);

  const handleSetTitle = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  useEffect(() => {
    // Simulate connection
    const timer = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <EditorErrorBoundary>
      <ThoughtContext.Provider
        value={{
          thoughtId: mockThought.id,
          isConnecting,
          editor,
          disableUpdatesRef,
          onUpdate,
          isConnected,
          isEditingDisabled,
          setIsEditingDisabled,
          previewingKey,
          setPreviewingKey,
          storeContentIfNeeded,
          storeContentAsApplyContent,
          restoreFromLastContent,
          clearStoredContent,
          clearApplyContent,
          setShowAiEditorMenu,
          isShowingAiEditorMenu,
          showAiEditor,
          hideAiEditor,
          applySuggestedChanges,
          isAiWriting,
          setIsAiWriting,
          onStartAiEdits,
          onFinishAiEdits,
          threadId,
          setThreadId,
          convertSelectionToEditMark,
          isShowingAiSelectionMenu,
          hideAiSelectionMenu,
          showAiSelectionMenu,
          title,
          setTitle: handleSetTitle,
        }}
      >
        <div className="relative flex h-full flex-row">
          <div className={cn(
            "relative hidden w-[33vw] shrink-0 bg-background transition-[width] duration-300 ease-in-out md:block",
            !isShowingAiEditorMenu && "w-0"
          )}>
            {/* {isShowingAiEditorMenu && <ChatSectionView/>} */}
          </div>
          <div className="no-scrollbar relative flex w-full flex-grow flex-col lg:flex-row">
            <AiGenerationContext.Provider value={{ isGenerating: false }}>
              {/* <Editor /> */}
              <Editor
  suggestions={suggestions}
  setSuggestions={setSuggestions}
/>

            </AiGenerationContext.Provider>
          </div>
        </div>
      </ThoughtContext.Provider>
    </EditorErrorBoundary>
  );
};

interface EditorProps {
  suggestions: Suggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>;
}

const Editor = ({ suggestions, setSuggestions }: EditorProps) => {
  const { editor, isConnected, isConnecting, isAiWriting } = useContext(ThoughtContext);
  const [isGenerating, setIsGenerating] = useState(false);
  // const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const debounceTimer = useRef<number | null>(null);
  const [webSuggestion, setWebSuggestion] = useState<string | null>(null);

   const [hoverData, setHoverData] = useState({
    show: false,
    x: 0,
    y: 0,
    text: "",
  });


  const mouseLeaveHandlerRef = useRef<(() => void) | null>(null);

  const bindHoverEvents = () => {
    if (!editor) return;

    const container = editor.view.dom;
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Check if the element or any of its ancestors has underline style
      let current: HTMLElement | null = target;
      while (current) {
        const style = window.getComputedStyle(current);
        if (style.textDecorationLine.includes("underline")) {
          const rect = current.getBoundingClientRect();
          const text = current.textContent || "";
          
          // Store the element reference for cleanup
          const element = current;
          
          // Remove any existing mouseleave handlers
          if (mouseLeaveHandlerRef.current) {
            element.removeEventListener("mouseleave", mouseLeaveHandlerRef.current);
          }
          
          // Create new mouseleave handler
          const mouseLeaveHandler = () => {
            setHoverData({
              show: false,
              x: 0,
              y: 0,
              text: "",
            });
            element.removeEventListener("mouseleave", mouseLeaveHandler);
          };
          
          // Store reference to the handler
          mouseLeaveHandlerRef.current = mouseLeaveHandler;
          
          element.addEventListener("mouseleave", mouseLeaveHandler);

          // Set hover data
          setHoverData({
            show: true,
            x: rect.left,
            y: rect.top + rect.height,
            text: text,
          });
          return;
        }
        current = current.parentElement;
      }
    };

    // Add mouseover event listener
    container.addEventListener("mouseover", handleMouseOver);

    return () => {
      // Cleanup event listeners
      container.removeEventListener("mouseover", handleMouseOver);
      
      // Remove any existing mouseleave handlers
      if (mouseLeaveHandlerRef.current) {
        container.removeEventListener("mouseleave", mouseLeaveHandlerRef.current);
      }
    };
  };

  useEffect(() => {
    if (!editor) return;
    bindHoverEvents();
  }, [editor]);

  const MAX_RETRIES = 20;
const DELAY_MS = 2000;

const pollUntilReady = async (
  fn: (text: string) => Promise<{ status: string; [key: string]: any } | null>,
  text: string,
  label: string
) => {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const res = await fn(text);
    if (!res) {
      console.log(`${label} poll #${attempt + 1}:`, "null response");
      continue;
    }
    console.log(`${label} poll #${attempt + 1}:`, res.status);

    if (res.status === "ready") {
      return res;
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  console.warn(`${label} polling timed out`);
  return null;
};
const idRef = useRef(1);
 const triggerSuggestions = useCallback(async (text: string) => {
  if (!isGenerating) {
    setIsGenerating(true);
    // setSuggestions([]); 

    try {
      const result = await fetchInitialSuggestion(text);
      
      if (result.trigger && result.basic_suggestion) {
        setSuggestions(prev => [
          { id: idRef.current++, icon: "GoPencil", title: "Suggestion", description: result.basic_suggestion, timeDiff: "Just now" }
        ]);
         setIsGenerating(true);
         console.log("Initial suggestion fetched:", result.basic_suggestion);
      }

    if (result.trigger){
 const [web, writing] = await Promise.all([
      pollUntilReady(pollWebSuggestion, result.request_id, "Web"),
      pollUntilReady(pollWritingSuggestion, result.request_id, "Writing"),
    ]);
      if (web && web.web_suggestion) {
        console.log("Web suggestion:", web);
        setSuggestions(prev => [
          ...prev,
          { id: idRef.current++, icon: "IoMdCloudOutline", title: "Web Insight", description: web.web_suggestion, timeDiff: "Now" }
        ]);
         setWebSuggestion(web.web_suggestion); 
      }

      if (writing && writing.writing_suggestion) {
        setSuggestions(prev => [
          ...prev,
          { id: idRef.current++, icon: "GoPencil", title: "Writing Suggestion", description: writing.writing_suggestion, timeDiff: "Now" }
        ]);
        editor?.commands.setGhostSuggestion(writing.writing_suggestion);
      }
    }
    } catch (error) {
      setSuggestions([
        { id: idRef.current++, icon: "GoAlert", title: "Error", description: "Failed to fetch suggestions", timeDiff: "Now" }
      ]);
    } finally {
      setIsGenerating(false);
    }
  }
},[isGenerating, editor]);

  useEffect(() => {
    if (!editor) return;
    const onUpdate = () => {
      const text = editor.getText().trim();
      const wordCount = text.split(/\s+/).length;
      if (wordCount > 4) {
        // reset debounce
        if (debounceTimer.current !== null) {
          
            window.clearTimeout(debounceTimer.current);
        
        }
        debounceTimer.current = window.setTimeout(() => {
          triggerSuggestions(text);
        }, 1200);
      } else {
        // if they delete back to ≤4 words, cancel any pending fetch
        if (debounceTimer.current !== null) {
          
            window.clearTimeout(debounceTimer.current);
        
        }
      }
    };

    editor.on("update", onUpdate);
    return () => {
      editor.off("update", onUpdate);
      if (debounceTimer.current !== null) {
          
            window.clearTimeout(debounceTimer.current);
        
        }
    };
  }, [editor, triggerSuggestions]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isGenerating) {
        setIsGenerating(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGenerating]);

  return (
    <div className="relative h-full w-full">
      {/* Main Editor Area */}
      <div className={cn(
        "h-full transition-all duration-300",
        false ? "pr-0 sm:pr-96" : "pr-0"
      )}>
        <div className="no-scrollbar h-full overflow-y-auto">
          <nav className="sticky top-[-1px] z-30 -mr-2 w-full bg-background px-6 py-2 md:top-0 md:py-3">
            {/* <div className="flex justify-between">
              <div>Simulated NavBar</div>
              <button onClick={() => useContext(ThoughtContext).showAiEditor()}>
                Open AI Editor
              </button>
            </div> */}
          </nav>
          <div className="box-border flex w-full max-w-screen-lg grow flex-col px-6 md:pl-12 md:pr-20 md:pt-16 lg:flex-1">
            {isConnecting ? (
              <div className="w-full pl-8">
                <DocumentLoadingPlaceholder />
              </div>
            ) : (
              <>
                <div className="mb-8 md:pl-8">
                  {/* <EditorDraftingCard /> */}
                </div>
                <TitleArea
                  thoughtContext={useContext(ThoughtContext)}
                  aiGenerationContext={useContext(AiGenerationContext)}
                />
                <div className="relative flex flex-row md:pl-[2px]">
                  {editor && (
                    <EditorBubbleMenu thoughtContext={useContext(ThoughtContext)} />
                  )}
                  {editor && (
                    <div>
                      <DragHandle editor={editor} tippyOptions={{ offset: [-4, 4], zIndex: 10 }}>
                        <div className="hidden cursor-grab flex-row items-center rounded border border-transparent px-0.5 py-1 hover:border-border hover:bg-card active:cursor-grabbing active:bg-accent/20 md:flex">
                          <GripVertical className="h-5 w-5 text-tertiary" />
                        </div>
                      </DragHandle>
                    </div>
                  )}
                  <EditorContent
                    editor={editor}
                    className={cn(
                      "w-full",
                      (isAiWriting || !isConnected) && "pointer-events-none opacity-70"
                    )}
                    // onKeyDown={handleEnterPress}
                  />
                </div>
                <div className="h-[75dvh]" />
              </>
            )}
        <SuggestionFixed suggestions={suggestions} />
          </div>
          <FooterRow thoughtContext={useContext(ThoughtContext)} />
        </div>
      </div>

      {/* Suggestions Panel */}
      {/* <SuggestionsPanel
        isOpen={isGenerating}
        onClose={() => setIsGenerating(false)}
        suggestions={suggestions}
      /> */}

       {hoverData.show && (
        <div
          className="absolute bg-background border w-[300px] border-gray-200 shadow-lg rounded-md  p-3 z-50  transition-opacity duration-200"
          style={{
            left: hoverData.x - 230,
            top: hoverData.y,
            opacity: hoverData.show ? 1 : 0,
            pointerEvents: hoverData.show ? "auto" : "none",
          }}
          
        >
          <div className="flex items-center border-b pb-1">
            <div className="text-secondary text-sm font-medium mt-1 ">
              Suggestion
            </div>
          </div>
          <div className="mt-2">
            <div className="flex">
              <div className="mt-3 text-secondary text-2xl">
                <IoGlobeOutline />
              </div>
              <div className="max-h-[150px] overflow-y-auto text-sm m-2 leading-relaxed">
                 {renderDescription(webSuggestion ?? "")}
              </div>  
            </div>
            <div className="flex justify-between m-1 ml-4">
              <div className="flex items-center">
                <button
                  className="text-[#9086c1] flex items-center bg-[#dfdae2] rounded-md p-1 m-1 hover:bg-[#e1e1e1] transition-colors duration-200"
                  onClick={() => console.log("Show me clicked")}
                >
                  <TbTopologyStar3 />
                  <span className="text-xs font-bold mx-1 p-1">Chat</span>
                </button>
                <button
                  className="text-[#5e5e5e] flex items-center bg-[#e1dfdf] rounded-md p-1 m-1 hover:bg-[#e1e1e1] transition-colors duration-200"
                  onClick={() => console.log("Reply clicked")}
                >
                  <span className="text-xs font-bold mx-1 p-1">Dismiss</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



const renderDescription = (text: string) => {
    // Regex for markdown links [text](url) and plain URLs
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(\bhttps?:\/\/[^\s]+)/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;

    text.replace(linkRegex, (match, linkText, linkUrl, plainUrl, index) => {
      // Add text before the match
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index));
      }

      // Add the link
      if (linkText && linkUrl) {
        // Markdown link [text](url)
        parts.push(<br></br>);
        parts.push(
          <a
            key={index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {linkText}
          </a>
        );
      } else if (plainUrl) {
        // Plain URL
        parts.push(
          <a
            key={index}
            href={plainUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {plainUrl}
          </a>
        );
      }

      lastIndex = index + match.length;
      return match;
    });

    // Add remaining text after the last match
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };