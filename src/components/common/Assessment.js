import React from "react";
import bgr from "../../../public/bgr.png";
import conmat from "../../../public/conmat.svg";
import tag from "../../../public/tag.svg";
import archive from "../../../public/archive.svg";
import remove from "../../../public/remove.svg";
import rectangle from "../../../public/Rectangle5486.png";
import iconr from "../../../public/UI icon/arrow_forward/Union.svg";
import xAs from "../../../public/deleteAs.svg";
import { useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import testApi from "../../api/testApi";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { removeAs } from "../../recoil/commonRecoilState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { ListAssessment } from "../../recoil/commonRecoilState";
import Link from "next/link";

export default function Assessment(props) {
  const [fakeId, setFakeId] = useRecoilState(removeAs);
  const router = useRouter();
  const id = router.query.assessment_id;

  const [assessment, setAssessment] = useRecoilState(ListAssessment);

  const [deletePopup, setDeletePopup] = useState(false);

  const handleDeletePopup = () => {
    setDeletePopup(!deletePopup);
  };
  const handleRemoveAs = () => {
    props.onRemove(props.id);
    setDeletePopup(false);
  };
  const handleCopyAs = () => {
    props.onCopy(props.id);
  };

  const handleArchiveAs = () => {
    props.onArchive(props.id);
  };

  return (
    <div>
      {deletePopup && (
        <>
          <div className="z-10 fixed top-0 left-0 bottom-0 h-[1124px] right-0 bg-white-200 opacity-90 "></div>
          <div className="animate-appear-slow w-[480px] h-[247px] fixed left-[35%] top-[153px] bg-[#FFFFFF] rounded-[16px] shadow-bong z-30">
            <div className="flex justify-between w-[480px] h-[86px]">
              <p className="text-[#111315] text-[20px] leading-[28px] mt-[16px] ml-[23px] h-[28px] font-medium">
                Delete assessment
              </p>
              <Image alt="hinh anh"
                src={xAs}
                onClick={() => setDeletePopup(false)}
                className="cursor-pointer w-[14px] h-[14px] text-[#6F767E] mt-[36px] mr-[25px] cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-start w-[480px] h-[64px] py-[8px] px-[24px] gap-[24px]">
              <h3 className="text-[#111315] w-[432px] text-[16px] h-[48px] font-normal ">
                Are you sure you wish to delete this assessment and its content?
              </h3>
            </div>
            <div className="w-[480px] h-[84px] bg-[#FFFFFF] py-[16px] px-[24px] flex gap-[16px] justify-end">
              <button
                onClick={() => setDeletePopup(false)}
                className="bg-[#DEDDDD] w-[89px] h-[40px] rounded-[8px] px-[16px] flex flex-col items-center justify-center"
              >
                <p className="text-[#22313F]">Cancel</p>
              </button>
              <button
                onClick={handleRemoveAs}
                className="bg-[#FFE7E1] w-[89px] h-[40px] rounded-[8px] px-[16px] flex flex-col items-center justify-center"
              >
                <p className="text-[#E90C31] ">Delete</p>
              </button>
            </div>
          </div>
        </>
      )}
      <div className=" relative w-[285px]  h-[285px] border rounded-[16px] border-ink-100 group/item    hover:border-primary-500">
        <div className="overflow-hidden">
          <Image alt="hinh anh"
            className="group-hover/item:scale-[6.5] ease-in-out duration-300 rounded-[13px]"
            src={bgr}
          />
        </div>
        <div
          id="icons"
          className=" absolute  w-[96px] h-[24px] left-[137px] top-[24px] gap-[10px] hidden group-hover/item:flex animate-appear-slow"
        >
          <div className="w-[40px] group/abc">
            <Image alt="hinh anh"
              className=" max-w-[24px] hover:cursor-point  "
              src={conmat}
            />
            <div className="w-[175px] z-20 font-medium group-hover/abc:visible h-[48px] invisible  absolute left-[33px] top-[-6px]  bg-[#fff] rounded-[8px]  shadow-bong flex items-center justify-center">
              View assessment
            </div>
          </div>
          <div className="w-[40px]  group/abc">
            <Image alt="hinh anh"
              className=" max-w-[24px] hover:cursor-point  "
              src={tag}
              onClick={handleCopyAs}
            />

            <div className="w-[191px] z-20 font-medium  h-[48px] group-hover/abc:visible  invisible absolute left-[66px] top-[-6px]  bg-[#fff] rounded-[8px]  shadow-bong flex items-center justify-center">
              Duplicate assessment
            </div>
          </div>
          <div className="w-[40px]  group/abc">
            <Image alt="hinh anh"
              className=" max-w-[24px] hover:cursor-point  "
              onClick={handleArchiveAs}
              src={archive}
            />
            <div className="w-[175px] z-20 font-medium h-[48px] group-hover/abc:visible invisible  absolute left-[103px] top-[-6px]  bg-[#fff] rounded-[8px]  shadow-bong flex items-center justify-center">
              Archive assessment
            </div>
          </div>
          <div className="w-[40px]  group/abc">
            <Image alt="hinh anh"
              className=" max-w-[24px] hover:cursor-point "
              src={remove}
              onClick={handleDeletePopup}
            />

            <div className="w-[175px] z-20  font-medium h-[48px] group-hover/abc:visible invisible  absolute left-[135px] top-[-5px]  bg-[#fff] rounded-[8px]  shadow-bong flex items-center justify-center">
              Delete assessment
            </div>
          </div>
        </div>
        {/* <Image alt="hinh anh" src={point} className="invisible group-hover/item:visible" /> */}

        <>
          <div className="absolute top-[44.72%] left-[17px]  bottom-[8.42%] flex flex-col gap-[8px]">
            {props.date < 1 && (
              <div className="bg-red-300 top-[-31px] absolute py-[4px] px-[8x] w-[71px] h-[28px] rounded-[16px] flex justify-center items-center">
                <h3 className="">End test</h3>
              </div>
            )}
            <h3 className=" h-[28px] font-medium text-[20px]">{props.name}</h3>
            <Image alt="hinh anh" src={rectangle} />
            <p className="text-[#6F767E]">
              Number of participants:{" "}
              <span className="text-[#111315] font-semibold">8</span>
            </p>
            <p className="text-[#6F767E]">
              Last activity:{" "}
              <span className="text-[#111315] font-semibold">
                {props.date} days
              </span>
            </p>
            <Link href={`/dashboard/${props.id}`}>
              <button className="flex py-[4px] pr-[12px]">
                <p className="text-[#009DBE] font-medium w-[55px] h-[24px] ">
                  Details
                </p>
                <Image alt="hinh anh"
                  src={iconr}
                  className="absolute left-[68px]  top-[118px] "
                />
              </button>
            </Link>
          </div>
        </>
      </div>
    </div>
  );
}
