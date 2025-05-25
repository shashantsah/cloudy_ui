import React from "react";
import { TbTopologyStar3 } from "react-icons/tb";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuArchive } from "react-icons/lu";
import { LuPin } from "react-icons/lu";
import { LuMessageCircleReply } from "react-icons/lu";
import { GoPencil } from "react-icons/go";
import { IoMdCloudOutline } from "react-icons/io";

type CardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  timeDiff: string;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon: iconString,
  timeDiff,
}) => {
  // Convert icon string to actual icon component
  const Icon = iconString === "GoPencil" ? GoPencil : IoMdCloudOutline;
  return (
    <div className="bg-background rounded-lg m-2 hover:bg-[#e9e7e6] border-[1px] border-[#e9e7e6] hover:border-[#c0bfbf] transition-colors duration-200 animate-fadeInUp">
      <div className="p-2 flex justify-between">
        <div className="flex items-center">
          <div className="text-[#a7a5a3] font-bold m-1 mr-0 ">
            <Icon />
          </div>
          <div className="m-1 text-[#a7a5a3] text-sm font-medium ">{title}</div>
        </div>
        <div className="flex items-center">
          <div className="text-secondary text-sm font-medium ">{timeDiff}</div>
          <div className="m-1 rounded-full bg-background text-gray-400 text-xs font-semibold w-2 h-2 "></div>
        </div>
      </div>
      <p className="font-medium  mx-4 text-left">{description}</p>
      <div className="mt-2 flex justify-between m-2 pb-3">
        <div className="flex items-center">
          <button
            className="text-secondary flex items-center bg-background rounded-md p-1 m-1 hover:bg-[#e1e1e1] transition-colors duration-200"
            onClick={() => console.log("Reply clicked")}
          >
            <LuMessageCircleReply />
            <span className="text-xs font-bold mx-1 ">Reply</span>
          </button>
          <button
            className="text-[#9086c1] flex items-center bg-background rounded-md p-1 m-1 hover:bg-[#e1e1e1] transition-colors duration-200"
            onClick={() => console.log("Show me clicked")}
          >
            <TbTopologyStar3 />
            <span className="text-xs font-bold mx-1">Show me</span>
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="text-secondary m-1 mx-2 hover:text-[#9086c1] transition-colors duration-200"
            onClick={() => console.log("Pin clicked")}
          >
            <LuPin />
          </button>
          <button
            className="text-secondary font-bold m-1 mx-2 hover:text-[#9086c1] transition-colors duration-200"
            onClick={() => console.log("Archive clicked")}
          >
            <LuArchive />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
