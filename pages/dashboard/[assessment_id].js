import React, { useEffect } from "react";
import arrow_left from "../../public/arrow-left.svg";
import filled from "../../public/filled.svg";
import bachamdoc from "../../public/bachamdoc.svg";
import upload from "../../public/upload.svg";
import edit from "../../public/edit.svg";
import removeAs from "../../public/tag11.svg";
import archive from "../../public/archive11.svg";
import gachmau from "../../public/gachmau.png";
import rectangle from "../../public/Rectangle.jpg";
import x from "../../public/Union.png";
import xDetail from "../../public/xDetail.svg";
import Image from "next/image";
import { useState, useRef } from "react";
import xAs from "../../public/Comment.svg";
import copy from "../../public/copy.svg";
import testApi from "../../src/api/testApi";
import { useQuery } from "@tanstack/react-query";
import { DetailAssessment } from "../../src/recoil/commonRecoilState";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { useLoading } from "../../src/hooks/useLoading";
import EditAs from "../../src/components/common/EditAs";
import { datesFormat } from "../../src/components/inputFill/getDateAsId";
import { daysFormat } from "../../src/components/inputFill/getDay";
import { countDate } from "../../src/recoil/commonRecoilState";


export default function detail() {
  const [target, setTarger] = useRecoilState(countDate)
  const router = useRouter();
  const [block, setBlock] = useState(false);
  const [block1, setBlock1] = useState(false);
  const [block3, setBlock3] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checkBtn, setCheckBtn] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);

  const [arr, setArr] = useState([]);
  const [editAs, setEditAs] = useState([]);
  const [tags, setTags] = useState([]);
  const id = router.query.assessment_id;


  const fetchDetailAssessment = async () => {
    const result = await testApi.getDetailAssessment(id);
    setArr(result.data.data.assessment.games);
    setEditAs(result.data.data.assessment);
    return result.data.data.assessment;
  };

  const listDetailAssessments = useQuery(
    ["detailAssessment"],
    fetchDetailAssessment,
    {
      enabled: id > 0,
    }
  );

  const listAssessments = useQuery(["assessment"], testApi.getAssessment());
  const listArchiveAssessments = useQuery(
    ["archiveAssessment"],
    testApi.getArchiveAssessment()
  );



  const inviteMutations = useMutation((data) => {
    return testApi.getInviteCadidate(data);
  });
  useLoading(inviteMutations.isLoading);

  const checkEmail = (email) => {
    const check =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.match(check)) {
      setCheckBtn(true);
    } else {
      setCheckBtn(false);

    }
  };

  const handleKeyDow = (e) => {
    if (e.keyCode === 32 && e.target.value !== "" && e.target.value.trim()) {
      setTags([...tags, e.target.value]);
      checkEmail(e.target.value);
      e.target.value = "";
    }
  };

  const handleRemoveTag = (i) => {
    const a = tags.filter((t, index) => !(index === i));
    setTags(a);
  };

  const handleInvite = () => {
    const inviteAs = {
      list_email: tags,
      assessment_id: id,
      type: 1,
    };
    inviteMutations.mutate(inviteAs, {
      onSuccess: (response) => {
        setVisible(false);

      },
    });
  };

  const handleEditAd = (
    id,
    name,
    job_function,
    start_date,
    end_date,
    job_position
  ) => {
    listDetailAssessments.refetch();
    listAssessments.refetch()

    setBlock3(false);
    setTarger(target + 1)
  };

  const handleClose = () => {
    setDeleteModal(false);
  }

  const mutationsUnArchive = useMutation((data) => {
    return testApi.getPostArchive(data);
  });
  const deleteMutations = useMutation((data) => {
    return testApi.getDeleteAssessment(data);
  });
  useLoading(mutationsUnArchive.isLoading);
  useLoading(deleteMutations.isLoading);

  const handleDeleteModal = () => {
    const idPost = {
      assessment_id: id,

    };
    deleteMutations.mutate(idPost, {
      onSuccess: (response) => {
        router.push('/dashboard')
        listAssessments.refetch();

      },
      onError: (error) => {
        console.log(error);
      },
    });
  };



  const handleArchiveModal = () => {

    const unArchiveAs = {
      assessment_id: id,
    };

    mutationsUnArchive.mutate(unArchiveAs, {
      onSuccess: (response) => {
        router.push('/dashboard')
        listAssessments.refetch();
        listArchiveAssessments.refetch();
      },
    });
  }

  return (
    <>
      <div className="mt-[5rem] py-0 px-[48px] flex justify-between">
        {editAs && (
          <div
            onClick={() => router.push("/dashboard")}
            className="w-[447px] h-[48px] flex justify-between cursor-pointer"
          >
            <Image alt="hinh anh" src={arrow_left} />
            <div className="w-[394px] h-[48px]">
              <h3 className="w-[277px] h-[28px]  text-[20px] font-semibold">
                {editAs.name}
              </h3>
              <div className="flex w-[388px] h-[48px]">
                <h3 className="w-[31px] h-[16px] mr-2 text-[#6F767E] text-[12px]">
                  date:
                </h3>
                <h3 className="w-[388px] text-[12px] font-normal h-[16px] text-[#111315]">
                  From{" "}
                  {editAs.start_date && datesFormat(editAs.start_date) + " "}
                  to {+" " + editAs.end_date &&
                    datesFormat(editAs.end_date)} •{" "}
                  {editAs.end_date && daysFormat(editAs.end_date) + " "}
                  days
                </h3>
              </div>
            </div>
          </div>
        )}

        <div
          onClick={() => setBlock(!block)}
          className="flex gap-2 items-center cursor-pointer"
        >
          <div className="w-[263px] h-[44px] bg-[#009DBE] rounded-[8px] gap-[13px] flex justify-center items-center">
            <Image alt="hinh anh" src={filled} />
            <p className="font-medium text-[#fff]">Invite participants</p>
          </div>
          <Image alt="hinh anh" src={bachamdoc} onClick={() => setBlock1(!block1)} />
        </div>
        {block && (
          <div className="w-[263px] h-[112px] bg-[#fff] shadow-bong rounded-[16px] flex flex-col justify-start absolute right-[100px] top-[233px]">
            <button onClick={() => setVisible(true)} className=" h-[56px] ml-2">
              Invite applicants
            </button>
            <button className=" h-[56px] ml-2">Invite employees</button>
          </div>
        )}
        {block1 && (
          <div className="w-[393px] h-[168px] bg-[#fff] shadow-bong rounded-[16px] flex flex-col justify-start absolute right-[61px] top-[239px]">
            <ul>
              <li
                onClick={() => setBlock3(!block3)}
                className="py-[16px] pr-[10px] pl-[16px] flex gap-[12px] cursor-pointer hover:bg-[#F2F9FF]"
              >
                <Image alt="hinh anh" src={edit} />
                <h3 className="">Edit assessment</h3>
              </li>
              <li
                onClick={() => setDeleteModal(!deleteModal)}
                className="py-[16px] pr-[10px] pl-[16px] flex gap-[12px] cursor-pointer hover:bg-[#F2F9FF]">
                <Image alt="hinh anh" src={removeAs} />
                <h3 className="">Delete assessment</h3>
              </li>
              <li
                onClick={() => setArchiveModal(!archiveModal)}
                className="py-[16px] pr-[10px] pl-[16px] flex gap-[12px] cursor-pointer hover:bg-[#F2F9FF]">
                <Image alt="hinh anh" src={archive} />
                <h3 className="">Archive assessment</h3>
              </li>
            </ul>
          </div>
        )}
      </div>

      {block3 && (
        <>
          <div className=" z-10 fixed top-0 left-0 bottom-0 h-[1124px] right-0 bg-white-200 opacity-90 "></div>
          <div className="animate-appear-slow z-20 w-[726px] h-auto  bg-[#fff] rounded-[16px] shadow-bong absolute left-[22%]  2xl:top-[18%] p-[24px] ">
            <div className="flex justify-between">
              <h3 className="text-[37px] leading-[44px] font-semibold ">
                Edit your assessment
              </h3>
              <button
                onClick={() => setBlock3(false)}
                className=" w-[40px] h-[40px] bg-[#EFEFEF] rounded-[36px] items-center flex justify-center"
              >
                <Image alt="hinh anh" src={x} />
              </button>
            </div>

            <>
              <EditAs
                key={editAs.id}
                name={editAs.name}
                position={editAs.job_position}
                function={editAs.job_function}
                start_date={editAs.start_date}
                end_date={editAs.end_date}
                onEditAs={handleEditAd}
              />
            </>
          </div>
        </>
      )}

      <Image alt="hinh anh" src={gachmau} className="mt-3" />
      <div className="w-[1334px] h-[124px] mx-[48px] mt-[21px]">
        <h3 className="font-semibold h-[28px] text-[20px]">Included tests</h3>
        <div
          style={arr.length > 3 ? { justifyContent: `space-between` } : {}}
          className="w-[1328px] h-[84px] flex gap-[12px] "
        >
          {arr.map((item) => (
            <div
              style={arr.length > 3 ? { flex: `1` } : {}}
              className="w-[213.33px] h-[84px] bg-[#fff] rounded-[8px] p-[12px] border border-[#DEDDDD] mt-[13px]"
            >
              <h3 className="w-[179px]">{item.name}</h3>
              <h3 className="mt-[13px]">{item.time}s</h3>
            </div>
          ))}
        </div>
        <div className="w-[1330px]  h-[500px] bg-[#FFFFFF] border border-[#DEDDDD] rounded-[16px] my-[56px] flex justify-center items-center">
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
          <div className="z-10 h-auto fixed top-0 left-0 bottom-0  right-0 bg-white-200 opacity-90 "></div>
          <div className=" pt-[17px] animate-appear-slow w-[800px] h-[477px] fixed left-0 top-0 translate-x-[50%] translate-y-[50%] bg-[#FFFFFF] rounded-[8px] shadow-bong z-30">
            <div className="flex justify-between w-[752px] h-[44px] mx-[22px] mt-[22px] items-center">
              <p className="text-[#111315] text-[32px]  leading-[44px]  h-[44px] font-semibold">
                Invite participants
              </p>
              <Image alt="hinh anh"
                src={xAs}
                onClick={() => setVisible(false)}
                className=" w-[40px] h-[40px] text-[#6F767E]  cursor-pointer"
              />
            </div>
            <div className="mx-[22px] mt-[30px] flex gap-[13px] ">
              <div className="flex flex-wrap h-auto  w-[600px] outline-none gap-[9px] bg-[#fff] rounded-[8px] border border-[#DEDDDD] py-[12px] pr-[12px] pl-[16px]">
                {tags.map((tag, index) => (
                  <>
                    <ul
                      style={
                        !tag.includes("@gmail.com") && !tag.includes("@paditech.com")
                          ? { border: "1px solid red" }
                          : {}
                      }
                      className="bg-[#F4F4F4] flex py-[4px] px-[15px] rounded-[16px]  h-[32px] gap-[16px] items-center"
                    >
                      <li key={index} className="">
                        {tag}
                      </li>
                      <Image alt="hinh anh"
                        src={xAs}
                        className="w-[20px] h-[20px] text-[#6F767E]  cursor-pointer"
                        onClick={() => handleRemoveTag(index)}
                      />
                    </ul>
                  </>
                ))}

                <input
                  onKeyUp={handleKeyDow}
                  type="email"
                  placeholder={
                    tags.length === 0 && "Enter email, seperated by comma"
                  }
                  className="outline-none grow"
                />
              </div>
              <button
                onClick={handleInvite}
                style={!checkBtn ? { background: "#f5f5f5" } : {}}
                className={`bg-[#009DBE] rounded-[8px] w-[140px] h-[56px] flex justify-center items-center`}
              >
                <p className="text-[#fff] font-medium">Send invite</p>
              </button>
            </div>
            <div className=" mx-[22px]  flex flex-col gap-[8px] mt-[74px]">
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
              <p className="w-[413px] font-medium text-[#6F767E]">
                You can also import excel file for bulk list of email
              </p>
              <button className="py-[4px] pl-[12px] w-[153px] h-[37px] border border-[#66C4D8] rounded-[8px] flex gap-[8px] items-center">
                <h3 className="text-[#009DBE] font-medium">Upload here</h3>
                <Image alt="hinh anh" src={upload} />
              </button>
            </div>
          </div>
        </>
      )}
      {deleteModal &&

        <>
          <div className="z-10 fixed top-0 left-0 bottom-0 h-[1124px] right-0 bg-white-200 opacity-90 "></div>
          <div className="animate-appear-slow w-[501px] h-[182px] fixed left-[33%] top-[363px] bg-[#FFFFFF] rounded-[16px] shadow-bong z-30">
            <div className="flex justify-between w-[518px] h-[70px]">
              <p className="text-[#111315] text-[20px] leading-[28px] mt-[16px] ml-[23px] h-[28px] font-medium">
                You are about to delete an assessment
              </p>
              <Image alt="hinh anh"
                src={xDetail}
                onClick={handleClose}
                className="cursor-pointer w-[14px] h-[14px] text-[#6F767E] mt-[14px] mr-[42px] cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-start w-[480px] h-[64px] py-[8px] px-[24px] gap-[24px]">
              <h3 className="text-[#111315] w-[432px] text-[16px] h-[48px] font-normal ">
                Deleting a project permanently removes all result
              </h3>
            </div>
            <div className="w-[480px] bg-[#FFFFFF]  px-[24px] flex gap-[16px] justify-end">
              <button
                onClick={handleClose}
                className="bg-[#DEDDDD]  h-[40px] rounded-[8px] px-[16px] flex flex-col items-center justify-center"
              >
                <p className="text-[#22313F]">No, go back</p>
              </button>
              <button
                onClick={handleDeleteModal}
                className="bg-[#FFE7E1]  h-[40px] rounded-[8px] px-[16px] flex flex-col items-center justify-center"
              >
                <p className="text-[#E90C31] ">Yes, delete it</p>
              </button>
            </div>
          </div>
        </>
      }
      {archiveModal &&

        <>
          <div className="z-10 fixed top-0 left-0 bottom-0 h-[1124px] right-0 bg-white-200 opacity-90 "></div>
          <div className="animate-appear-slow w-[480px] h-[262px] fixed left-[33%] top-[363px] bg-[#FFFFFF] rounded-[16px] shadow-bong z-30">
            <div className="flex justify-between w-[518px] h-[90px]">
              <p className="text-[#111315] text-[20px] leading-[28px] mt-[16px] ml-[23px] h-[28px] font-medium">
                Are you sure you want to archive this project
              </p>
              <Image alt="hinh anh"
                src={xDetail}
                onClick={() => setArchiveModal(false)}
                className="cursor-pointer w-[14px] h-[14px] text-[#6F767E] mt-[39px] mr-[60px] cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-start w-[480px] h-[85px] py-[8px] px-[24px] gap-[24px]">
              <h3 className="text-[#111315] w-[432px] text-[16px] h-[48px] font-normal ">
                If you archie this project, all participants will lose access to it. We will safely keep it for you in case you want to restore
              </h3>
            </div>
            <div className="w-[480px] bg-[#FFFFFF] mt-[12px]  px-[24px] flex gap-[16px] justify-end">
              <button
                onClick={() => setArchiveModal(false)}

                className="bg-[#DEDDDD]  h-[40px] rounded-[8px] px-[16px] flex flex-col items-center justify-center"
              >
                <p className="text-[#22313F]">No, go back</p>
              </button>
              <button
                onClick={handleArchiveModal}
                className="bg-[#FFE7E1]  h-[40px] rounded-[8px] px-[16px] flex flex-col items-center justify-center"
              >
                <p className="text-[#E90C31] ">Yes, archive it</p>
              </button>
            </div>
          </div>
        </>
      }
    </>
  );
}
