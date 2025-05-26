import React from "react";
import { TbTopologyStar3 } from "react-icons/tb";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuArchive, LuCroissant, LuCross, LuCrosshair, LuDelete } from "react-icons/lu";
import Card from "./Card";
import { GoPencil } from "react-icons/go";
import { IoMdCloudOutline } from "react-icons/io";
import { DeleteIcon, LucideSquareScissors, PanelRightCloseIcon, X } from "lucide-react";

interface SuggestionItem {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface SuggestionProps {
  suggestions: SuggestionItem[];
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestions }) => {
 

  return (
    <div className="rounded-lg bg-background ">
      <div className="p-2">
        {suggestions.length === 0 && (
          <p className="text-[#afaeac] text-md my-2">Once Tochan understand what you are thinking about, suggestions will appear here.</p>
        )}
        {suggestions.length > 0 && suggestions.map((suggestion, index) => {
          const staggerClass = `stagger-${Math.min(index + 1, 10)}`;
          return (
            <div key={suggestion.id} className={`slide-down ${staggerClass}`}>
              <Card 
                title={suggestion.title} 
                description={suggestion.description} 
                icon={suggestion.icon} 
                timeDiff="just now"
              />
            </div>
          );
        })}
         <div className="mx-2">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Ask Claudy something..." 
              className="w-full my-2 p-1 px-2 pr-8 rounded-lg bg-[#e9e7e6] border border-[#dfdddb] 
                       focus:outline-none focus:ring-2 focus:ring-[#9086c1] focus:ring-opacity-50 
                       focus:border-transparent transition-all duration-200 
                       hover:bg-[#e9e7e6] hover:border-[#9086c1] text-md hover:border-opacity-50 placeholder:text-secondary"
            />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;