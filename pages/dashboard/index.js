import React, { useEffect } from "react";
import Image from "next/image";
import avatar from "../../public/avatar.png";
// import gachchan from "../../public/div.png";
import thumuc from "../../public/thumuc.png";
import x from "../../public/Union.png";
import down from "../../public/down.svg";
import Assessment from "../../src/components/common/Assessment";
import newArrow from "../../public/newArrow.svg";
import newArrowDown from "../../public/newArrowDown.svg";
import check from "../../public/check.svg";
import date from "../../public/date.svg";
import DatePicker from "react-datepicker";
import xAs from "../../public/deleteAs.svg";
import ArchiveAssessment from "../../src/components/common/ArchiveAssessment";
import { useMutation } from "@tanstack/react-query";
import { useLoading } from "../../src/hooks/useLoading";
import { useRouter } from "next/router";
import { getDates } from "../../src/components/inputFill/getDate";
import { useState } from "react";
import testApi from "../../src/api/testApi";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { removeAs } from "../../src/recoil/commonRecoilState";
import { ListAssessment } from "../../src/recoil/commonRecoilState";

export default function index() {
  const [remove, setRemove] = useRecoilState(removeAs);

  const router = useRouter();

  const [block, setBlock] = useState(false);
  const [type, setType] = useState("");
  const [type1, setType1] = useState("");
  const [valueStartDate, setValueStartDate] = useState("");
  const [valueEndDate, setValueEndDate] = useState("");
  const [valueDateAll, setValueDateAll] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [idGame, setIdGame] = useState([]);
  const [blockDate, setBlockDate] = useState(false);
  const [c, setC] = useState(false);
  const [orther, setOrther] = useState(false);
  const [requirePst, setRequirePst] = useState(false);
  const [requireSelect, setRequireSelect] = useState(false);
  const [requireName, setRequireName] = useState(false);
  const [requireDate, setRequireDate] = useState(false);
  const [valueName, setValueName] = useState("");
  const [name, setName] = useState("");
  const [nameGame, setNameGame] = useState(false);
  const [assessment, setAssessment] = useRecoilState(ListAssessment);
  const [archiveAssessment, setArchiveAssessment] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchGame = async () => {
    const result = await testApi.getListGames();

    return result.data.data.games;
  };

  const listGames = useQuery({
    queryKey: ["games"],
    queryFn: fetchGame,
  });

  const fetchListAssessment = async () => {
    const result = await testApi.getAssessment();
    setAssessment(result.data.data.assessments);
    return result.data.data.assessments;
  };
  const listAssessments = useQuery(["assessment"], fetchListAssessment);

  const fetchArchiveAssessment = async () => {
    const result = await testApi.getArchiveAssessment();
    setArchiveAssessment(result.data.data.assessments);
    return result.data.data.assessments;
  };
  const listArchiveAssessments = useQuery(
    ["archiveAssessment"],
    fetchArchiveAssessment
  );



  function DaysBetween(end_date) {
    // The number of milliseconds in all UTC days (no DST)

    const oneDay = 1000 * 60 * 60 * 24;
    const datePart = end_date.split("/");
    const year = datePart[2].split(" ");
    const StartDate = new Date(+year[0], datePart[1] - 1, +datePart[0]);
    const EndDate = new Date();

    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const end = Date.UTC(
      EndDate.getFullYear(),
      EndDate.getMonth(),
      EndDate.getDate()
    );
    const start = Date.UTC(
      StartDate.getFullYear(),
      StartDate.getMonth(),
      StartDate.getDate()
    );
    if ((start - end) / oneDay < 0) {
      return (end_date = 0);
    }
    // so it's safe to divide by 24 hours
    return (start - end) / oneDay;
  }

  const gamess = idGame.map((item) => {
    return {
      game_id: item,
      option: "",
    };
  });

  const data = {
    name: name,
    job_function: type1,
    game: gamess,
    job_position: type.name,
    start_date: valueStartDate,
    end_date: valueEndDate,
  };

  const mutationsAdd = useMutation((data) => {
    return testApi.getCreateAssessmennt(data);
  });

  const mutationsArchive = useMutation((data) => {
    return testApi.getPostArchive(data);
  });

  const mutationsUnArchive = useMutation((data) => {
    return testApi.getPostUnArchive(data);
  });

  const mutationsCopy = useMutation((data) => {
    return testApi.getCopyAssessment(data);
  });

  const deleteMutations = useMutation((data) => {
    return testApi.getDeleteAssessment(data);
  });
  useLoading(deleteMutations.isLoading);

  useLoading(mutationsAdd.isLoading);
  useLoading(mutationsArchive.isLoading);
  useLoading(mutationsUnArchive.isLoading);
  useLoading(mutationsCopy.isLoading);

  const [list1, setList1] = useState([
    {
      id: 1,
      name: "C-level executive",
    },
    {
      id: 2,
      name: "Director",
    },
    {
      id: 3,
      name: "Manager",
    },
    {
      id: 4,
      name: "Junior / Trainee",
    },
    {
      id: 5,
      name: "Intern",
    },
  ]);
  const [list2, setList2] = useState([
    {
      id: 1,
      name: "Verbal test",
      check: false,
    },
    {
      id: 2,
      name: "Numerical test",
      check: false,
    },
    {
      id: 3,
      name: "Logical test",
      check: false,
    },
    {
      id: 4,
      name: "Visual test",
      check: false,
    },
    {
      id: 5,
      name: "Memory test",
      check: false,
    },
    {
      id: 7,
      name: "PHP Coding Challenge",
      check: false,
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

  const handleVisibleOrther = () => {
    setOrther(!orther);
    setC(!c);
  };

  const handleCheckBox = (id, name) => {
    const fakeList2 = [...list2];

    for (let i = 0; i < fakeList2.length; i++) {
      if (fakeList2[i].id === id) {
        fakeList2[i].check = !fakeList2[i].check;
      }
      setList2([...fakeList2]);
    }
  };
  let arr = [];
  let arr1 = [];

  const handleSavePersonality = () => {
    const fakeList2 = [...list2];

    for (let i = 0; i < fakeList2.length; i++) {
      if (fakeList2[i].check === true) {
        arr1.push(fakeList2[i].id);
        arr.push(fakeList2[i].name);
        // setIdGame(fakeList2[i].id);
      }
    }

    setC(false);

    setIdGame(arr1);
    setValueName(arr.join(", "));
  };

  const onChangeStartDate = (e) => {
    setStartDate(e);
    setValueStartDate(getDates(startDate));
  };
  const onChangeEndDate = (e) => {
    setEndDate(e);
    setValueEndDate(getDates(endDate));
  };

  const handleGetDate = () => {
    setValueDateAll(valueStartDate + " - " + valueEndDate);
    setBlockDate(false);
  };
  const handleCancelDate = () => {
    setBlockDate(false);
  };

  //add

  const handleAddAs = () => {
    if (!valueName) {
      setRequireSelect(true);
    } else {
      setRequireSelect(false);
    }
    if (!type) {
      setRequirePst(true);
    } else {
      setRequirePst(false);
    }
    if (!name) {
      setRequireName(true);
    } else {
      setRequireName(false);
    }

    if (valueName && type && name) {
      mutationsAdd.mutate(data, {
        onSuccess: (response) => {
          setBlock(false);
          setValueName("");
          setType("");
          setName("");
          setValueDateAll("");
          listAssessments.refetch();
        },
      });
    }
  };

  // delete
  const handleRemoveAs = (id) => {
    setRemove(id);
    const idPost = {
      assessment_id: id,
    };
    deleteMutations.mutate(idPost, {
      onSuccess: (response) => {
        listAssessments.refetch();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  //archive

  const handleArchiveAs = (id) => {
    const archiveAs = {
      assessment_id: id,
    };

    mutationsArchive.mutate(archiveAs, {
      onSuccess: (response) => {
        listAssessments.refetch();
        listArchiveAssessments.refetch();
      },
    });
  };

  const handleUnArchiveAs = (id) => {
    const unArchiveAs = {
      assessment_id: id,
    };

    mutationsUnArchive.mutate(unArchiveAs, {
      onSuccess: (response) => {
        listAssessments.refetch();
        listArchiveAssessments.refetch();
      },
    });
  };

  const handleCopyAs = (id) => {
    const copyAs = {
      assessment_id: id,
    };
    mutationsCopy.mutate(copyAs, {
      onSuccess: (response) => {
        listAssessments.refetch();
      },
    });
  };

  return (
    <div className="h-[1024px]">
      <div className="h-auto mt-[84px] m-[78px]">
        <h3 className="font-semibold text-[32px]  top-[178px] left-[104px] mb-[40px]">
          Active assessments
        </h3>
        <button
          onClick={() => setBlock(true)}
          className="bg-[#009DBE]  text-[#fff] p-3 w-[259px] h-[44px] items-center absolute right-[50px] flex flex-row-reverse justify-around rounded-[8px] top-[190px]"
        >
          <h3 className="font-medium  h-[24px]">Create new assessment</h3>
          <Image alt="hinhanh" width="24" height="24" src={thumuc} className="mr-[15px]" />
        </button>

        {block ? (
          <>
            <div className=" z-10 fixed top-0 left-0 bottom-0 h-[1124px] right-0 bg-white-200 opacity-90 "></div>
            <div className="animate-appear-slow z-20 w-[726px] h-auto  bg-[#fff] rounded-[16px] shadow-bong absolute left-[26%]  2xl:top-[18%] p-[24px] ">
              <div className="flex justify-between">
                <h3 className="text-[37px] leading-[44px] font-semibold ">
                  Create new assessment
                </h3>
                <button
                  onClick={() => setBlock(false)}
                  className=" w-[40px] h-[40px] bg-[#EFEFEF] rounded-[36px] items-center flex justify-center"
                >
                  <Image alt="hinhanh" src={x} />
                </button>
              </div>

              <div className="mt-[40px]">
                <div className="mb-5 text-[#111315] font-semibold leading-[24px]">
                  <div className="flex w-[678px] h-[auto] flex-col items-start p-0 gap-[24px]  gap-34px">
                    <div className=" w-[357px]">
                      <h3 className="font-medium text-[19px] leading-[24px]  h-[24px] mb-[6px]">
                        Your assessment name{" "}
                        <span className="text-red-500">*</span>
                      </h3>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border   w-[401px] py-[12px] rounded-[8px] outline-none px-[12px] font-normal "
                      />
                    </div>
                    {requireName && !name && (
                      <span className="mt-[-19px] text-red-500 font-normal">
                        Complete this field to create assessment
                      </span>
                    )}
                    <div className=" w-[357px]">
                      <h3 className="font-medium text-[19px] mb-[6px]">
                        Select tests <span className="text-red-500">*</span>
                      </h3>
                      <button
                        onClick={() => {
                          setC(!c);
                          setVisible1(false);
                        }}
                        className="

                      appearance-none
                          w-[401px]
                          px-[12px]
                          py-[12px]
                          font-normal
                          outline-none
                          border border-solid
                          rounded-[8px]
                          block
                          text-left
                          relative
                          text-ink-100

                          "
                      >
                        {!valueName && <span>List of test</span>}
                        <span className="text-[#111315]">{valueName}</span>

                        <Image alt="hinhanh"
                          src={down}
                          className="absolute top-[19px] left-[371px]"
                        />
                      </button>
                      {requireSelect && !valueName && (
                        <span className="text-red-500 font-normal">
                          Complete this field to create assessment
                        </span>
                      )}
                      {visible1 && (
                        <>
                          <div className="bg-[#fff] right-[139px] w-[403px] top-[477px]  shadow-bong absolute rounded-[16px] z-20">
                            {list1.map((item) => (
                              <>
                                <button
                                  style={
                                    item.name === type.name
                                      ? { background: "#F2F9FF" }
                                      : {}
                                  }
                                  key={item.id}
                                  onClick={() => {
                                    setType(item);
                                  }}
                                  className="font-normal relative  h-[56px] w-[403px] py-[16px] pr-[10px] pl-[16px] flex justify-between"
                                >
                                  <h3>{item.name}</h3>

                                  <Image alt="hinhanh"
                                    className="text-[#22313F]"
                                    src={
                                      item.name === type.name
                                        ? newArrowDown
                                        : newArrow
                                    }
                                  />
                                  {item.name === type.name && (
                                    <div className="w-[403px] h-[224px] absolute top-0 left-[408px] z-20  shadow-bong rounded-r-[16px] rounded-bl-[16px] bg-[#fff]">
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
                                              setType1(item.name),
                                              setVisible1(false)
                                            )}
                                            className="flex py-[16px] pr-[10px] pl-[16px]   justify-between w-[403px]"
                                          >
                                            <h3 className="text-[#22313F] font-medium">
                                              {item.name}
                                            </h3>
                                            {item.name === type1 ? (
                                              <Image alt="hinhanh" src={check} />
                                            ) : (
                                              ""
                                            )}
                                          </button>
                                        </>
                                      ))}
                                    </div>
                                  )}
                                </button>
                              </>
                            ))}
                          </div>
                        </>
                      )}

                      {c && (
                        <div className="w-[400px] left-[179px] top-[314px] h-auto p-[24px] shadow-bong rounded-[16px] bg-[#fff] absolute z-20">
                          <h3 className="h-[24px] font-normal text-ink-100">
                            Choose tests for your assessmentes
                          </h3>
                          <div className="mt-2 flex flex-col gap-[15px]">
                            {listGames &&
                              listGames.data.map((item) => (
                                <>
                                  <div className="flex gap-[18px]">
                                    <input
                                      onClick={() => {
                                        handleCheckBox(item.id, item.name);
                                      }}
                                      className="w-[17px] h-[22px]"
                                      type="checkbox"
                                      value={nameGame}
                                    />
                                    <p className="font-normal">{item.name}</p>
                                  </div>
                                </>
                              ))}

                            <button
                              onClick={handleSavePersonality}
                              className="w-[352px] h-[44px] p-[10px] bg-primary-500 rounded-[8px] font-normal text-[#fff]"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className=" w-[357px]">
                      <h3 className="font-medium text-[19px] leading-[24px] w-[200px] h-[24px] mb-[6px]">
                        Position recruiting{" "}
                        <span className="text-red-500">*</span>
                      </h3>
                      <button
                        onClick={() => {
                          setVisible1(!visible1);
                          setC(false);
                        }}
                        type="text"
                        placeholder="Choose job role"
                        className="
                          
                          w-[401px]
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
                          text-ink-100
                          
                          "
                      >
                        <>
                          {/* {type.length === 0 && <span>List of test</span>} */}
                          {type.name && type1 ? (
                            <h3 className="text-[#111315]">
                              {type.name + " - " + type1}
                            </h3>
                          ) : (
                            "Choose job role"
                          )}
                        </>

                        <Image alt="hinhanh"
                          src={down}
                          style={
                            orther ? { bottom: "422px", left: "371px" } : {}
                          }
                          className="absolute top-[20px]  left-[371px]"
                        />
                      </button>
                      {requirePst && !type1 && (
                        <span className="text-red-500 font-normal">
                          Complete this field to create assessment
                        </span>
                      )}
                    </div>

                    <div className=" w-[357px]">
                      <h3 className="font-medium text-[19px] leading-[24px] w-[200px] h-[24px] mb-[6px]">
                        Assessment date
                      </h3>

                      <div
                        onClick={() => {
                          setBlockDate(!blockDate);
                          setVisible1(false);
                          setC(false);
                        }}
                        className="flex justify-between border      w-[401px] py-[12px] rounded-[8px] outline-none px-[12px] font-normal "
                      >
                        <div>
                          {valueDateAll ? (
                            <h3>{valueDateAll}</h3>
                          ) : (
                            <h3 className="text-ink-100">Start - End</h3>
                          )}
                        </div>

                        <Image alt="hinhanh" src={date} />
                      </div>

                      {blockDate && (
                        <div className="flex flex-col  absolute left-[174px] bottom-[-206px]">
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
                                onClick={handleCancelDate}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {requireDate && (
                      <span className="text-red-500 font-normal">
                        Complete this field to create assessment
                      </span>
                    )}
                    <button
                      onClick={handleAddAs}
                      className="text-[#fff] font-normal w-[401px] h-[44px] p-[10px] rounded-[8px] mt-[9px] bg-[#009DBE]"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className=" top-[240px] left-[97px] flex gap-[24px]  text flex-wrap h-auto">
          {assessment?.map((item) => (
            <>
              <Assessment
                key={item.id}
                id={item.id}
                name={item.name}
                date={DaysBetween(item.end_date)}
                onRemove={handleRemoveAs}
                onArchive={handleArchiveAs}
                onCopy={handleCopyAs}
              />
            </>
          ))}
        </div>
      </div>

      <div className="">
        <h3 className="font-semibold text-[32px]  absolute  h-[44px] left-[70px] ">
          Archived assessments
        </h3>
        <div className="flex gap-[43px] ml-[-20px]">
          {archiveAssessment.map((item) => (
            <ArchiveAssessment
              id={item.id}
              name={item.name}
              date={DaysBetween(item.end_date)}
              onUnArchive={handleUnArchiveAs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch('https://63904e5065ff4183110f18f6.mockapi.io/crud');
//   const data = await res.json();
//   return {
//     props: {
//       posts: data,
//     },
//   };
// }
