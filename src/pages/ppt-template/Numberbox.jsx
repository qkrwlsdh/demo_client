import React from "react";

export const Numberbox = ({ className, text = "1-1" }) => {
  return (
    <div className={`relative w-[56px] h-[56px] bg-primaryprimary-06 rounded-[12px] ${className}`}>
      <div className="absolute w-[34px] top-[16px] left-[11px] [font-family:'Open_Sans',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[22px] whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};
