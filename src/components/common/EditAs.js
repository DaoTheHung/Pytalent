import React from "react";
import x from "../../../public/Union.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import date from "../../../public/date.svg";
import down from "../../../public/down.svg";
import arrowPst from "../../../public/Arrowpst.svg";
import check from "../../../public/check.svg";
import { useLoading } from "../../hooks/useLoading";
import DatePicker from "react-datepicker";
import { getDates } from "../inputFill/getDate";
import testApi from "../../api/testApi";
import { datesFormat } from "../inputFill/getDateAsId";
import { countDate } from "../../recoil/commonRecoilState";
import { useRecoilValue } from "recoil";


export default function EditAs(props) {
  const router = useRouter();
  const [type1, setType1] = useState("");
  const [valueStartDate, setValueStartDate] = useState("");
  const [valueEndDate, setValueEndDate] = useState("");
  const [valueDateAll, setValueDateAll] = useState("");
  const [name, setName] = useState(props.name);
  const [type, setType] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [blockDate, setBlockDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const target = useRecoilValue(countDate);


  const id = router.query.assessment_id;

  const onChangeStartDate = (e) => {
    setValueStartDate(getDates(startDate));
    setStartDate(e);
  };
  const onChangeEndDate = (e) => {
    setValueEndDate(getDates(endDate));
    setEndDate(e);
  };
  const handleGetDate = () => {
    setValueDateAll(valueStartDate + " - " + valueEndDate);
    setBlockDate(false);

  };
  const [list1, setList1] = useState([
    {
      id: 1,
      name: "C-level executive",
      url: arrowPst,
    },
    {
      id: 2,
      name: "Director",
      url: arrowPst,
    },
    {
      id: 3,
      name: "Manager",
      url: arrowPst,
    },
    {
      id: 4,
      name: "Junior / Trainee",
      url: arrowPst,
    },
    {
      id: 5,
      name: "Intern",
      url: arrowPst,
    },
  ]);
  const [list, setList] = useState([
    {
      id: 1,
      name: "Junior",
      check: false,
    },
    {
      id: 2,
      name: "Senior",
      check: false,
    },
    {
      id: 3,
      name: "Lead",
      check: false,
    },
    {
      id: 4,
      name: "Manager",
      check: false,
    },
  ]);

  const editMutations = useMutation((data) => {
    return testApi.getEditAssessmennt(data);
  });
  useLoading(editMutations.isLoading);

  const handleEditAs = (e) => {


    const data = {
      assessment_id: id,
      name: name || props.name,
      job_function: type1 || props.function,
      start_date: valueStartDate || props.start_date,
      end_date: valueEndDate || props.end_Date,
      job_position: type || props.position,
    };


    props.onEditAs();
    editMutations.mutate(data, {
      onSuccess: (response) => {

      },
      onError: (error) => {

      }
    });

  };



  return (
    <div>
      <div className="mt-[40px]">
        <div className="mb-5  font-semibold leading-[24px]">
          <div className="flex w-[678px] h-[auto] flex-col items-start p-0 gap-[24px]  gap-34px">
            <div className=" w-[357px]">
              <h3 className="font-medium text-[19px] leading-[24px]  h-[24px] mb-[6px]">
                Your assessment name <span className="text-red-500">*</span>
              </h3>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border text-black  w-[401px] py-[12px] rounded-[8px] outline-none px-[12px] font-normal "
              />
            </div>

            <div className=" w-[357px]">
              <h3 className="font-medium text-[19px] leading-[24px] w-[588px] h-[24px] mb-[6px]">
                Select the job role below to get recommendations for tests{" "}
                <span className="text-red-500">*</span>
              </h3>
              <button
                onClick={() => setVisible1(!visible1)}
                type="button"
                className="
                w-[401px]
                h-[52px]
                pl-[12px]
                pr-[38px]
                py-[12px]
                font-normal
                outline-none
                border border-solid
                rounded-[8px]
                block
                text-left
                relative
                "
              >
                <>
                  {type && type1 ? (
                    <h3 className="text-[#111315]">{type + " - " + type1}</h3>
                  ) : (
                    <h3 className="text-[#111315]">
                      {props.position + "-" + props.function}
                    </h3>
                  )}
                </>
                <Image alt="hinh anh"
                  src={down}
                  className="absolute top-[20px]  left-[371px]"
                />
              </button>
              {/* {requirePst && (
                        <span className="text-red-500 font-normal">
                          Complete this field to create assessment
                        </span>
                      )} */}
              {visible1 && (
                <>
                  <div className="bg-[#fff] right-[139px] w-[403px] top-[319px] h-auto shadow-bong absolute rounded-[16px] z-20">
                    {list1.map((item) => (
                      <>
                        <button
                          type="button"
                          style={
                            item.name === type ? { background: "#F2F9FF" } : {}
                          }
                          key={item.id}
                          onClick={() => {
                            setType(item.name);
                          }}
                          className="font-normal  h-[56px] w-[403px] py-[16px] pr-[10px] pl-[16px] flex justify-between"
                        >
                          <h3>{item.name}</h3>

                          <Image alt="hinh anh" className="text-[#22313F]" src={item.url} />
                        </button>
                        {item.name === type && (
                          <div className="w-[403px] h-[224px] left-[406px] bottom-[22px] z-20 absolute shadow-bong rounded-r-[16px] rounded-bl-[16px] bg-[#fff]">
                            {list.map((item) => (
                              <>
                                <button
                                  key={item.id}
                                  style={
                                    item.name === type1
                                      ? { background: "#F2F9FF" }
                                      : {}
                                  }
                                  onClick={() => (
                                    setType1(item.name), setVisible1(false)
                                  )}
                                  className="flex py-[16px] pr-[10px] pl-[16px]   justify-between w-[403px]"
                                >
                                  <h3 className="text-[#22313F] font-medium">
                                    {item.name}
                                  </h3>
                                  {item.name === type1 ? (
                                    <Image alt="hinh anh" src={check} />
                                  ) : (
                                    ""
                                  )}
                                </button>
                              </>
                            ))}
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className=" w-[357px]">
              <h3 className="font-medium text-[19px] leading-[24px] w-[200px] h-[24px] mb-[6px]">
                Assessment date
              </h3>

              <div
                onClick={() => {
                  setBlockDate(!blockDate);
                }}
                className="flex justify-between border    w-[401px] py-[12px] rounded-[8px] outline-none px-[12px] font-normal "
              >
                <div>
                  {!valueDateAll ? (
                    <h3 className="">
                      {props.start_date + " - " + props.end_date}
                    </h3>
                  ) : (
                    <h3>{valueDateAll}</h3>
                  )}
                </div>

                <Image alt="hinh anh" src={date} />
              </div>

              {blockDate && (
                <div className="flex absolute  flex-col left-[174px] bottom-[-157px]">
                  <div className="flex">
                    <DatePicker
                      onChange={(date) => onChangeStartDate(date)}
                      monthsShown={1}

                      inline
                      selected={startDate}
                    />
                    <DatePicker
                      onChange={(date) => onChangeEndDate(date)}
                      monthsShown={1}

                      inline
                      selected={endDate}
                    />
                  </div>
                  <div className="bg-[#fff] rounded-b-[16px] h-[52px] mt-[-7px] ">
                    <div className="flex-row-reverse flex mt-[8px] mr-[19px] gap-[16px]">
                      <button
                        className="px-[16px] h-[32px] w-[75px] font-medium bg-[#009DBE] rounded-[4px] text-[#fff]"
                        onClick={handleGetDate}
                      >
                        Apply
                      </button>
                      <button
                        className="px-[16px] h-[32px] w-[75px] font-medium bg-[#CCEBF2] rounded-[4px] flex items-center justify-center"
                        onClick={() => setBlockDate(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>

            <button
              onClick={handleEditAs}
              className="text-[#fff] font-normal w-[401px] h-[44px] p-[10px] rounded-[8px] mt-[9px] bg-[#009DBE]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
