import React from "react";
import arrow_left from "../../public/arrow-left.svg";
import filled from "../../public/filled.svg";
import bachamdoc from "../../public/bachamdoc.svg";
import upload from "../../public/upload.svg";
import gachmau from "../../public/gachmau.png";
import rectangle from "../../public/Rectangle.jpg";
import Image from "next/image";
import { useState } from "react";
import xAs from "../../public/Comment.svg";
import copy from "../../public/copy.svg";

export default function index() {
  const [block, setBlock] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="mt-[5rem] py-0 px-[48px] flex justify-between">
        <div className="w-[447px] h-[48px] flex justify-between">
          <Image alt="hinh anh" src={arrow_left} />
          <div className="w-[394px] h-[48px]">
            <h3 className="w-[277px] h-[28px] font-medium font-[20px] font-medium">
              Assessment for UX Designer
            </h3>
            <div className="flex w-[388px] h-[48px]">
              <h3 className="w-[31px] h-[16px] mr-2 text-[#6F767E] text-[12px]">
                date:
              </h3>
              <h3 className="w-[388px] text-[12px] font-normal h-[16px] text-[#111315]">
                From 03 March 2022 to 20 March 2022 • 18 days
              </h3>
            </div>
          </div>
        </div>
        <div
          onClick={() => setBlock(!block)}
          className="flex gap-2 items-center cursor-pointer"
        >
          <div className="w-[263px] h-[44px] bg-[#009DBE] rounded-[8px] gap-[13px] flex justify-center items-center">
            <Image alt="hinh anh" src={filled} />
            <p className="font-medium text-[#fff]">Invite participants</p>
          </div>
          <Image alt="hinh anh" src={bachamdoc} />
        </div>
        {block && (
          <div className="w-[263px] h-[112px] bg-[#fff] shadow-bong rounded-[16px] flex flex-col justify-start absolute right-[100px] top-[233px]">
            <button
              onClick={() => setVisible(true)}
              className="w-[130px] h-[56px] ml-2"
            >
              Invite applicants
            </button>
            <button className="w-[130px] h-[56px] ml-2">
              Invite employees
            </button>
          </div>
        )}
      </div>
      <Image alt="hinh anh" src={gachmau} className="mt-3" />
      <div className="w-[1222px] h-[124px] mx-[48px] mt-[21px]">
        <h3 className="font-medium h-[28px] text-[20px]">Included tests</h3>
        <div className="w-[1166px] h-[84px] flex gap-[12px] ">
          <div className="w-[213.33px] h-[84px] bg-[#fff] rounded-[8px] p-[12px] border border-[#DEDDDD] mt-[13px]">
            <h3>Verbal challenge</h3>
            <h3 className="mt-[13px]">60s</h3>
          </div>
        </div>
        <div className="w-[1222px]  h-[500px] bg-[#FFFFFF] border border-[#DEDDDD] rounded-[16px] my-[56px] flex justify-center items-center">
          <div className="w-[400px] h-[408px] flex flex-col gap-[8px] items-center">
            <Image alt="hinh anh" src={rectangle} />
            <h3 className="font-medium">
              It looks like you haven’t added any candidate
            </h3>
            <p className="text-ink-100 text-center">
              {" "}
              Invite your candidates to do the assessment and track their
              responses here.
            </p>
          </div>
        </div>
      </div>
      {visible && (
        <>
          <div className="z-10 fixed top-0 left-0 bottom-0 h-[1124px] right-0 bg-white-200 opacity-90 "></div>
          <div className=" pt-[17px] animate-appear-slow w-[800px] h-[477px] fixed left-[15%] top-[75px] bg-[#FFFFFF] rounded-[8px] shadow-bong z-30">
            <div className="flex justify-between w-[752px] h-[44px] mx-[22px] mt-[22px] items-center">
              <p className="text-[#111315] text-[32px] leading-[44px] w-[293px] h-[44px] font-semibold">
                Invite participants
              </p>
              <Image alt="hinh anh"
                src={xAs}
                onClick={() => setVisible(false)}
                className="cursor-pointer w-[40px] h-[40px] text-[#6F767E]  cursor-pointer"
              />
            </div>
            <div className="mx-[22px] mt-[30px] flex gap-[13px]">
              <input
                placeholder="Enter email, seperated by comma"
                className="w-[600px] h-[56px] bg-[#fff] rounded-[8px] border border-[#DEDDDD] py-[12px] pr-[12px] pl-[16px]"
              />
              <button className="bg-[#009DBE] rounded-[8px] w-[140px] h-[56px] flex justify-center items-center">
                <p className="text-[#fff] font-medium">Send invite</p>
              </button>
            </div>
            <div className=" mx-[22px] mt-[30px] flex flex-col gap-[8px] mt-[74px]">
              <h3 className="font-medium">Share your assessment link</h3>
              <button className="text-[#6F767E] w-[752px] flex justify-between h-[56px] bg-[#fff] rounded-[8px] border border-[#DEDDDD] py-[12px] pr-[12px] pl-[16px]">
                <h3 className="text-[#6F767E] text-left">
                  pytalent.cpom/test/13245
                </h3>
                <div className="flex gap-[8px]">
                  <h3 className="text-[#009DBE] font-medium">Copy link </h3>
                  <Image alt="hinh anh" src={copy} />
                </div>
              </button>
              <h3 className="text-[12px] text-[#6F767E]">
                Only invited participants could assess the test
              </h3>
            </div>
            <div className="mx-[22px] mt-[30px] flex items-center">
              <p className="w-[362px] font-medium text-[#6F767E]">
                You can also import excel file for bulk list of email
              </p>
              <button className="py-[4px] px-[12px] w-[153px] h-[37px] border border-[#66C4D8] rounded-[8px] flex gap-[8px] items-center">
                <h3 className="text-[#009DBE] font-medium">Upload here</h3>
                <Image alt="hinh anh" src={upload} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
