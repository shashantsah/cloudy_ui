"use client";
import { HiGlobeAlt } from "react-icons/hi";

import { TbTopologyStar3 } from "react-icons/tb";

// interface SuggestionPopupProps {
//   show: boolean;
//   x: number;
//   y: number;
//   text: string;
//   onMouseEnter: () => void;
//   onMouseLeave: () => void;
// };

interface SuggestionPopupProps {
  show: boolean;
  x: number;
  y: number;
  text: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const SuggestionPopup = ({ show, x, y, text, onMouseEnter, onMouseLeave }: SuggestionPopupProps) => {
  return (
    <div
      className="absolute bg-white border w-[300px] border-gray-200 shadow-lg rounded-md p-3 z-50 transition-opacity duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        left: x - 230,
        top: y,
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div className="flex items-center border-b pb-1">
        <div className="text-[#8f8d8b] text-sm font-medium mt-1">
          Suggestion
        </div>
      </div>
      <div className="mt-2">
        <div className="flex">
          <div className="mt-3 text-[#5aafdd]">
            <HiGlobeAlt />
          </div>
          <div className="text-sm m-2 leading-relaxed max-h-[150px] overflow-y-auto">
            {text}
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
  );
};

export default SuggestionPopup;