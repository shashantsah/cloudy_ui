import { ChatRole } from "@/utils/common_utils/chat";
import { useContext, useEffect, useRef } from "react";
import { RepoReference } from "@/utils/common_utils/docs";
import { useHotkeys } from "react-hotkeys-hook";

import { cn } from "@/utils/index";
import { AiTextArea } from "../aiTextArea/AiTextArea";

// import { AiTextArea } from "./aiTextArea";
// import { useExistingLinkedFiles } from "../hooks";
// import { ThoughtContext } from "../thoughtContext";
// import { ChatContent } from "./ChatContent";
// import { ChatHomeView } from "./ChatHomeView";
// import { useChatThread, useReplyToThread, useStartThread } from "./chat";

// export const ChatSection = () => {
// 	const { editor, hideAiEditor, thoughtId, threadId, setThreadId } = useContext(ThoughtContext);

// 	const { data: existingLinkedFiles } = useExistingLinkedFiles(thoughtId);

// 	const startThreadMutation = useStartThread();
// 	const replyToThreadMutation = useReplyToThread();

// 	const { data: thread } = useChatThread(threadId);

// 	const textAreaRef = useRef<HTMLTextAreaElement>(null);

// 	const handleOnCancel = () => {
// 		hideAiEditor();
// 	};

// 	const handleSubmit = async (text: string, fileReferences: RepoReference[]) => {
// 		if (threadId) {
// 			await replyToThreadMutation.mutateAsync({ threadId, content: text, fileReferences });
// 		} else {
// 			await handleStartThread(text, fileReferences);
// 		}
// 	};

// 	const handleStartThread = async (text: string, fileReferences: RepoReference[]) => {
// 		if (!editor) {
// 			throw new Error("Editor is not initialized");
// 		}

// 		const { id } = await startThreadMutation.mutateAsync({ content: text, fileReferences });
// 		setThreadId(id);
// 	};

// 	useHotkeys("esc", () => handleOnCancel());

// 	useEffect(() => {
// 		// For some reason, autofocus doesn't work and we have to manually focus the text area
// 		textAreaRef.current?.focus();
// 	}, []);

// 	const isThreadLoading = thread?.messages.some(message => message.role === ChatRole.Assistant && !message.completed_at);

// 	return (
// 		<div className="flex w-full flex-1 flex-col overflow-hidden">
// 			<div className="flex flex-1 items-center justify-center overflow-hidden px-4">
// 				{thread ? <ChatContent chatThread={thread} /> : <ChatHomeView />}
// 			</div>
// 			<div className={cn("w-full border-t border-border px-4 py-4", isThreadLoading && "pointer-events-none opacity-70")}>
// 				<AiTextArea
// 					onSubmit={handleSubmit}
// 					onCancel={handleOnCancel}
// 					existingLinkedFiles={existingLinkedFiles}
// 					placeholder="Ask a question or describe the change you want to make"
// 					submitButtonText={threadId ? "Reply in thread" : "Start new thread"}
// 					addButtonText="Files"
// 					showConnectTooltip
// 				/>
// 			</div>
// 		</div>
// 	);
// };




// import { ChatContent } from "./ChatContent";
// import { ChatHomeView } from "./ChatHomeView";


const mockThoughtContext = {
  editor: {
    getText: () => "Sample input",
    storage: { markdown: { getMarkdown: () => "Sample input" } },
    commands: {
      focus: () => console.log("Editor focused"),
      clearContent: () => console.log("Content cleared"),
    },
  },
  hideAiEditor: () => console.log("Hide AI editor"),
  thoughtId: "thought-1",
  threadId: "thread-1",
  setThreadId: (id: any) => console.log("Set thread ID:", id),
};

const mockExistingLinkedFiles = [
  {
    path: "src/main.js",
    repoFullName: "owner/repo1",
    fileUrl: "https://github.com/owner/repo1/blob/main/src/main.js",
  },
];

const mockThread = {
  messages: [
    {
      role: "user",
      content: "Hello, how can I improve my code?",
      completed_at: new Date().toISOString(),
    },
    {
      role: "assistant",
      content: "Here are some suggestions...",
      completed_at: new Date().toISOString(),
    },
  ],
};

const mockStartThread = {
  mutateAsync: (data: any) => {
    console.log("Start thread:", data);
    return Promise.resolve({ id: "thread-1" });
  },
};

const mockReplyToThread = {
  mutateAsync: (data: any) => {
    console.log("Reply to thread:", data);
    return Promise.resolve();
  },
};

export const ChatSection = () => {
  const { editor, hideAiEditor, thoughtId, threadId, setThreadId } = mockThoughtContext;
  const existingLinkedFiles = mockExistingLinkedFiles;
  const thread = mockThread;

  const handleOnCancel = () => {
    hideAiEditor();
  };

  const handleSubmit = async (text: any, fileReferences: any) => {
    if (threadId) {
      await mockReplyToThread.mutateAsync({ threadId, content: text, fileReferences });
    } else {
      await handleStartThread(text, fileReferences);
    }
  };

  const handleStartThread = async (text: any, fileReferences: any) => {
    if (!editor) throw new Error("Editor is not initialized");
    const { id } = await mockStartThread.mutateAsync({ content: text, fileReferences });
    setThreadId(id);
  };

  useHotkeys("esc", () => handleOnCancel());

  const isThreadLoading = false;

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden">
			{/* <div className="flex flex-1 items-center justify-center overflow-hidden px-4">
				{thread ? <ChatContent chatThread={thread} /> : <ChatHomeView />}
			</div> */}
      <div className={cn("w-full border-t border-border px-4 py-4", isThreadLoading && "pointer-events-none opacity-70")}>
        <AiTextArea
          onSubmit={handleSubmit}
          onCancel={handleOnCancel}
          existingLinkedFiles={existingLinkedFiles}
          placeholder="Ask a question or describe the change you want to make"
          submitButtonText={threadId ? "Reply in thread" : "Start new thread"}
          addButtonText="Files"
          showConnectTooltip
        />
      </div>
    </div>
  );
};