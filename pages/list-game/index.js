import React from "react";
import Link from "next/link";
import Image from "next/image";
import logogame1 from "../../public/game1.jpg";
import UserName from "../../src/components/common/UserName";
import iconl from "../../public/light.svg";
import iconr from "../../public/UI icon/arrow_forward/Union.svg";
import testApi from "../../src/api/testApi";
import { useEffect, useState } from "react";

import { isLogin } from "../../src/recoil/commonRecoilState";
import { useMutation } from "@tanstack/react-query";
import { useLoading } from "../../src/hooks/useLoading";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
// import axios from "axios";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

export default function Testlibrary() {
  const [games, setGames] = useState([]);

  const fetchGame = async () => {
    const result = await testApi.getListGames();
    setGames(result.data.data.games);
    return result;
  };

  const data = useQuery({
    queryKey: ["games"],
    queryFn: fetchGame,
  });

  return (
    <>
      <div className="absolute top-[140px] bg-gradient-to-b  from-[#CCEBF2]  w-full h-[343px] ">
        <h1 className=" h-[44px] mt-[40px] mb-[36px] font-semibold text-center text-[32px]">
          Assess your candidates with aptitude and personality tests
        </h1>
        <div className="flex  flex-wrap w-[1343px] gap-[18px] m-auto justify-center pb-[44px]">
          {data &&
            games.map((game) => (
              <>
                <div
                  key={game.id}
                  className="w-[387px] h-[530px] bg-[#fff] hover:scale-[1.01] border border-solid-[#DEDDDD]  rounded-[16px] flex flex-col p-[24px]"
                >
                  <img alt="hinh anh" src={game.image_cover} />
                  <h1 className=" h-[28px] font-medium text-[20px]">
                    {game.name}
                  </h1>
                  <p className="text-[13px] w-[342px]">{game.description}</p>

                  <div className="flex justify-between mt-[21px] pr-[20px]">
                    <div className="flex">
                      <Image alt="hinh anh" src={iconl} />
                      <h3 className="pl-[15px] w-[91px] h-[16px] text-[12px] leading-[22px] font-medium">
                        {game.time}
                      </h3>
                    </div>
                    <div className="flex cursor-pointer">
                      <h3 className="font-medium mr-[11px] text-[#009DBE]">
                        Detail
                      </h3>
                      <Image alt="hinh anh" src={iconr} />
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
