import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import clock from "../../public/clock.svg";
import trophy from "../../public/trophy.svg";
import { useQuery } from "@tanstack/react-query";
import testApi from "../../src/api/testApi";
import pytalent_welcome from "../../public/pytalent_welcome.jpg";
import ic_outlined1 from "../../public/ic_outlined1.svg";
import ic_outlined from "../../public/ic_outlined.jpg";
import Link from "next/link";
import rpsRectangle from "../../public/rpsRectangle.png";
import { useRecoilState } from "recoil";
import { scoreGame } from "../../src/recoil/commonRecoilState";
import { isDisplayLogo } from "../../src/recoil/commonRecoilState";
import LogoAll from "../../src/components/common/LogoAll";
import logo from "../../public/logo-header.jpg";


export default function index() {
  const [scoreId, setScoreId] = useRecoilState(scoreGame);
  const [display, setDisPlay] = useRecoilState(isDisplayLogo);
  const [show, setShow] = useState(false);
  const [showRps, setShowRps] = useState(false);
  const router = useRouter();
  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);

  // const [idGame, setIdGame] = useState(null);
  if (router.pathname == "/candidate-game") {
    setDisPlay(true);
  }

  const fetchGames = async () => {
    const result = await testApi.getCandidateGames(router.query.id);
    setArr(result.data.data.games);
    setArr1(result.data.data.games);
    return result.data.data;
  };
  const candidateGames = useQuery(["games"], fetchGames);
  const abc = arr1.filter(game => {
    return game.status_text == "Completed"
  })
  if (abc.length == "5") {

  } else {

  }
  const handleGoGames = (id, score, status_text) => {
    setScoreId(score);
    if (status_text === "Completed") {
      setTimeout(() => {
        setShow(false);
      }, 3000);
      setShow(true);
    } else {
      setShow(false);
      router.push(`/candidate-game/${id}`);
    }
  };

  //Responsive
  const handleViewAs = () => {
    setShowRps(false);
  };

  return (
    <>
      <div
        onClick={() => router.push("/")}
        className="relative hidden lg:block flex lg:flex-none md:flex-none   top-[55.5rem] lg:top-10 md:top-10 w-[129px] lg:w-[200px] md:w-[200px] h-[73px] lg:h-[100px] md:h-[100px] left-[15.5rem] md:left-10 lg:left-10"
      >


        <Image alt='hinh anh' className='w-[142px] lg:w-[200px] md:w-[200px]' src={logo} />
      </div>
      <div className="w-[1107px] md:w-[1200px] lg:w-[1200px] mx-[33px] md:mx-[127px] lg:mx-[127px] h-[347px] m-auto mt-[41px] lg:mt-[93px]">
        {show && (
          <div className="w-[320px] animate-appear-slow  bg-green-500 shadow-bong rounded-[8px] h-[48px] py-[12px] px-[24px] flex justify-center items-center gap-[12px] absolute right-[118px] top-[60px]">
            <Image alt="hinh anh" src={ic_outlined1} />
            <h3 className="text-white-500 font-medium ">
              You have completed this test
            </h3>
          </div>
        )}
        <>
          <Image
            className="lg:hidden md:hidden w-[680px] m-auto h-[553px] "
            alt="hinh anh"
            src={pytalent_welcome}
          />
          <h3 className="font-semibold text-[64px] md:text-[20px] lg:text-[20px] mb-[27px] md:mb-[14px] lg:mb-[14px]">
            Welcome to our assessment,
          </h3>
          <div className="w-[1019px] lg:w-[1099px] md:w-[1099px] h-[307px] flex flex-col gap-0 md:gap-[10px] lg:gap-[10px]">
            <h3 className="text-[40px] lg:text-[16px]">
              These are not traditional assessment tests but fun & engaging
              gamified challenges for you to discover yourself and explore if
              you are the most SUITABLE for the applying position.
            </h3>
            <p className="text-[40px] lg:text-[16px] md:text-[16px]">
              Are you up for the challenge?
            </p>
            <ul className="w-[957px] lg:w-[953px] md:w-[953px] leading-[66px] lg:leading-[36px] md:leading-[36px] text-[41px] mt-[27px] lg:mt-0 md:mt-0 lg:text-[16px] md:text-[16px] list-disc ml-[60px] md:ml-[27px] lg:ml-[27px]">
              <li>
                This assessment includes [6] tests, which will take
                approximately [20 minutes] to accomplish.
              </li>
              <li> Read all the instructions carefully in each challenge.</li>
              <li>You can turn the audio on to enter the gamified world.</li>
              <li>
                Make sure you are not distracted by any other factors, stay
                focused and relaxed.
              </li>
              <li>
                Do not refresh the page or close the window while playing.
              </li>
            </ul>
            <div className="text-[40px] md:text-[16px] lg:text-[16px]">
              {" "}
              Have fun and good luck.
            </div>
            <div className="lg:hidden md:hidden mt-[39px]">
              <div className="h-[2px] bg-primary-100 relative w-[1140px] left-[-36px]"></div>
              <Link href="/view-assessment">
                <button
                  onClick={handleViewAs}
                  className="ml-[21px] my-[50px] w-full h-[130px] h-[44px] p-[27px] md:p-[10px] md:mt-3 lg:p-[10px]  lg:mt-3  bg-[#009DBE]  items-center rounded-[16px] "
                >
                  <h3 className="mt-[-10px] text-[41px]  font-medium text-[#FFFFFF]">
                    View assessment
                  </h3>
                </button>
              </Link>
              <div className="h-[2px] bg-primary-100 relative w-[1140px] left-[-36px]"></div>
            </div>
          </div>
        </>

        <div className="lg:block md:block hidden">
          <div className="text-[57px] text-center lg:text-left md:text-left lg:text-[32px] md:text-[32px] font-medium lg:font-semibold md:font-semibold leading-[82px]">
            Select test
          </div>
          <div style={arr.length > 3 ? { justifyContent: `space-between` } : {}} className="flex flex-col lg:flex-row md:flex-row gap-[31px] md:gap-[12px]  lg:gap-[12px]">
            {arr &&
              arr.map((item) => {
                return (
                  <>
                    <div
                      onClick={() =>
                        handleGoGames(item.id, item.score, item.status_text)
                      }
                      style={arr.length > 3 ? { flex: `1` } : {}}
                      className="flex relative hover:hover:scale-[1.01] lg:pl-[11px] cursor-pointer flex-row lg:flex-col gap-[12px] lg:w-[190px] md:w-[190px] w-[1075px]  h-[276px] bg-[#FFFFFF]  rounded-[16px] border border-[#DEDDDD] items-center lg:items-start"
                    >
                      <img
                        src={item.image_cover}
                        className="lg:w-[166px] md:w-[166px] w-[252px] lg:h-[160px] md:h-[160px]  rounded-[16px]"
                        alt="hinh anh"
                      />
                      <div className="">
                        <h1 className="text-[50px] font-medium md:font-normal lg:font-normal lg:text-[15px] md:text-[16px]">
                          {item.name}
                        </h1>
                        <div className="flex w-[223px] lg:w-[169px] md:w-[169px] h-[20px] justify-between">

                          {item.score == 0 && item.status_text === "Completed" ?
                            "" :
                            <>
                              <div className="flex lg:gap-0 md:gap-2 h-[55px] w-[55px] lg:h-auto lg:w-auto md:h-auto md:w-auto gap-[16px]">
                                <Image
                                  alt="hinh anh"
                                  className="w-[45px] lg:h-[21px]"
                                  src={clock}
                                />
                                <h3 className="lg:text-[14px] md:text-[14px] md:w-auto lg:w-auto text-[34px]">
                                  {item.time}s
                                </h3>
                              </div>
                              <div className="flex lg:gap-0 md:gap-2 h-[55px] w-[55px]  lg:h-auto lg:w-auto md:h-auto md:w-auto gap-[16px]">
                                <Image
                                  alt="hinh anh"
                                  className="w-[45px] lg:h-[21px]"
                                  src={trophy}
                                />
                                <h3 className="lg:text-[14px] md:text-[14px] text-[34px]">
                                  {item.score}
                                </h3>
                              </div>
                            </>
                          }


                        </div>
                      </div>
                      {item.status_text === "In progress" && (
                        <div className="bg-red-300 absolute right-[20px] top-[173px]   lg:static md:static py-[8px] lg:py-[4px] md:py-[4px] px-[12px] flex justify-center w-[241px]  lg:w-[92px] md:w-[92px] rounded-[32px]">
                          <h3 className="font-medium text-[29px] lg:text-[12px] md:text-[12px]">
                            In progress
                          </h3>
                        </div>
                      )}
                      {item.status_text === "Not started" && (
                        <div className="bg-orange-300 absolute right-[20px] top-[173px]   lg:static  md:static  py-[8px] lg:py-[4px] md:py-[4px] px-[12px] flex justify-center w-[241px]  lg:w-[92px] md:w-[92px] rounded-[32px]">
                          <h3 className="font-medium text-[29px] lg:text-[12px] md:text-[12px]">
                            Not started
                          </h3>
                        </div>
                      )}
                      {item.status_text === "Completed" && (
                        <div className="bg-green-300 absolute right-[20px] top-[173px]   lg:static  md:static  py-[8px] lg:py-[4px] md:py-[4px] px-[12px] flex justify-center w-[241px]  lg:w-[92px] md:w-[92px] rounded-[32px]">
                          <h3 className="font-medium text-[29px] lg:text-[12px] md:text-[12px]">
                            Completed
                          </h3>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
