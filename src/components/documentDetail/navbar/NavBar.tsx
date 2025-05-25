import React from "react";
import { Hotkey } from "@/components/ui/HotKey";
import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip";
import {
  CopyIcon,
  FileCheckIcon,
  MoreHorizontalIcon,
  PenIcon,
  PenOffIcon,
  RedoIcon,
  RefreshCwIcon,
  TriangleAlertIcon,
  UndoIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

export const NavBarTestUI = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(true);
  const [disableTitleSuggestions, setDisableTitleSuggestions] = React.useState(false);
  
  const mockEditor = {
    can: () => ({ undo: () => true, redo: () => true }),
    commands: {
      undo: () => console.log("Undo"),
      redo: () => console.log("Redo"),
    },
  };

  return (
    <div className="flex w-full flex-row items-center justify-between gap-2 p-4 border rounded-lg">
      <div className="flex-1 truncate text-xs text-gray-500">
        {isEditMode ? (
          <span>Last edited just now</span>
        ) : (
          <span>Published just now by Test User</span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {isEditMode ? (
          <>
            {!isConnected && (
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => setIsConnected(true)}
                  >
                    <div className="flex items-center gap-1">
                      <TriangleAlertIcon className="size-4" />
                      <span>Disconnected</span>
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Click to reconnect</TooltipContent>
              </Tooltip>
            )}
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => mockEditor.commands.undo()}
                >
                  <UndoIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-2">
                  <Hotkey keys={["cmd", "Z"]} />
                  <span>Undo</span>
                </div>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => mockEditor.commands.redo()}
                >
                  <RedoIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-2">
                  <Hotkey keys={["cmd", "shift", "Z"]} />
                  <span>Redo</span>
                </div>
              </TooltipContent>
            </Tooltip>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditMode(false)}
            >
              <XIcon className="size-4" />
              Leave edit mode
            </Button>
            
            <Button
              size="sm"
              onClick={() => {
                console.log("Publishing document");
                setIsEditMode(false);
              }}
            >
              <FileCheckIcon className="size-4" />
              Publish
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditMode(true)}
          >
            <PenIcon className="size-4" />
            Edit
          </Button>
        )}
        
        <Dropdown
          trigger={
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontalIcon className="size-5" />
            </Button>
          }
        >
          <div className="flex w-64 flex-col p-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => setDisableTitleSuggestions(!disableTitleSuggestions)}
            >
              {disableTitleSuggestions ? (
                <>
                  <PenIcon className="size-4" />
                  <span>Enable title suggestions</span>
                </>
              ) : (
                <>
                  <PenOffIcon className="size-4" />
                  <span>Disable title suggestions</span>
                </>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => console.log("Share document")}
            >
              <UsersIcon className="size-4" />
              <span>Document Sharing</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => console.log("Copy as Markdown")}
            >
              <CopyIcon className="size-4" />
              <span>Copy as Markdown</span>
            </Button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};