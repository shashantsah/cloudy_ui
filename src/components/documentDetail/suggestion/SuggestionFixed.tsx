// import React, { useState } from "react";
// import { TbTopologyStar3, TbChevronDown } from "react-icons/tb";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { LuArchive } from "react-icons/lu";
// import Card from "./Card";

// const SuggestionFixed = ({ suggestions }: any) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div className="max-h-[calc(100vh-100px)] overflow-y-auto m-4 mt-10 rounded-md bg-background fixed top-10 right-5  max-w-[400px] border-gray-700">
//       <div className="p-2 flex justify-between">
//         <div className="flex items-center">
//           <div className="text-secondary font-bold m-1">
//             <TbTopologyStar3 />
//           </div>
//           {!isCollapsed && (
//             <div>
//               <div className="m-1 text-[#8f8d8b] font-medium">
//                 Tochan's Suggestions
//               </div>
//             </div>
//           )}
//           {suggestions.length > 0 && (
//             <div className="m-1 rounded-full bg-background text-white text-xs font-semibold w-5 h-5 flex items-center justify-center">
//               {suggestions.length}
//             </div>
//           )}
//         </div>
//         <div className="flex items-center">
//           {!isCollapsed && suggestions.length > 0 && (
//             <div className="flex items-center">
//               <button
//                 className="text-secondary m-1 hover:text-primary transition-colors duration-200"
//                 onClick={() => console.log("Dots clicked")}
//               >
//                 <BiDotsHorizontalRounded />
//               </button>
//               <button
//                 className="text-secondary font-bold m-1 hover:text-primary transition-colors duration-200"
//                 onClick={() => console.log("Archive clicked")}
//               >
//                 <LuArchive />
//               </button>
//             </div>
//           )}
//           <button
//             className="text-secondary font-bold m-1 hover:text-primary transition-colors duration-200"
//             onClick={() => setIsCollapsed(!isCollapsed)}
//           >
//             <TbChevronDown
//               className={`transition-transform ${
//                 isCollapsed ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//         </div>
//       </div>
//       {!isCollapsed && (
//         <div className="p-2">
//           <div>
//             {suggestions.length === 0 && (
//               <p className="text-[#afaeac] text-md m-2">
//                 Once Tochan understands what you are thinking about, suggestions
//                 will appear here.
//               </p>
//             )}
//             {suggestions.length > 0 &&
//               suggestions.map((suggestion: any, index: any) => {
//                 const staggerClass = `stagger-${Math.min(index + 1, 10)}`;
//                 return (
//                   <div
//                     key={suggestion.id}
//                     className={`slide-down ${staggerClass}`}
//                   >
//                     <Card
//                       title={suggestion.title}
//                       description={suggestion.description}
//                       icon={suggestion.icon}
//                       timeDiff="just now"
//                     />
//                   </div>
//                 );
//               })}
//             <div className="mx-2">
//               <div className="relative w-full">
//                 <input
//                   type="text"
//                   placeholder="Ask Tochan something..."
//                   className="w-full my-2 p-1 px-2 pr-8 rounded-md bg-[#ffffff] border border-[#f4f4f5] 
//                        focus:outline-none focus:ring-2 focus:ring-[#9086c1] focus:ring-opacity-50 
//                        focus:border-transparent transition-all duration-200 
//                        hover:bg-[#ffffff] hover:border-[#9086c1] text-md text-[#a7a6a6] hover:border-opacity-50 placeholder:text-gray-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     // <div>testing</div>
//   );
// };

// export default SuggestionFixed;


import React, { useEffect, useState } from "react";
import { TbTopologyStar3, TbChevronDown } from "react-icons/tb";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuArchive } from "react-icons/lu";
import CardFixed from "./CardFixed";


const SuggestionFixed = ({ suggestions }: any) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    if (suggestions.length > 0) {
      setIsCollapsed(true);
    }
  }, [suggestions]);
  return (
    <div className={`m-4 mt-10 rounded-md bg-[#ffffff] ${!isCollapsed ? "shadow-md" : ""} fixed top-10 right-5  max-w-[400px] border-gray-700 max-h-[calc(100vh-100px)] overflow-y-auto`}>
      <div className="p-2 flex justify-between">
        <div className="flex items-center">
          <div className="text-[#9086c1] font-bold m-1">
            <TbTopologyStar3 />
          </div>
          {isCollapsed && (
            <div>
              <div className="m-1 text-[#8f8d8b] font-medium">
                Tochan's Suggestions
              </div>
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="m-1 rounded-full bg-[#aea5d8] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center">
              {suggestions.length}
            </div>
          )}
        </div>
        <div className="flex items-center">
          {isCollapsed && suggestions.length > 0 && (
            <div className="flex items-center">
              <button
                className="text-[#5e5e5e] m-1 hover:text-[#9086c1] transition-colors duration-200"
                onClick={() => console.log("Dots clicked")}
              >
                <BiDotsHorizontalRounded />
              </button>
              <button
                className="text-[#5e5e5e] font-bold m-1 hover:text-[#9086c1] transition-colors duration-200"
                onClick={() => console.log("Archive clicked")}
              >
                <LuArchive />
              </button>
            </div>
          )}
          <button
            className="text-[#5e5e5e] font-bold m-1 hover:text-[#9086c1] transition-colors duration-200"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <TbChevronDown
              className={`transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
      {isCollapsed && (
        <div className="p-2">
          <div>
            {suggestions.length === 0 && (
              <p className="text-[#afaeac] text-md m-2">
                Once Claudy understand what you are thinking about, suggestions
                will appear here.
              </p>
            )}
            {suggestions.length > 0 &&
              suggestions.map((suggestion: any, index: any) => {
                const staggerClass = `stagger-${Math.min(index + 1, 10)}`;
                return (
                  <div
                    key={suggestion.id}
                    className={`slide-down ${staggerClass}`}
                  >
                    <CardFixed
                      title={suggestion.title}
                      description={suggestion.description}
                      icon={suggestion.icon}
                      timeDiff="just now"
                    />
                  </div>
                );
              })}
            <div className=" mx-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Ask Tochan something..."
                  className="shadow-md w-full my-2 p-1 px-2 pr-8 rounded-md bg-[#ffffff] border border-[#f4f4f5] 
                       focus:outline-none focus:ring-2 focus:ring-[#9086c1] focus:ring-opacity-50 
                       focus:border-transparent transition-all duration-200 
                       hover:bg-[#ffffff] hover:border-[#9086c1] text-md text-[#a7a6a6] hover:border-opacity-50 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // <div>testing</div>
  );
};

export default SuggestionFixed;
