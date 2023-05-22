
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import clock from "../../public/clock.svg";
import trophy from "../../public/trophy.svg";
import { useQuery } from "@tanstack/react-query";
import testApi from "../../src/api/testApi";
import ic_outlined1 from "../../public/ic_outlined1.svg";
import ic_outlined from "../../public/ic_outlined.jpg";
import Link from "next/link";
import rpsRectangle from "../../public/rpsRectangle.png";
import { useRecoilState } from "recoil";
import { scoreGame } from "../../src/recoil/commonRecoilState";
import { isDisplayLogo } from "../../src/recoil/commonRecoilState";

export default function index() {
    const [scoreId, setScoreId] = useRecoilState(scoreGame);
    const [display, setDisPlay] = useRecoilState(isDisplayLogo);
    const [show, setShow] = useState(false);

    const router = useRouter();
    const [arr, setArr] = useState();

    // const [idGame, setIdGame] = useState(null);
    if (router.pathname == "/candidate-game") {
        setDisPlay(true);
    }

    const fetchGames = async () => {
        const result = await testApi.getCandidateGames(router.query.id);
        setArr(result.data.data.games);
        return result.data.data;
    };
    const candidateGames = useQuery(["games"], fetchGames);


    const handleGoGames = (id, score, status_text) => {
        setScoreId(score)
        if (status_text === "Completed") {
            setTimeout(() => {
                setShow(false)
            }, 2000);
            setShow(true)

        } else {
            setShow(false)
            router.push(`/candidate-game/${id}`);
        }

    };
    return (
        <div>
            <div className="">
                {show && <div className="w-[975px] lg:w-[320px] md:w-[320px] animate-appear-slow  bg-green-500 shadow-bong rounded-[8px] h-[81px] md:h-[48px] lg:h-[48px] py-[12px] px-[24px] flex justify-center items-center gap-[12px] absolute left-[49px] md:right-[118px] lg:right-[118px] top-[93px] lg:top-[60px] md:top-[60px]">
                    <Image alt="hinh anh" className="w-[43px] lg:w-auto md:w-auto" src={ic_outlined1} />
                    <h3 className="text-white-500 text-[32px] lg:tex-[16px] md:text-[16px] font-medium ">You have completed this test</h3>

                </div>}
                <div className="text-[57px] mt-[81px] lg:mt-auto md:mt-auto w-[1075px] lg:w-auto md:w-auto  text-center lg:text-[32px] md:text-[32px] font-medium lg:font-semibold md:font-semibold leading-[82px]">
                    Select test
                </div>
                <div className="flex items-center flex-col w-[1074px] lg-w-auto md:w-auto mt-[16px] lg:mt-auto md:mt-auto lg:flex-row md:flex-row gap-[31px] md:gap-[12px]  lg:gap-[12px]">
                    {arr &&
                        arr.map((item) => {
                            return (
                                <>
                                    <div
                                        onClick={() => handleGoGames(item.id, item.score, item.status_text)}
                                        className="flex relative hover:hover:scale-[1.01] cursor-pointer flex-row lg:flex-col gap-[12px] lg:w-[190px] md:w-[190px] w-[974px]  h-[276px] bg-[#FFFFFF]  rounded-[16px] border border-[#DEDDDD] items-center"
                                    >
                                        <img
                                            src={item.image_cover}
                                            className="lg:w-[166px] md:w-[166px] w-[252px] lg:h-[160px] md:h-[160px]  rounded-[16px]"
                                            alt="hinh anh"
                                        />
                                        <div className="">
                                            <h1 className="text-[50px] font-medium md:font-normal lg:font-normal lg:text-[16px] md:text-[16px]">{item.name}</h1>
                                            <div className="flex w-[223px] lg:w-[169px] md:w-[169px] h-[20px] justify-between">
                                                <div className="flex lg:gap-2 md:gap-2 h-[55px] w-[55px] lg:h-0 lg:w-0 md:h-0 md:w-0] gap-[16px]">
                                                    <Image alt="hinh anh" className="w-[45px] " src={clock} />
                                                    <h3 className="lg:text-[14px] md:text-[14px] md:w-auto lg:w-auto text-[34px]">{item.time}s</h3>
                                                </div>
                                                <div className="flex lg:gap-2 md:gap-2 h-[55px] w-[55px]  lg:h-0 lg:w-0 md:h-0 md:w-0 gap-[16px]">
                                                    <Image alt="hinh anh" className="w-[45px]" src={trophy} />
                                                    <h3 className="lg:text-[14px] md:text-[14px] text-[34px]">{item.score}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        {item.status_text === "In progress" &&
                                            <div className="bg-red-300 absolute right-[20px] top-[173px]   lg:static md:static py-[8px] lg:py-[4px] md:py-[4px] px-[12px] flex justify-center w-[241px]  lg:w-[92px] md:w-[92px] rounded-[32px]">
                                                <h3 className="font-medium text-[29px] lg:text-[12px] md:text-[12px]">In progress</h3>
                                            </div>}
                                        {item.status_text === "Not started" &&
                                            <div className="bg-orange-300 absolute right-[20px] top-[173px]   lg:static  md:static  py-[8px] lg:py-[4px] md:py-[4px] px-[12px] flex justify-center w-[241px]  lg:w-[92px] md:w-[92px] rounded-[32px]">
                                                <h3 className="font-medium text-[29px] lg:text-[12px] md:text-[12px]">Not started</h3>
                                            </div>}
                                        {item.status_text === "Completed" &&
                                            <div className="bg-green-300 absolute right-[20px] top-[173px]   lg:static  md:static  py-[8px] lg:py-[4px] md:py-[4px] px-[12px] flex justify-center w-[241px]  lg:w-[92px] md:w-[92px] rounded-[32px]">
                                                <h3 className="font-medium text-[29px] lg:text-[12px] md:text-[12px]">Completed</h3>
                                            </div>}
                                    </div>
                                </>
                            );
                        })}
                </div>
            </div>
        </div>
    )
}
