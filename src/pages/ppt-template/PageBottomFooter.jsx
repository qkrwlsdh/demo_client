import React from "react";
import { Finhub } from "./Finhub";

export const PageBottomFooter = ({ property1, className }) => {

  return (
    <div
      id="content"
      className={`w-[1920px] h-[100px] relative ${
        property1 === "bottom-detail-2"
          ? "bg-finhubsecondary-3"
          : property1 === "bottom-detail-3"
          ? "bg-neutralnutral"
          : "bg-finhubprimary-color"
      } ${className}`}
    >
      <p
        className={`[font-family:'Open_Sans',Helvetica] tracking-[0] text-[8px] top-[32px] absolute font-normal leading-[14px] ${
          property1 === "bottom-detail-3" ? "w-[1342px]" : property1 === "bottom-detail-1" ? "w-[1324px]" : "w-[1338px]"
        } ${
          property1 === "bottom-detail-3"
            ? "left-[216px]"
            : property1 === "bottom-detail-1"
            ? "left-[222px]"
            : "left-[220px]"
        } ${
          property1 === "bottom-detail-3"
            ? "text-[#7575757a]"
            : property1 === "bottom-detail-1"
            ? "text-[#cdcdcd7a]"
            : "text-[#a5a5a57a]"
        }`}
      >
        이 자료는 대한민국 저작권법의 보호를 받습니다. 작성된 모든 내용의 권리는 작성자에게 있으며, 작성자의 동의 없는
        사용이 금지됩니다. 본 자료의 일부 혹은 전체 내용을 무단으로 복제, 배포하거나 2차적 저작물로 재편집하는 경우 5년
        이하의 징역 또는 5천만원 이하의 벌금과 민사상 손해배상을 청구합니다. 이 자료는 대한민국 저작권법의 보호를
        받습니다. 작성된 모든 내용의 권리는 작성자에게 있으며, 작성자의 동의 없는 사용이 금지됩니다. 본 자료의 일부 혹은
        전체 내용을 무단으로 복제, 배포하거나 2차적 저작물로 재편집하는 경우 5년 이하의 징역 또는 5천만원 이하의 벌금과
        민사상 손해배상을 청구합니다. 이 자료는 대한민국 저작권법의 보호를 받습니다. 작성된 모든 내용의 권리는
        작성자에게 있으며, 작성자의 동의 없는 사용이 금지됩니다. 본 자료의 일부 혹은 전체 내용을 무단으로 복제,
        배포하거나 2차적 저작물로 재편집하는 경우 5년 이하의 징역 또는 5천만원 이하의 벌금과 민사상 손해배상을
        청구합니다.
      </p>
      <div
        className={`[font-family:'SUIT-Regular',Helvetica] w-[20px] left-[1837px] tracking-[0] text-[16px] top-[42px] font-normal text-center leading-[14px] absolute ${
          property1 === "bottom-detail-3" ? "text-finhubsecondary-3" : "text-white"
        }`}
      >
        1
      </div>
      <div
        className={`w-[162px] top-[30px] h-[40px] absolute ${
          property1 === "bottom-detail-1" ? "left-[1608px]" : "left-[1612px]"
        }`}
      >
        <div className="w-[160px] h-[40px] bg-[#f2f2f2] relative">
          <div className="[font-family:'Open_Sans',Helvetica] w-[88px] left-[36px] tracking-[0] text-[14.9px] top-[9px] text-finhubprimary-color absolute font-bold leading-[normal]">
            LOGO HERE
          </div>
        </div>
      </div>
      {property1 === "bottom-detail-1" && (
        <div className="absolute w-[24px] h-[38px] top-[33px] left-[132px]">
          <div className="relative h-[38px]">
            <img
              className="w-[12px] h-[24px] top-[14px] absolute left-0"
              alt="Union"
              src="https://c.animaapp.com/lvQ7FD7L/img/union.svg"
            />
            <img
              className="w-[24px] h-[28px] top-0 absolute left-0"
              alt="Union"
              src="https://c.animaapp.com/lvQ7FD7L/img/union-1.svg"
            />
            <div className="absolute w-[18px] h-[10px] top-[14px] left-[5px] bg-[url(https://c.animaapp.com/lvQ7FD7L/img/rectangle-1603.svg)] bg-[100%_100%]">
              <div className="relative w-[8px] h-[8px] top-px left-[9px] bg-finhubprimary-color rounded-[22.2px] shadow-[0px_0.67px_0.22px_#0000000f,0px_0.67px_1.78px_#00000026,0px_0px_0px_0.22px_#0000000a]" />
            </div>
          </div>
        </div>
      )}

      {["bottom-detail-2", "bottom-detail-3"].includes(property1) && (
        <Finhub className="!absolute bg-[url(https://c.animaapp.com/lvQ7FD7L/img/finhub-1-3@2x.png)] !left-[131px] !top-[33px]" />
      )}
    </div>
  );
};