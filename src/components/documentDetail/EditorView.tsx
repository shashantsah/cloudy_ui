// // "use client";
// // import { useState, useRef, useCallback, createContext, useContext, useEffect } from "react";
// // import DragHandle from "@tiptap-pro/extension-drag-handle-react";
// // import { cn } from "@/utils/index";
// // import { EditorBubbleMenu } from "./EditorBubbleMenu";
// // import { EditorDraftingCard } from "./EditorDraftingCard";
// // import { FooterRow } from "./FooterRow";
// // import { TitleArea } from "./TitleArea";
// // import { DocumentLoadingPlaceholder } from "@/components/DocumentLoadingPlaceholder";
// // import { EditorErrorBoundary } from "./EditorErrorBoundary";
// // import { EditorContent, useEditor } from "@tiptap/react";
// // import { StarterKit } from "@tiptap/starter-kit";
// // import { JSONContent } from "@tiptap/react";
// // import { GripVertical } from "lucide-react";

// // // Mock data
// // const mockThought = {
// //   id: "thought-1",
// //   title: "Untitled",
// //   content_json: {
// //     type: "doc",
// //     content: [{ type: "paragraph", content: [{ type: "text", text: "Sample text for selection" }] }],
// //   },
// // };

// // // Context
// // const ThoughtContext = createContext<any>({});
// // const AiGenerationContext = createContext<any>({});

// // export const EditorView = ({ thought = mockThought }) => {
// //   const [title, setTitle] = useState(thought.title ?? "");
// //   const [isAiWriting, setIsAiWriting] = useState(false);
// //   const [isEditingDisabled, setIsEditingDisabled] = useState(false);
// //   const [isShowingAiEditorMenu, setShowAiEditorMenu] = useState(false);
// //   const [isShowingAiSelectionMenu, setIsShowingAiSelectionMenu] = useState(false);
// //   const [isConnected] = useState(true);
// //   const [isConnecting] = useState(false);
  
// //   const disableUpdatesRef = useRef(false);
// //   const storedContentRef = useRef<JSONContent | null>(null);
// //   const contentAfterApplyRef = useRef<JSONContent | null>(null);

// //   const editor = useEditor({
// //     extensions: [StarterKit],
// //     content: thought.content_json,
// //     editorProps: {
// //       attributes: { class: "main-editor doc-editor" },
// //     },
// //     autofocus: true,
// //     editable: true,
// //   });

// //   const showAiEditor = useCallback(() => {
// //     if (!editor) return;
// //     setShowAiEditorMenu(true);
// //   }, [editor]);

// //   const hideAiEditor = useCallback(() => {
// //     if (!editor) return;
// //     setShowAiEditorMenu(false);
// //   }, [editor]);

// //   const showAiSelectionMenu = useCallback(() => {
// //     if (!editor) return;
// //     setIsShowingAiSelectionMenu(true);
// //   }, [editor]);

// //   const hideAiSelectionMenu = useCallback(() => {
// //     if (!editor) return;
// //     setIsShowingAiSelectionMenu(false);
// //   }, [editor]);

// //   const thoughtContext = {
// //     thoughtId: thought.id,
// //     isConnecting,
// //     isConnected,
// //     editor,
// //     isEditingDisabled,
// //     isAiWriting,
// //     isShowingAiEditorMenu,
// //     isShowingAiSelectionMenu,
// //     title,
// //     setTitle,
// //     showAiEditor,
// //     hideAiEditor,
// //     showAiSelectionMenu,
// //     hideAiSelectionMenu,
// //     setIsAiWriting,
// //     disableUpdatesRef,
// //   };

// //   return (
// //     <EditorErrorBoundary>
// //       <ThoughtContext.Provider value={thoughtContext}>
// //         <AiGenerationContext.Provider value={{ isGenerating: false }}>
// //           <div className="relative flex h-full flex-row">
// //             <div className="no-scrollbar relative flex w-full flex-grow flex-col lg:flex-row">
// //               <div className="relative flex w-full flex-grow flex-col">
// //                 <Editor />
// //               </div>
// //             </div>
// //           </div>
// //         </AiGenerationContext.Provider>
// //       </ThoughtContext.Provider>
// //     </EditorErrorBoundary>
// //   );
// // };

// // const Editor = () => {
// //   const { editor, isConnected, isConnecting, isAiWriting } = useContext(ThoughtContext);
// //   const { isGenerating } = useContext(AiGenerationContext);
// //   const [hasSelection, setHasSelection] = useState(false);

// //   useEffect(() => {
// //     if (!editor) return;

// //     const updateSelectionState = () => {
// //       const { from, to } = editor.state.selection;
// //       setHasSelection(from !== to);
// //     };

// //     editor.on('selectionUpdate', updateSelectionState);
// //     return () => {
// //       editor.off('selectionUpdate', updateSelectionState);
// //     };
// //   }, [editor]);

// //   return (
// //     <div className="no-scrollbar relative box-border flex flex-grow flex-col items-center overflow-y-scroll">
// //       <nav className="sticky top-[-1px] z-30 -mr-2 w-full bg-background px-6 py-2 md:top-0 md:py-3">
// //         {/* NavBar would go here */}
// //       </nav>
// //       <div className="box-border flex w-full max-w-screen-lg grow flex-col px-6 md:pl-12 md:pr-20 md:pt-16 lg:flex-1">
// //         {isConnecting ? (
// //           <div className="w-full pl-8">
// //             <DocumentLoadingPlaceholder />
// //           </div>
// //         ) : (
// //           <>
// //             <div className="mb-8 md:pl-8">
// //               <EditorDraftingCard />
// //             </div>
// //             <TitleArea
// //               thoughtContext={useContext(ThoughtContext)}
// //               aiGenerationContext={useContext(AiGenerationContext)}
// //             />
// //             <div className="relative flex flex-row md:pl-[2px]">
// //               {editor && hasSelection && (
// //                 <EditorBubbleMenu thoughtContext={useContext(ThoughtContext)} />
// //               )}
// //               {editor && (
// //                 <div>
// //                   <DragHandle editor={editor} tippyOptions={{ offset: [-4, 4], zIndex: 10 }}>
// //                     <div className="hidden cursor-grab flex-row items-center rounded border border-transparent px-0.5 py-1 hover:border-border hover:bg-card active:cursor-grabbing active:bg-accent/20 md:flex">
// //                       <GripVertical className="h-5 w-5 text-tertiary" />
// //                     </div>
// //                   </DragHandle>
// //                 </div>
// //               )}
// //               <EditorContent
// //                 editor={editor}
// //                 className={cn(
// //                   "w-full",
// //                   (isAiWriting || !isConnected) && "pointer-events-none opacity-70",
// //                   isGenerating && "opacity-0"
// //                 )}
// //               />
// //               {isGenerating && (
// //                 <div className="absolute left-8 top-0 animate-pulse text-tertiary">Generating...</div>
// //               )}
// //             </div>
// //             <div className="h-[75dvh]" />
// //           </>
// //         )}
// //       </div>
// //       <FooterRow thoughtContext={useContext(ThoughtContext)} />
// //     </div>
// //   );
// // };



// "use client";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import { useState, useRef, useCallback, createContext, useContext, useEffect } from "react";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";
// import DragHandle from "@tiptap-pro/extension-drag-handle-react";
// import { cn } from "@/utils/index";
// import { EditorBubbleMenu } from "./EditorBubbleMenu";
// import { EditorDraftingCard } from "./EditorDraftingCard";
// import { FooterRow } from "./FooterRow";
// import { TitleArea } from "./TitleArea";
// import { DocumentLoadingPlaceholder } from "@/components/DocumentLoadingPlaceholder";
// import { EditorErrorBoundary } from "./EditorErrorBoundary";
// import { EditorContent, Extension, JSONContent, useEditor } from "@tiptap/react";
// import { GripVertical } from "lucide-react";
// import { tiptapExtensions } from "./tiptap";
// import { createFileHandlerExtension } from "./fileHandlerExtension";
// import { ChatSectionView } from "./ChatSectionView";
// import Suggestion from "./suggestion/Suggestion";



// const documentId = "123"; // Mock document ID
// const isEditMode = true; // Mock edit mode
// const ydoc = new Y.Doc(); // Mock Yjs document
// const provider = new WebrtcProvider("example-room", ydoc); // Mock Yjs provider
// const userRecord = { name: "User", email: "Y6A9o@example.com" }; // Mock user record  
  
// // Mock data
// const mockThought = {
//   id: "thought-1",
//   title: "Untitled",
//   content_json: {
//     type: "doc",
//     content: [{ type: "paragraph", content: [{ type: "text", text: "Sample text for selection" }] }],
//   },
// };

// // Context
//   export const ThoughtContext = createContext<any>({});
// const AiGenerationContext = createContext<any>({});

// export const EditorView = () => {
//   const [title, setTitle] = useState(mockThought.title);
//   const [isAiWriting, setIsAiWriting] = useState(false);
//   const [isEditingDisabled, setIsEditingDisabled] = useState(false);
//   const [previewingKey, setPreviewingKey] = useState<string | null>(null);
//   const [isShowingAiEditorMenu, setShowAiEditorMenu] = useState(false);
//   const [isShowingAiSelectionMenu, setIsShowingAiSelectionMenu] = useState(false);
//   const [threadId, setThreadId] = useState<string | null>(null);
//   const [isConnected, setIsConnected] = useState(true);
//   const [isConnecting, setIsConnecting] = useState(false);

//   const disableUpdatesRef = useRef(false);
//   const storedContentRef = useRef<JSONContent | null>(null);
//   const contentAfterApplyRef = useRef<JSONContent | null>(null);

//   const editor = useEditor({
//       editorProps: {
//         attributes: { class: "main-editor doc-editor" },
//       },
//       immediatelyRender: false,
//       extensions: [
//         ...tiptapExtensions,
//         createFileHandlerExtension(documentId),
       
//         Collaboration.configure({
//           document: ydoc,
//         }),
//         CollaborationCursor.configure({
//           provider,
//           user: {
//             name: userRecord.name ?? userRecord.email,
//             color: "#b694ff",
//           },
//         }),
//         Extension.create({
//           name: "hotkeys",
//           addKeyboardShortcuts() {
//             return {
//               "Mod-o": () => {
//                 showAiEditor();
//                 return true;
//               },
//               "Mod-k": () => {
//                 showAiSelectionMenu();
//                 return true;
//               },
//               Escape: () => {
//                 hideAiEditor();
//                 return true;
//               },
//             };
//           },
//         }),
//       ],
//       content: "",
//       onUpdate: ({ transaction }) => {
//         if (transaction.getMeta("y-sync$")) {
//           // Ignore y-sync updates
//           return;
//         }
//         onUpdate();
//       },
//       autofocus: !documentId,
//       editable: isEditMode && !isEditingDisabled,
//     });
  







//   const onUpdate = useCallback(() => {
//     // Simulate update without backend call
//     console.log("Document updated");
//   }, []);

//   const storeContentIfNeeded = useCallback(() => {
//     if (!storedContentRef.current) {
//       storedContentRef.current = editor?.getJSON() ?? null;
//     }
//   }, [editor]);

//   const storeContentAsApplyContent = useCallback(() => {
//     contentAfterApplyRef.current = editor?.getJSON() ?? null;
//   }, [editor]);

//   const restoreFromLastContent = useCallback(() => {
//     if (storedContentRef.current) {
//       editor?.commands.setContent(storedContentRef.current);
//       storedContentRef.current = null;
//       contentAfterApplyRef.current = null;
//     }
//   }, [editor]);

//   const clearStoredContent = useCallback(() => {
//     storedContentRef.current = null;
//   }, []);

//   const clearApplyContent = useCallback(() => {
//     contentAfterApplyRef.current = null;
//   }, []);

//   const convertSelectionToEditMark = useCallback(() => {
//     if (!editor) return;
//     editor.chain().setMark("editHighlight").run();
//   }, [editor]);

//   const showAiSelectionMenu = useCallback(() => {
//     if (!editor) return;
//     disableUpdatesRef.current = true;
//     if (editor.view.state.selection.content().size > 0) {
//       convertSelectionToEditMark();
//       setIsShowingAiSelectionMenu(true);
//     }
//   }, [editor, convertSelectionToEditMark]);

//   const showAiEditor = useCallback(() => {
//     if (!editor) return;
//     disableUpdatesRef.current = true;
//     setShowAiEditorMenu(true);
//   }, [editor]);

//   const onStartAiEdits = useCallback(() => {
//     setIsAiWriting(true);
//     setIsEditingDisabled(true);
//   }, []);

//   const onFinishAiEdits = useCallback(() => {
//     setIsAiWriting(false);
//   }, []);

//   const applySuggestedChanges = useCallback(() => {
//     if (!editor) return;
//     editor.commands.setContent(contentAfterApplyRef.current ?? "");
//     setPreviewingKey(null);
//     setIsEditingDisabled(false);
//     clearApplyContent();
//     clearStoredContent();
//     onFinishAiEdits();
//     disableUpdatesRef.current = false;
//     onUpdate();
//   }, [editor, clearStoredContent, clearApplyContent, onFinishAiEdits, onUpdate]);

//   const hideAiEditor = useCallback(() => {
//     if (!editor) return;
//     setShowAiEditorMenu(false);
//     restoreFromLastContent();
//     clearApplyContent();
//     clearStoredContent();
//     onFinishAiEdits();
//     disableUpdatesRef.current = false;
//   }, [editor, restoreFromLastContent, clearStoredContent, clearApplyContent, onFinishAiEdits]);

//   const hideAiSelectionMenu = useCallback(() => {
//     if (!editor) return;
//     setIsShowingAiSelectionMenu(false);
//     restoreFromLastContent();
//     clearApplyContent();
//     clearStoredContent();
//     onFinishAiEdits();
//     disableUpdatesRef.current = false;
//   }, [editor, restoreFromLastContent, clearStoredContent, clearApplyContent, onFinishAiEdits]);

//   const handleSetTitle = useCallback((newTitle: string) => {
//     setTitle(newTitle);
//   }, []);

//   useEffect(() => {
//     // Simulate connection
//     const timer = setTimeout(() => {
//       setIsConnecting(false);
//       setIsConnected(true);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
    
//     <ThoughtContext.Provider
//       value={{
//         thoughtId: mockThought.id,
//         isConnecting,
//         editor,
//         disableUpdatesRef,
//         onUpdate,
//         isConnected,
//         isEditingDisabled,
//         setIsEditingDisabled,
//         previewingKey,
//         setPreviewingKey,
//         storeContentIfNeeded,
//         storeContentAsApplyContent,
//         restoreFromLastContent,
//         clearStoredContent,
//         clearApplyContent,
//         setShowAiEditorMenu,
//         isShowingAiEditorMenu,
//         showAiEditor,
//         hideAiEditor,
//         applySuggestedChanges,
//         isAiWriting,
//         setIsAiWriting,
//         onStartAiEdits,
//         onFinishAiEdits,
//         threadId,
//         setThreadId,
//         convertSelectionToEditMark,
//         isShowingAiSelectionMenu,
//         hideAiSelectionMenu,
//         showAiSelectionMenu,
//         title,
//         setTitle: handleSetTitle,
//       }}
//     >
//       <div className="relative flex h-full flex-row">
//         <div
//           className={cn(
//             "relative hidden w-[33vw] shrink-0 bg-background transition-[width] duration-300 ease-in-out md:block",
//             !isShowingAiEditorMenu && "w-0"
//           )}
//         >
//           {isShowingAiEditorMenu && (<ChatSectionView/>)}
//         </div>
//         <div className="no-scrollbar relative flex w-full flex-grow flex-col lg:flex-row">
//           <AiGenerationContext.Provider value={{ isGenerating: false }}>
//             <Editor />
//           </AiGenerationContext.Provider>
//         </div>
//         <div
//           className={cn(
//             "absolute top-0 z-40 block h-full w-screen bg-background md:hidden",
//             !isShowingAiEditorMenu && "hidden"
//           )}
//         >
//           {isShowingAiEditorMenu && (
//             <div className="p-4">AI Chat Simulation (Mobile View)</div>
//           )}
//         </div>
//       </div>
//     </ThoughtContext.Provider>
//   );
// };

// const Editor = () => {
//   const { editor, isConnected, isConnecting, isAiWriting } = useContext(ThoughtContext);
//   // const { isGenerating } = useContext(AiGenerationContext);
//   const [isGenerating, setIsGenerating] = useState(false); // Mock isGenerating = false; // Mock isGenerating state

//     interface Suggestion {
//       id: number;
//       icon: string;
//       title: string;
//       description: string;
//       time: string;
//       timeDiff: string;
//     }
//     const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

//     const handleEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
//       if (e.key === 'Enter') {
//       e.preventDefault();
//       const fixedSuggestions: Suggestion[] = [
//         {
//         id: 1,
//         icon: "GoPencil",
//         title: "Title Suggestion",
//         description:
//           "The impact of Neural implants on Animal behavior",
//         time: "2025-05-23 15:45",
//         timeDiff: 'just now',
//         },
//         {
//         id: 2,
//         icon: "IoMdCloudOutline",
//         title: "Idea",
//         description:
//           "It might be interesting to explore the impact of Neural implants on Animal behavior. Are they meant to be used for medical purposes or for entertainment? This could be a topic of great interest for future research.",
//         time: "2025-05-23 15:46",
//         timeDiff: 'just now',
//         },
//         {
//         id: 3,
//         icon: "GoPencil",
//         title: "Suggestion",
//         description:
//           "Consider the ethical implications of Neural implants on Animal behavior. It is important to explore the potential risks and benefits of such technology.",
//         time: "2025-05-23 15:47",
//         timeDiff: 'just now',
//         },
//       ];
//       setSuggestions(fixedSuggestions);
//       setIsGenerating(true);
//       }
//     };
//   return (
//     <div>
//     <div className="no-scrollbar relative box-border flex flex-grow flex-col items-center overflow-y-scroll">
//       <nav className="sticky top-[-1px] z-30 -mr-2 w-full bg-background px-6 py-2 md:top-0 md:py-3">
//         <div className="flex justify-between">
//           <div>Simulated NavBar</div>
//           <button onClick={() => useContext(ThoughtContext).showAiEditor()}>
//             Open AI Editor
//           </button>
//         </div>
//       </nav>
//       <div className="box-border flex w-full max-w-screen-lg grow flex-col px-6 md:pl-12 md:pr-20 md:pt-16 lg:flex-1">
//         {isConnecting ? (
//           <div className="w-full pl-8">
//             <DocumentLoadingPlaceholder />
//           </div>
//         ) : (
//           <>
//             <div className="mb-8 md:pl-8">
//               {/* <EditorDraftingCard /> */}
//             </div>
//             <TitleArea
//               thoughtContext={useContext(ThoughtContext)}
//               aiGenerationContext={useContext(AiGenerationContext)}
//             />
//             <div className="relative flex flex-row md:pl-[2px]">
//               {editor && (
//                 <EditorBubbleMenu thoughtContext={useContext(ThoughtContext)} />
//               )}
//               {editor && (
//                 <div>
//                   <DragHandle editor={editor} tippyOptions={{ offset: [-4, 4], zIndex: 10 }}>
//                     <div className="hidden cursor-grab flex-row items-center rounded border border-transparent px-0.5 py-1 hover:border-border hover:bg-card active:cursor-grabbing active:bg-accent/20 md:flex">
//                       <GripVertical className="h-5 w-5 text-tertiary" />
//                     </div>
//                   </DragHandle>
//                 </div>
//               )}
//               <EditorContent
//                 editor={editor}
//                 className={cn(
//                   "w-full",
//                   (isAiWriting || !isConnected) && "pointer-events-none opacity-70",
//                   isGenerating && "opacity-0"
//                 )}
//                 onKeyDown={handleEnterPress}
//               />
//               {/* {isGenerating && (
//                 <div className="absolute left-8 top-0 animate-pulse text-tertiary">
//                   Generating...
//                 </div>
//               )} */}
//             </div>
//             <div className="h-[75dvh]" />
//           </>
//         )}
//       </div>
//       <FooterRow thoughtContext={useContext(ThoughtContext)} />
//     </div>
    
//      {isGenerating && (
//                 <div className="absolute left-8 top-0 animate-pulse text-tertiary">
//                   //show come from the side when is Generating become true else it should be hidden
//                   <div className="w-1/3 ">
//                    <Suggestion suggestions={suggestions}/>
//                   </div>
//                 </div>
//               )}
//      </div>      
//   );
// };




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
import { ChatSectionView } from "./ChatSectionView";
import Suggestion from "./suggestion/Suggestion";

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

// const SuggestionsPanel = ({ 
//   isOpen, 
//   onClose, 
//   suggestions 
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   suggestions: Suggestion[];
// }) => (
//   <div className={cn(
//     "fixed right-0 top-0 h-full w-full sm:w-96 bg-background shadow-lg transition-all duration-300 z-40 border-l",
//     "transform ease-in-out",
//     isOpen ? "translate-x-0" : "translate-x-full"
//   )}>
//  <div className="flex-1 overflow-y-auto py-4">
//         <Suggestion suggestions={suggestions} />
//       </div>
//   </div>
// );





// const SuggestionsPanel = ({ 
//   isOpen, 
//   onClose, 
//   suggestions 
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   suggestions: Suggestion[];
// }) => {
//   const panelRef = useRef<HTMLDivElement>(null);
//   const [position, setPosition] = useState({ x: window.innerWidth - 400, y: 100 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

//   // Handle drag start
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (e.target === panelRef.current) {
//       setIsDragging(true);
//       setDragOffset({
//         x: e.clientX - position.x,
//         y: e.clientY - position.y
//       });
//     }
//   };

//   // Handle dragging
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isDragging) return;
      
//       setPosition({
//         x: e.clientX - dragOffset.x,
//         y: e.clientY - dragOffset.y
//       });
//     };

//     const handleMouseUp = () => {
//       setIsDragging(false);
//     };

//     if (isDragging) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, dragOffset]);

//   // Close when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={panelRef}
//       className={cn(
//         "fixed w-96 max-w-[90vw] h-[60vh] max-h-[80vh]",
//         "bg-background border rounded-lg shadow-xl overflow-hidden",
//         "transition-all duration-300 transform",
//         "cursor-grab active:cursor-grabbing",
//         "z-50" // Ensure it's above other content
//       )}
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         opacity: isDragging ? 0.9 : 1
//       }}
//       onMouseDown={handleMouseDown}
//     >
//       {/* Header with drag handle and close button */}
//       <div className="flex items-center justify-between p-4 border-b bg-accent/10">
//         <div className="w-full h-8 cursor-move"> {/* Drag handle area */}
//           <h3 className="text-lg text-secondary font-semibold">Claudy's Suggestions</h3>
//         </div>
//         <button 
//           onClick={onClose}
//           className="p-1 rounded-full hover:bg-accent/20 transition-colors"
//           aria-label="Close suggestions"
//         >
//           <X className="h-5 w-5 text-primary" />
//         </button>
//       </div>

//       {/* Content with scroll */}
//       <div className="h-[calc(100%-56px)] overflow-y-auto p-4">
//         <Suggestion suggestions={suggestions} />
//       </div>
//     </div>
//   );
// };


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
        <h3 className="text-lg text-secondary font-semibold">Claudy's Suggestions</h3>
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
            {isShowingAiEditorMenu && <ChatSectionView/>}
          </div>
          <div className="no-scrollbar relative flex w-full flex-grow flex-col lg:flex-row">
            <AiGenerationContext.Provider value={{ isGenerating: false }}>
              <Editor />
            </AiGenerationContext.Provider>
          </div>
        </div>
      </ThoughtContext.Provider>
    </EditorErrorBoundary>
  );
};

const Editor = () => {
  const { editor, isConnected, isConnecting, isAiWriting } = useContext(ThoughtContext);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !isGenerating) {
      e.preventDefault();
      setSuggestions([
        {
          id: 1,
          icon: "GoPencil",
          title: "Title Suggestion",
          description: "The impact of Neural implants on Animal behavior",
          timeDiff: 'just now',
        },
        {
          id: 2,
          icon: "IoMdCloudOutline",
          title: "Idea",
          description: "It might be interesting to explore the impact of Neural implants on Animal behavior...",
          timeDiff: 'just now',
        },
        {
          id: 3,
          icon: "GoPencil",
          title: "Suggestion",
          description: "Consider the ethical implications of Neural implants on Animal behavior...",
          timeDiff: 'just now',
        },
      ]);
      setIsGenerating(true);
    }
  };

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
            <div className="flex justify-between">
              <div>Simulated NavBar</div>
              <button onClick={() => useContext(ThoughtContext).showAiEditor()}>
                Open AI Editor
              </button>
            </div>
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
                    onKeyDown={handleEnterPress}
                  />
                </div>
                <div className="h-[75dvh]" />
              </>
            )}
          </div>
          <FooterRow thoughtContext={useContext(ThoughtContext)} />
        </div>
      </div>

      {/* Suggestions Panel */}
      <SuggestionsPanel
        isOpen={isGenerating}
        onClose={() => setIsGenerating(false)}
        suggestions={suggestions}
      />
    </div>
  );
};