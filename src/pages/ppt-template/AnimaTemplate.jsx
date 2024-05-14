import React from "react";
import { Numberbox } from "./Numberbox";
import { PageBottomFooter } from "./PageBottomFooter";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

export default function AnimaTemplate() {

  const printDocument = async () => {
    const input = document.getElementById('content');
    const imgElements = input.querySelectorAll('img');

    domtoimage.toPng(input)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = function() {
          const pdfWidth = 1920;
          const pdfHeight = 1080;
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [pdfWidth, pdfHeight]
          });
          pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save("template1.pdf");
        };
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  return (
    <div id="content" className="bg-[#f6faf9] flex flex-row justify-center w-full">
      <div className="bg-[#f6faf9] overflow-hidden w-[1920px] h-[1080px] relative">
        <div className="absolute w-[1924px] h-[320px] top-0 left-0">
          <div className="absolute w-[1924px] h-[320px] top-0 left-0">
            <div className="relative w-[1920px] h-[320px] bg-finhubprimary-color">
              <img
                className="absolute w-[1920px] h-[270px] top-[31px] left-0"
                alt="Mask group"
                src="https://c.animaapp.com/lvQ7FD7L/img/mask-group.png"
              />
              <div onClick={printDocument} className="absolute top-[146px] left-[248px] [font-family:'Open_Sans',Helvetica] font-semibold text-white text-[56px] tracking-[0] leading-[normal] cursor-pointer">
                클라우드인프라
              </div>
              <div className="absolute w-[361px] top-[120px] left-[248px] [font-family:'Open_Sans',Helvetica] font-normal text-[#d7d7ff] text-[16px] tracking-[0] leading-[normal]">
                물적현황 I 전산기기목록
              </div>
            </div>
          </div>
          <Numberbox className="!absolute !left-[152px] !top-[155px]" text="1-2" />
        </div>
        <div className="absolute w-[238px] h-[238px] top-[732px] left-[152px] bg-white rounded-[18.94px] shadow-[0px_3.79px_18.94px_#13131326]">
          <p className="absolute top-[77px] left-[23px] [font-family:'Open_Sans',Helvetica] font-normal text-[#505050] text-[15px] tracking-[0] leading-[37.9px]">
            - 장애관제 평가​
            <br />
            - 비상연락망 가동 평가​
            <br />
            - 비상대책조직 가동평가 ​
          </p>
          <div className="top-[19px] left-[69px] font-semibold text-finhubprimary-color text-[18px] leading-[39.8px] whitespace-nowrap absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            상황발생확인
          </div>
        </div>
        <div className="absolute w-[238px] h-[238px] top-[732px] left-[428px] bg-white rounded-[18.94px] shadow-[0px_3.79px_18.94px_#13131326]">
          <p className="absolute top-[77px] left-[23px] [font-family:'Open_Sans',Helvetica] font-normal text-[#505050] text-[15px] tracking-[0] leading-[37.9px]">
            - 장애관제 평가​
            <br />
            - 비상연락망 가동 평가​
            <br />
            - 비상대책조직 가동평가 ​
          </p>
          <div className="top-[19px] left-[74px] font-semibold text-finhubprimary-color text-[18px] leading-[39.8px] whitespace-nowrap absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            상황발생확인
          </div>
        </div>
        <div className="absolute w-[238px] h-[238px] top-[732px] left-[703px] bg-white rounded-[18.94px] shadow-[0px_3.79px_18.94px_#13131326]">
          <p className="top-[77px] left-[25px] font-normal text-[#505050] text-[15px] leading-[37.9px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            - 장애관제 평가​
            <br />
            - 비상연락망 가동 평가​
            <br />
            - 비상대책조직 가동평가 ​
          </p>
          <div className="top-[19px] left-[74px] font-semibold text-finhubprimary-color text-[18px] leading-[39.8px] whitespace-nowrap absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            상황발생확인
          </div>
        </div>
        <div className="absolute w-[238px] h-[238px] top-[732px] left-[979px] bg-white rounded-[18.94px] shadow-[0px_3.79px_18.94px_#13131326]">
          <p className="top-[77px] left-[27px] font-normal text-[#505050] text-[15px] leading-[37.9px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            - 장애관제 평가​
            <br />
            - 비상연락망 가동 평가​
            <br />
            - 비상대책조직 가동평가 ​
          </p>
          <div className="top-[19px] left-[74px] font-semibold text-finhubprimary-color text-[18px] leading-[39.8px] whitespace-nowrap absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            상황발생확인
          </div>
        </div>
        <div className="absolute w-[238px] h-[238px] top-[732px] left-[1255px] bg-white rounded-[18.94px] shadow-[0px_3.79px_18.94px_#13131326]">
          <p className="top-[77px] left-[28px] font-normal text-[#505050] text-[15px] leading-[37.9px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            - 장애관제 평가​
            <br />
            - 비상연락망 가동 평가​
            <br />
            - 비상대책조직 가동평가 ​
          </p>
          <div className="top-[19px] left-[74px] font-semibold text-finhubprimary-color text-[18px] leading-[39.8px] whitespace-nowrap absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            상황발생확인
          </div>
        </div>
        <div className="absolute w-[238px] h-[238px] top-[732px] left-[1530px] bg-white rounded-[18.94px] shadow-[0px_3.79px_18.94px_#13131326]">
          <p className="top-[77px] left-[30px] font-normal text-[#505050] text-[15px] leading-[37.9px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            - 장애관제 평가​
            <br />
            - 비상연락망 가동 평가​
            <br />
            - 비상대책조직 가동평가 ​
          </p>
          <div className="top-[19px] left-[74px] font-semibold text-finhubprimary-color text-[18px] leading-[39.8px] whitespace-nowrap absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
            상황발생확인
          </div>
        </div>
        <div className="top-[370px] left-[248px] font-semibold text-[#505050] text-[24px] leading-[normal] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
          목적
        </div>
        <div className="absolute w-[584px] h-[315px] top-[372px] left-[1184px] bg-finhubprimary-color rounded-[20px] shadow-[inset_0px_4px_20px_#13131326]">
          <div className="relative w-[480px] h-[223px] top-[50px] left-[56px]">
            <div className="w-[472px] top-[47px] left-0 font-semibold text-[#e8e8ff] text-[18px] leading-[48px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
              모의훈련 실행부서&nbsp;&nbsp;: 비상대책조직(비상대책조직 구성 참조)​
            </div>
            <div className="w-[472px] top-[111px] left-0 font-semibold text-[#e8e8ff] text-[18px] leading-[48px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
              모의훈련일&nbsp;&nbsp;: 1회/년
            </div>
            <p className="w-[472px] top-[175px] left-0 font-semibold text-[#e8e8ff] text-[18px] leading-[48px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
              모의훈련 대응절차 및 평가 (장애업무처리절차 참조)​
            </p>
            <div className="w-[472px] top-0 left-0 font-semibold text-[#e8e8ff] text-[18px] leading-[normal] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
              주관부서&nbsp;&nbsp;:&nbsp;&nbsp;감사조직
            </div>
          </div>
        </div>
        <img
          className="left-[390px] absolute w-[38px] h-[8px] top-[847px]"
          alt="Line"
          src="https://c.animaapp.com/lvQ7FD7L/img/line-68.svg"
        />
        <img
          className="left-[665px] absolute w-[38px] h-[8px] top-[847px]"
          alt="Line"
          src="https://c.animaapp.com/lvQ7FD7L/img/line-69.svg"
        />
        <img
          className="left-[941px] absolute w-[38px] h-[8px] top-[847px]"
          alt="Line"
          src="https://c.animaapp.com/lvQ7FD7L/img/line-70.svg"
        />
        <img
          className="left-[1217px] absolute w-[38px] h-[8px] top-[847px]"
          alt="Line"
          src="https://c.animaapp.com/lvQ7FD7L/img/line-71.svg"
        />
        <img
          className="left-[1492px] absolute w-[38px] h-[8px] top-[847px]"
          alt="Line"
          src="https://c.animaapp.com/lvQ7FD7L/img/line-72.svg"
        />
        <PageBottomFooter className="!absolute !left-0 !top-[980px]" property1="bottom-detail-3" />
        <p className="w-[895px] top-[435px] left-[248px] font-semibold text-transparent text-[18px] leading-[28px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
          <span className="text-[#505050]">1. 장애사항 발생 시 </span>
          <span className="text-[#766fff]">대응체계를 점검하고 개선∙보안 사항을 확인하여</span>
          <span className="text-[#505050]"> 효율적인 대응체계를 마련함​</span>
        </p>
        <p className="w-[895px] top-[495px] left-[248px] font-semibold text-transparent text-[18px] leading-[28px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
          <span className="text-[#505050]">1. 장애사항 발생 시 </span>
          <span className="text-[#766fff]">대응체계를 점검하고 개선∙보안 사항을 확인하여</span>
          <span className="text-[#505050]"> 효율적인 대응체계를 마련함​</span>
        </p>
        <p className="w-[895px] top-[555px] left-[248px] font-semibold text-transparent text-[18px] leading-[28px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
          <span className="text-[#505050]">1. 장애사항 발생 시 </span>
          <span className="text-[#766fff]">대응체계를 점검하고 개선∙보안 사항을 확인하여</span>
          <span className="text-[#505050]"> 효율적인 대응체계를 마련함​</span>
        </p>
        <p className="w-[895px] top-[615px] left-[248px] font-semibold text-transparent text-[18px] leading-[28px] absolute [font-family:'Open_Sans',Helvetica] tracking-[0]">
          <span className="text-[#505050]">1. 장애사항 발생 시 </span>
          <span className="text-[#766fff]">대응체계를 점검하고 개선∙보안 사항을 확인하여</span>
          <span className="text-[#505050]"> 효율적인 대응체계를 마련함​</span>
        </p>
      </div>
    </div>
  );
};
