import React from "react";
import Image from "next/image";
import bgr from "../../../public/bgr.png";
import archive from "../../../public/archive.svg";
import rectangle from "../../../public/Rectangle5486.png";
import testApi from "../../api/testApi";
import { useQuery } from "@tanstack/react-query";
export default function ArchiveAssessment(props) {
  const fetchArchiveAssessment = async () => {
    const result = await testApi.getArchiveAssessment();

    return result.data.data.assessments;
  };

  const { listArchiveAssessments, refetch } = useQuery(
    ["archiveAssessment"],
    fetchArchiveAssessment
  );

  const handleUnArchiveAs = () => {
    props.onUnArchive(props.id);
  };
  return (
    <div>
      <div className=" w-[285px] relative left-[94px] top-[68px] h-[285px] border rounded-[16px] border-ink-100 group/item    hover:border-primary-500">
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
          <div className="w-[40px]  group/abc absolute left-[101px] top-[-4px]">
            <Image alt="hinh anh"
              className=" max-w-[24px] hover:cursor-point  group/abc "
              onClick={handleUnArchiveAs}
              src={archive}
            />
            <div className="w-[199px]  font-medium h-[48px] group-hover/abc:visible invisible  absolute left-[37px] top-[-6px]  bg-[#fff] rounded-[8px] z-20  shadow-bong flex items-center justify-center">
              Unarchive assessment
            </div>
          </div>
        </div>
        {/* <Image alt="hinh anh" src={point} className="invisible group-hover/item:visible" /> */}
        <div className="absolute top-[44.72%]  bottom-[8.42%] flex flex-col gap-[8px] left-[18px]">
          {props.date < 1 && (
            <div className="bg-red-300 top-[-31px] absolute py-[4px] px-[8x] w-[71px] h-[28px] rounded-[16px] flex justify-center items-center">
              <h3 className="">End test</h3>
            </div>
          )}
          <h3 className="w-[185px] text-[#6F767E] h-[28px] font-medium text-[20px]">
            {props.name}
          </h3>
          <Image alt="hinh anh" src={rectangle} />
          <p className="text-[#6F767E]">
            Number of participants:{" "}
            <span className="text-[#6F767E] font-semibold">8</span>
          </p>
          <p className="text-[#6F767E]">
            Last activity:{" "}
            <span className="text-[#6F767E] font-semibold">{props.date} days ago</span>
          </p>
        </div>
      </div>
    </div>
  );
}
