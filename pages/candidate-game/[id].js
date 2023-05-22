import React, { useState } from "react";
import Image from "next/image";
import backtoas from "../../public/backtoas.svg";
import back from "../../public/imgResponsive/back.svg";
import ic_16inline from "../../public/imgResponsive/ic_16inline_info_outlined_ink1.svg";
import { isDisplayLogo } from "../../src/recoil/commonRecoilState";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import gamesApi from "../../src/api/gamesApi";
import testApi from "../../src/api/testApi";
import { useMutation } from "@tanstack/react-query";
import { useLoading } from "../../src/hooks/useLoading";
import { useRecoilState, useRecoilValue, } from "recoil";
import { scoreGame, isEndGame } from "../../src/recoil/commonRecoilState";


import useSound from "use-sound";

export default function detailGame() {
  const router = useRouter();
  const [play] = useSound("../../Sound/SoundStar.mp3");
  const [playTime] = useSound("../../Sound/SoundCountdown.wav");

  const [display, setDisPlay] = useRecoilState(isDisplayLogo);

  const [endGame, setEndGame] = useRecoilState(isEndGame);
  const score = useRecoilValue(scoreGame);
  if (router.pathname === "/candidate-game/[id]") {
    setDisPlay(false);
  }

  const gennerateMutations = useMutation((data) => {
    return gamesApi.getGetGenerateQuestion(data);
  });

  const finishGameMutations = useMutation((data) => {
    return gamesApi.getFinishGame(data);
  });
  useLoading(gennerateMutations.isLoading);
  useLoading(finishGameMutations.isLoading);

  const { data, error } = useQuery(["game"], () => testApi.getCandidateGames());
  let a = {};
  if (data) {
    data.data.data.games.map((item) => {
      if (item.id == router.query.id) {
        a = item;
      }
    });
  }

  const handleStartGames = () => {

    if (a.status_text == "In progress") {

      const fakeId = {
        game_id: router.query.id,
      };
      finishGameMutations.mutate(fakeId, {
        onSuccess: (response) => {
          router.push("/candidate-game");
        },
      });
    }
    else {
      const fakeId = {
        game_id: router.query.id,
      };
      gennerateMutations.mutate(fakeId, {
        onSuccess: (response) => {
          play()
          playTime()


        },
      });
    }
  }





  return (
    <div className="w-[1440px] h-[965px] mt-[367px] lg:mt-auto md:mt-auto">
      <Image
        onClick={() => router.push("/view-assessment")}
        className="block lg:hidden md:hidden w-[66px] absolute top-[199px] left-[44px]"
        src={back}
        alt="hinh anh"
      />
      <div
        className="flex hidden lg:flex md:flex items-center gap-[8px] mt-[60px] ml-[120px] cursor-pointer"
        onClick={() => router.push("/candidate-game")}
      >
        <Image alt="hinh anh" src={backtoas} />
        <h3 className="font-medium">Back to assessment</h3>
      </div>

      <div className="w-[1000px] lg:mt-[5px] lg:w-[400px] md:w-[400px] h-auto lg:h-[376px] md:h-[400px] m-auto border-0 lg:border md:border border-[#DEDDDD] rounded-[16px]">
        <img
          className="w-[1000px] lg:w-[378px ] md:w-[400px]"
          src={a.image_cover}
        />
      </div>
      <div className="w-[1345px] lg:w-[600px] md:w-[600px] h-[267px] flex flex-col gap-[20px] m-auto mt-[24px]">
        <>
          <h3 className="text-[74px] lg:text-[32px] md:text-[32px] font-medium lg:font-semibold md:font-semibold leading-[118px] lg:leading-[44px] md:leading-[44px] text-center">
            {a.name}
          </h3>
          <ul className="list-disc text-[52px] lg:text-[16px] md:text-[16px] leading-[67px] lg:leading-[42px] md:leading-[42px] w-[1345px] lg:w-[495px] md:w-[495px] ml-[46px]">
            <li> 32 questions are given in {a.time} seconds.</li>
            <li> Decide if the two words have similar or opposite meaning. </li>
            <li className="leading-[69px] lg:leading-[30px] mt-[8]">
              {" "}
              Use the keyboard’s Left or Right arrow to answer the question and
              the Up (^) arrow to skip the question.{" "}
            </li>
          </ul>
          {a.status_text == "In progress" && (
            <div className="w-[1345px] mt-[20px] mb-[145px] lg:mt-0 lg:mb-0 lg:w-[600px] lg:rounded-[8px] h-auto lg:h-[72px] md:h-[72px] py-[55px] rounded-[23px] lg:p-[20px] gap-[36px] lg:gap-[10px] md:gap-[10px] bg-white-200 rounded-[16px] flex justify-center items-center">
              <Image
                src={ic_16inline}
                alt="hinh anh"
                className="w-[70px] lg:w-[25px] md:w-auto"
              />
              <h3 className="w-[1124px] text-[52px] mb-[109px] lg:mb-0 lg:text-[16px] md:text-[16px] lg:w-[550px] md:w-[550px] h-[118px] md:h-[48px] lg:h-[48px]">
                Your test is in progress. PyTalent has logged your score so far
                & remaining time. Click{" "}
                <span >Continue</span> to finish the
                test.
              </h3>
            </div>
          )}
          <Link href={`/play-games/${router.query.id}`}>
            <button
              onClick={handleStartGames}
              className="w-[1384px]  lg:w-[600px] md:w-[600px] mt-[14px] h-[148px] lg:h-[44px] md:h-[44px] m-auto rounded-[23px] lg:rounded-[8px] md:rounded-[8px] p-[10px] bg-[#009DBE] flex justify-center items-center ml-[-19px] lg:mt-auto md:ml-auto"
            >
              <h3 className="font-normal lg:font-medium md:font-medium text-[55px] lg:text-[16px] md:text-[16px] text-[#fff]">
                {a.status_text == "In progress" ? "Continue" : "Start"}
              </h3>
            </button>
          </Link>
        </>
      </div>
    </div>
  );
}
