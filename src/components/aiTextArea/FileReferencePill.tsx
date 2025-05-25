import { SiGithub } from "@icons-pack/react-simple-icons";
import { ExternalLinkIcon, LinkIcon, UnlinkIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";import { Button } from "@/components/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip";

export type FileReferencePillProps = {
  repoFullName: string;
  path: string;
  fileUrl: string;
  isExisting?: boolean;
  onRemove?: () => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  showConnectTooltip?: boolean;
  showUnlinkIconInsteadOfX?: boolean;
};

export const FileReferencePill = ({
  repoFullName,
  path,
  fileUrl,
  onRemove,
  isExisting,
  onConnect,
  onDisconnect,
  showConnectTooltip,
  showUnlinkIconInsteadOfX,
}: FileReferencePillProps) => {
  return (
    <Tooltip durationPreset="instant">
      <TooltipTrigger>
        <div className="flex h-6 cursor-default flex-row items-center gap-0.5 rounded border border-gray-300 px-1.5 text-xs hover:bg-gray-100 border-2 border-red-200">
          <span className="truncate">{path.split("/").pop()}</span>
          {onRemove && (
            <Button
              size="icon-xs-overflow"
              variant="ghost"
              className="-mr-2 hover:bg-transparent hover:text-blue-600 active:bg-transparent"
              onClick={onRemove}
            >
              {showUnlinkIconInsteadOfX ? <UnlinkIcon className="size-3" /> : <XIcon className="size-3" />}
            </Button>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-row items-center gap-1">
            <SiGithub className="size-3.5 text-gray-600" />
            <span className="text-xs text-gray-600">{repoFullName}</span>
          </div>
          <Link to={fileUrl} target="_blank">
            <div className="flex flex-row items-center gap-1 text-blue-600 hover:opacity-60">
              <span className="text-xs underline">{path}</span>
              <ExternalLinkIcon className="size-3" />
            </div>
          </Link>
          {showConnectTooltip && (
            <div className="mt-1">
              {isExisting ? (
                <Button size="xs" variant="outline" onClick={onDisconnect}>
                  <UnlinkIcon className="size-3" />
                  <span>Unlink from document</span>
                </Button>
              ) : (
                <Button size="xs" variant="outline" onClick={onConnect}>
                  <LinkIcon className="size-3" />
                  <span>Connect to document</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};