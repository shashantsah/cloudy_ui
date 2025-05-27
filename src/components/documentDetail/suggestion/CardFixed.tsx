import React from "react";
import { TbTopologyStar3 } from "react-icons/tb";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuArchive } from "react-icons/lu";
import { LuPin } from "react-icons/lu";
import { LuMessageCircleReply } from "react-icons/lu";
import { GoPencil } from "react-icons/go";
import { IoMdCloudOutline } from "react-icons/io";


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
const CardFixed = ({ title, description, icon: iconString, timeDiff }: any) => {
  // Convert icon string to actual icon component
  const Icon = iconString === 'GoPencil' ? GoPencil : IoMdCloudOutline;
  return (
    <div className="bg-[#ffffff] rounded-md m-2 hover:bg-[#ffffff] border-[1px] border-[#eeeded] shadow-md transition-colors duration-200 animate-fadeInUp">
      <div className="p-2 flex justify-between">        
        <div className="flex items-center">
          <div className="text-[#8f8d8b] font-bold m-1 mr-0 ">
            <Icon />
          </div>
          <div className="m-1 text-[#8f8d8b] text-sm font-medium ">
            {title}
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-[#5e5e5e] text-sm font-medium ">{timeDiff}</div>
          <div className="m-1 rounded-full bg-[#aea5d8] text-white text-xs font-semibold w-2 h-2 "></div>
        </div>
      </div>
      <p className="font-medium text-gray-700 mx-4 text-left">
        {renderDescription(description)}
      </p>
      <div className="mt-2 flex justify-between m-2 pb-3">
        <div className="flex items-center">
          <button className="text-[#5e5e5e] flex items-center bg-[#f4f4f5] rounded-md p-1 m-1 hover:bg-[#e1e1e1] transition-colors duration-200" onClick={() => console.log('Reply clicked')}>
            <LuMessageCircleReply /><span className="text-xs font-bold mx-1 ">Reply</span>
          </button>
          <button className="text-[#9086c1] flex items-center bg-[#f4f4f5] rounded-md p-1 m-1 hover:bg-[#e1e1e1] transition-colors duration-200" onClick={() => console.log('Show me clicked')}>
            <TbTopologyStar3 /><span className="text-xs font-bold mx-1">Show me</span>
          </button>
        </div>
        <div className="flex items-center">
          <button className="text-[#5e5e5e] m-1 mx-2 hover:text-[#9086c1] transition-colors duration-200" onClick={() => console.log('Pin clicked')}>
            <LuPin />
          </button>
          <button className="text-[#5e5e5e] font-bold m-1 mx-2 hover:text-[#9086c1] transition-colors duration-200" onClick={() => console.log('Archive clicked')}>
            <LuArchive />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFixed;