import { useEffect, useState, useRef } from "react";
import xExit from "../../public/deleteAs.svg";
import Image from "next/image";
import xAs from "../../public/Comment.svg";
import frame from "../../public/Frame.jpg";
import frame1 from "../../public/Frame1.jpg";
import frame2 from "../../public/Frame2.jpg";
import { useRecoilState } from "recoil";
import { isDisplayLogo } from "../../src/recoil/commonRecoilState";
import { scoreGame } from "../../src/recoil/commonRecoilState";
import closeRps from "../../public/imgResponsive/close.svg";
import arrowR from "../../public/imgResponsive/arrowR.svg";
import btnLeft from "../../public/btnGame/btnLeft.png";
import btnRight from "../../public/btnGame/btnRight.png";
import btnTop from "../../public/btnGame/btnTop.png";
import gach from "../../public/FrameGach.png";
import RectangleGame from "../../public/RectangleGame.jpg";
import hoverLeft from "../../public/Left - hover.png";
import check from "../../public/btnGame/check1.png";
import close from "../../public/btnGame/close1.png";
import hoverRight from "../../public/Right - hover.png";
import { useRouter } from "next/router";
import gamesApi from "../../src/api/gamesApi";
import { useLoading } from "../../src/hooks/useLoading";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import background from "../../public/btnGame/GameBackground.png";
import background1 from "../../public/btnGame/GameBackground1.png";
import rightAnswer from "../../public/btnGame/arrowRight.svg";
import leftAnswer from "../../public/btnGame/arrowLef.svg";
import useSound from "use-sound";
import { isEndGame } from "../../src/recoil/commonRecoilState";


export default function playGames() {
  const [playCheck] = useSound("../../Sound/SoundCheck.wav");
  const [playLose] = useSound("../../Sound/SoundLose.wav");
  const [playScore, { stop }] = useSound("../../Sound/Soundscore.mp3");
  const [playTime] = useSound("../../Sound/SoundCountdown.wav");
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [exitPopup, setExitPopup] = useState(false);
  const [games, setGames] = useState({});
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useRecoilState(scoreGame);
  const [time, setTime] = useState();
  const [answerId5, setAnswerId5] = useState([]);
  const [answerAll, setAnswerAll] = useState([]);
  const [listArrow, setListArrow] = useState([]);
  const [time5, setTime5] = useState();
  const [time6, setTime6] = useState();
  const [time7, setTime7] = useState();
  const [showCheck, setShowCheck] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [show, setShow] = useState(false);
  const [endGame, setEndGame] = useRecoilState(isEndGame);
  const [one, setOne] = useState(false);
  const [tow, setTow] = useState(false);
  const [three, setThree] = useState(false);
  const [zero, setZero] = useState(false);
  const [timeAll, setTimeAll] = useState(false);


  const fakeId = {
    game_id: router.query.id,
  };

  const { isLoading, data, refetch } = useQuery(
    ["playGame"],
    async () => {
      const game = await gamesApi.getGetGenerateQuestion(fakeId);
      //api render
      setGames(game.data.data);
      //countdow time game
      setTime(Math.floor(game.data.data.time / 4));
      //time game memory
      setTime5(game.data.data.question.content.question.time);
      setTime6(game.data.data.question.content.question.time);
      // list arrow game memory
      const arr =
        game.data.data.question.content.question.list_arrows.split(",");
      setListArrow(arr);

      return game;
    },
    {
      enabled: router.query.id > 0,
    }
  );

  const finishGameMutations = useMutation((data) => {
    return gamesApi.getFinishGame(data);
  });
  const answerGames = useMutation((data) => {
    return gamesApi.getAnswerQuestion(data);
  });
  useEffect(() => {
    countDow()
  }, [])



  // count dow answerMemory game memory

  useEffect(() => {

    const timer = setInterval(() => {
      if (show) {
        setTime6((prev) => prev - 1);
      }
      if (time6 <= 0) {
        setTime6(data?.data?.data?.question?.content?.question?.time);
        setTimeAll(!timeAll);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time6, show]);

  //time coundow answerMemory
  useEffect(() => {

    if (show) {
      if (timeAll) {
        setAnswerAll(answerId5)


        if (time6 == 0) {

          const answer1 = {
            question_id: games?.question?.id,
            answer: answerAll.join(),
            game_id: games?.question?.game_id,
            is_skip: 0,
          };

          answerGames.mutate(answer1, {
            onSuccess: (response) => {
              if (response.data.data.result == 1) {
                playCheck();
                setScore(score + 1);
                setShowCheck(true);
                setShowClose(false);

              }
              if (response.data.data.result == 0) {
                playLose();
                setShowCheck(false);
                setShowClose(true);

              }

              setTimeout(() => {
                setAnswer(false);
                setTimeAll(false)
                refetch()
              }, 1000)

              setAnswer(true);
              setScore(response.data.data.total_score);
              setGames(response);




            },
          });


        }
      } else {

        setAnswerId5([])

      }
    }
  }, [timeAll, show, time6]);




  //function count dow khi vao game

  function countDow() {
    setThree(true);
    setTimeout(() => {
      setThree(false);

      setTow(true);
    }, 1000);
    setTimeout(() => {
      setTow(false);
      setOne(true);
    }, 2000);
    setTimeout(() => {
      setOne(false);
      setZero(true);
    }, 3000);
    setTimeout(() => {
      setZero(false);
      setShow(true);
    }, 4000);
  }


  // time counddow da het  && ket thuc game
  useEffect(() => {

    const timer = setInterval(() => {
      if (show) {
        setTime((prev) => prev - 1);
      }
    }, 1000);
    if (time <= 0) {
      const fakeId = {
        game_id: router.query.id,
      };
      finishGameMutations.mutate(fakeId, {
        onSuccess: (response) => {
          router.push("/candidate-game");
        },
      });
    }
    return () => clearInterval(timer);
  }, [time, show]);

  // ketqua game
  useEffect(() => {

    if (games && games.game_ended) {
      if (score >= 0) {
        setEndGame(true)
        playScore();
      }
      setTimeout(() => {
        router.push("/candidate-game");

      }, 1000);
    }
  });

  const handleResult1 = () => {
    // Verbal challenge
    if (router.query.id == 1) {
      const answer = {
        question_id: games?.question?.id,
        answer: "Opposite",
        game_id: games?.question?.game_id,
        is_skip: 0,
      };
      answerGames.mutate(answer, {
        onSuccess: (response) => {
          if (response.data.data.result == 1) {
            playCheck();
            setScore(score + 1);
            setShowCheck(true);
            setShowClose(false);
          }
          if (response.data.data.result == 0) {
            playLose();

            setShowCheck(false);
            setShowClose(true);
          }
          setTimeout(() => {
            setAnswer(false);
          }, 1000);
          setAnswer(true);

          setGames(response.data.data.question);
          refetch();
        },
      });
    }

    // Number challenge
    if (router.query.id == 2) {
      const answer = {
        question_id: games?.question?.id,
        answer: games?.question?.content?.question?.result_1,
        game_id: games?.question?.game_id,
        is_skip: 0,
      };
      answerGames.mutate(answer, {
        onSuccess: (response) => {
          if (response.data.data.result == 1) {
            playCheck();
            setScore(score + 1);
            setShowCheck(true);
            setShowClose(false);
          }
          if (response.data.data.result == 0) {
            playLose();

            setShowCheck(false);
            setShowClose(true);
          }
          setTimeout(() => {
            setAnswer(false);
          }, 1000);
          setAnswer(true);
          setScore(response.data.data.total_score);
          setGames(response);
          refetch();
        },
      });
    }

    //Logic test

    if (router.query.id == 3) {
      const answer = {
        question_id: games?.question?.id,
        answer: "Yes",
        game_id: games?.question?.game_id,
        is_skip: 0,
      };
      answerGames.mutate(answer, {
        onSuccess: (response) => {
          if (response.data.data.result == 1) {
            playCheck();
            setScore(score + 1);
            setShowCheck(true);
            setShowClose(false);
          }
          if (response.data.data.result == 0) {
            playLose();

            setShowCheck(false);
            setShowClose(true);
          }
          setTimeout(() => {
            setAnswer(false);
          }, 1000);
          setAnswer(true);
          setScore(response.data.data.total_score);
          setGames(response.data.data.question);
          refetch();
        },
      });
    }

    //Visual challenge
    if (router.query.id == 4) {
      const answer = {
        question_id: games?.question?.id,
        answer: "Same",
        game_id: games?.question?.game_id,
        is_skip: 0,
      };
      answerGames.mutate(answer, {
        onSuccess: (response) => {
          if (response.data.data.result == 1) {
            playCheck();
            setScore(score + 1);
            setShowCheck(true);
            setShowClose(false);
          }
          if (response.data.data.result == 0) {
            playLose();

            setShowCheck(false);
            setShowClose(true);
          }
          setTimeout(() => {
            setAnswer(false);
          }, 1000);
          setAnswer(true);
          setGames(response.data.data.question);

          refetch();
        },
      });
    }
    if (router.query.id == 5) {
      if (timeAll) {
        setAnswerId5([...answerId5, "l"]);


      }
    }
  };

  const handleResult2 = () => {
    // Verbal challenge
    if (router.query.id == 1) {
      const answer = {
        question_id: games?.question?.id,
        answer: "Same",
        game_id: games?.question?.game_id,
        is_skip: 0,
      };
      answerGames.mutate(answer, {
        onSuccess: (response) => {
          if (response.data.data.result == 1) {
            playCheck();
            setScore(score + 1);
            setShowCheck(true);
            setShowClose(false);
          }
          if (response.data.data.result == 0) {
            playLose();

            setShowCheck(false);
            setShowClose(true);
          }
          setTimeout(() => {
            setAnswer(false);
          }, 1000);
          setAnswer(true);
          setGames(response.data.data.question);

          refetch();
        },
      });
    }

    // Number challenge
    if (router.query.id == 2) {
      const answer = {
        question_id: games?.question?.id,
        answer: games?.question?.content?.question?.result_2,
        game_id: games?.question?.game_id,
        is_skip: 0,
      };
      answerGames.mutate(answer, {
        onSuccess: (response) => {
          if (response.data.data.result == 1) {
            playCheck();
            setScore(score + 1);
            setShowCheck(true);
            setShowClose(false);
          }
          if (response.data.data.result == 0) {
            playLose();

            setShowCheck(false);
            setShowClose(true);
          }
          setTimeout(() => {
            setAnswer(false);
          }, 1000);
          setAnswer(true);

          setGames(response.data.data.question);
          refetch();
        },
      });
    }

    //LogicTest challenge

    if (router.query.id == 3) {
      const answer = {
        question_id: games?.question?.id,
        answer: "No",
        game_id: games?.question?.game_id,
        is_skip: 0,
      };
      answerGames.mutate(answer, {
        onSuccess: (response) => {
          if (response.data.data.result == 1) {
            playCheck();
            setScore(score + 1);
            setShowCheck(true);
            setShowClose(false);
          }
          if (response.data.data.result == 0) {
            playLose();
            setShowCheck(false);
            setShowClose(true);
          }
          setTimeout(() => {
            setAnswer(false);
          }, 1000);
          setAnswer(true);
          setGames(response.data.data.question);

          refetch();
        },
      });
    }

    //Visual challenge

    if (router.query.id == 4) {
      const answer = {
        question_id: games?.question?.id,
        answer: "Different",
        game_id: games?.question?.game_id,
        is_skip: 0,
      };
      answerGames.mutate(answer, {
        onSuccess: (response) => {
          if (response.data.data.result == 1) {
            playCheck();
            setScore(score + 1);
            setShowCheck(true);
            setShowClose(false);
          }
          if (response.data.data.result == 0) {
            playLose();

            setShowCheck(false);
            setShowClose(true);
          }
          setTimeout(() => {
            setAnswer(false);
          }, 1000);
          setAnswer(true);
          setGames(response.data.data.question);
          refetch();
        },
      });
    }
    if (router.query.id == 5) {
      if (timeAll) {
        setAnswerId5([...answerId5, "r"]);

      }
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", testKey, true);
  }, []);

  const testKey = (e) => { };
  //skip game
  const handleSkip = () => {

    const answer = {
      question_id: games?.question?.id,
      game_id: games?.question?.game_id,
      is_skip: "1",
    };
    answerGames.mutate(answer, {
      onSuccess: (response) => {
        setScore(response.data.data.total_score);
        setGames(response.data.data.question);
        refetch();
      },
    });
  };

  const handleExit = () => {
    setExitPopup(true);
    // router.push("/candidate-game");
  };
  return (
    <>
      <div className="w-[1440px] ">
        {!show && !games.game_ended && (
          <div className="lg:h-[140%] w-[812px]  h-[101rem]  absolute left-0 top-0   lg:w-[142%] lg:bottom-0 bg-[#fff] z-30">
            <div className="h-full flex justify-center items-center text-[92px] text-[#d5bcd5] font-medium">
              {three && (
                <span className="text-[#d5bcd5] animate-appear-slow">3</span>
              )}
              {tow && (
                <span className="text-[#d5bcd5] animate-appear-slow">2</span>
              )}
              {one && (
                <span className="text-[#d5bcd5] animate-appear-slow">1</span>
              )}
              {zero && (
                <span className="text-[#d5bcd5] animate-appear-slow">0</span>
              )}
            </div>
          </div>
        )}
        {router.query.id == 5 && (
          <div className="hidden md:block lg:block">
            <div className="cursor-pointer" onClick={handleExit}>
              <Image
                alt="hinh anh"
                src={xAs}
                className="w-[40px] h-[40px] absolute top-[56px] left-[56px]"
              />
            </div>
            <Image src={background1} alt="hinhanh" />
          </div>
        )}
        {router.query.id == 4 && (
          <div className="hidden md:block lg:block">
            <div className="cursor-pointer" onClick={handleExit}>
              <Image
                alt="hinh anh"
                src={xAs}
                className="w-[40px] h-[40px] absolute top-[56px] left-[56px]"
              />
            </div>
            <Image src={background1} alt="hinhanh" />
          </div>
        )}
        {router.query.id == 3 && (
          <div className="hidden md:block lg:block">
            <div className="cursor-pointer" onClick={handleExit}>
              <Image
                alt="hinh anh"
                src={xAs}
                className="w-[40px] h-[40px] absolute top-[56px] left-[56px]"
              />
            </div>
            <Image src={background1} alt="hinhanh" />
          </div>
        )}
        {router.query.id == 2 && (
          <div className="hidden md:block lg:block">
            <div className="cursor-pointer" onClick={handleExit}>
              <Image
                alt="hinh anh"
                src={xAs}
                className="w-[40px] h-[40px] absolute top-[56px] left-[56px]"
              />
            </div>
            <Image src={background1} alt="hinhanh" />
          </div>
        )}
        {router.query.id == 1 && (
          <div className="hidden md:block lg:block">
            <div className="cursor-pointer" onClick={handleExit}>
              <Image
                alt="hinh anh"
                src={xAs}
                className="w-[40px] h-[40px] absolute top-[56px] left-[56px]"
              />
            </div>
            <Image src={background} alt="hinhanh" />
          </div>
        )}

        <div className=" w-[827px] md:w-[909px]  lg:w-[909px] ml-[-76px] lg:ml-auto md:ml-auto absolute left-0 lg:left-[231px] md:left-[231px] top-[115px] h-[742px] bg-[#FFFFFF] border-none lg:border md:border md:boder-[#009DBE] lg:boder-[#009DBE] shadow-none md:shadow-bong1  lg:shadow-bong1 rounded-[16px]">
          {router.query.id == 1 && (
            <>
              <div className="w-[800px] h-[48px] flex">
                <div className="lg:w-[297px] md:w-[297px] w-[679px] h-[44px] flex items-center gap-[12px] my-[47px] mx-[99px]">
                  <div className="w-[12px] h-[40px] bg-[#009DBE] rounded-[4px] hidden lg:block md:block"></div>
                  <Image
                    onClick={() => setExitPopup(true)}
                    alt="hinh anh"
                    src={closeRps}
                    className="w-[53px] block lg:hidden md:hidden"
                  />
                  <h3 className="font-medium w-[343px] lg:font-semibold md:font-semibold text-[30px] lg:text-[28px] leading-[44px]">
                    Verbal challenge
                  </h3>
                </div>
                <div className="w-[332px] absolute lg:sticky right-[-13px] lg:w-[318px] md:w-[318px] flex items-center gap-[79px] lg:gap-[24px] h-[48px] my-[47px] ">
                  <div className="flex items-center gap-[8px] h-[962px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame}
                    />

                    <h3 className="text-[28px] w-[52px] lg:w-auto font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && time}s
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px] hidden lg:flex md:flex">
                    <Image alt="hinh anh" src={frame1} />
                    <h3 className="text-[20px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.answered_question_num}/
                      {games && games.total_question}
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame2}
                    />
                    <h3 className="text-[28px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.total_score}
                    </h3>
                  </div>
                </div>
              </div>
              <Image
                alt="hinh anh"
                className="absolute top-[111px] hidden lg:block md:block"
                src={gach}
              />
              <div className="hidden lg:block md:block absolute top-[129px] left-[188px]">
                <Image alt="hinh anh" src={RectangleGame} />
              </div>

              <div className="mt-[379px] lg:mt-[249px] md:mt-[249px] mx-[99px] flex flex-col gap-[36px] lg:gap-[18px] md:gap-[18px]">
                <div className="p-[12px] w-[703px] h-[103px] lg:h-[68px] md:h-[68px] flex justify-center items-center border border-[#DEDDDD] rounded-[16px]">
                  <h3 className="font-semibold text-[32px]  ">
                    {games?.question?.content?.question?.word_1}
                  </h3>
                </div>
                <div className="p-[12px] w-[703px] h-[103px] lg:h-[68px] md:h-[68px] flex justify-center items-center border mt-2 border-[#DEDDDD] rounded-[16px]">
                  <h3 className="font-semibold text-[32px]  ">
                    {games?.question?.content?.question?.word_2}
                  </h3>
                </div>
              </div>
              {answer ? (
                <div className="absolute top-[703px] left-[414px] lg:left-[420px] md:left-[420px] lg:top-[345px] md:top-[345px] z-20">
                  {showCheck && (
                    <Image
                      alt="hinh anh"
                      src={check}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px] "
                    />
                  )}
                  {showClose && (
                    <Image
                      alt="hinh anh"
                      src={close}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px]"
                    />
                  )}
                </div>
              ) : (
                ""
              )}

              <div className="w-[649px] h-auto m-auto mt-[347px] lg:mt-[100px] md:mt-[100px] flex justify-center gap-[160px] lg:gap-[101px] md:gap-[101px] mr-[50px] lg:ml-[134px] md:ml-[134px]">
                <button onClick={handleSkip} className="absolute bottom-[-306px] lg:bottom-[98px] md:bottom-[119px] left-[379px] lg:left-[422px] md:left-[422px] w-[148px] lg:w-auto md:w-[auto] flex flex-col items-center">
                  <h3

                    className="font-semibold lg:font-medium text-[25px] lg:text-[16px] md:text-[16px]"
                  >
                    SKIP
                  </h3>
                  <Image
                    alt="hinh anh"
                    src={btnTop}
                    className="lg:h-[68px] md:h-[68px] w-[105px] lg:w-[63px] md:w-[63px]"
                  />
                </button>
                <div
                  className="w-[240px] h-[386px] lg:h-[244px] md:h-[244px] justify-center lg:h-[160px] md:h-[160px] flex-col-reverse flex lg:flex-row md:flex-row items-center gap-[12px]"
                  onClick={handleResult1}
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                >
                  <h3 className="  h-[44px] font-semibold lg:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    Same
                  </h3>
                  <button className=" ">
                    {hover ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverLeft}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnLeft}
                      />
                    )}
                  </button>
                </div>

                <div
                  onClick={handleResult2}
                  onMouseOver={() => setHover1(true)}
                  onMouseOut={() => setHover1(false)}
                  className="w-[240px] lg:h-[244px] md:h-[244px] lg:h-[160px] justify-center md:h-[160px] flex-col-reverse flex lg:flex-row-reverse md:flex-row flex items-center gap-[12px]"
                >
                  <h3 className=" h-[44px] font-semibold lg:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    Opposite
                  </h3>
                  <button className="">
                    {hover1 ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverRight}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnRight}
                      />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {router.query.id == 2 && (
            <>
              <div className="w-[800px] h-[48px] flex">
                <div className="lg:w-[297px] md:w-[297px] w-[679px] h-[44px] flex items-center gap-[12px] my-[47px] mx-[99px]">
                  <div className="w-[12px] h-[40px] bg-[#009DBE] rounded-[4px] hidden lg:block md:block"></div>
                  <Image
                    onClick={() => setExitPopup(true)}
                    alt="hinh anh"
                    src={closeRps}
                    className="w-[53px] block lg:hidden md:hidden"
                  />
                  <h3 className="font-medium w-[343px] lg:font-semibold md:font-semibold text-[30px] lg:text-[28px] leading-[44px]">
                    Number challenge
                  </h3>
                </div>
                <div className="w-[332px] absolute lg:sticky right-[-13px] lg:w-[318px] md:w-[318px] flex items-center gap-[79px] lg:gap-[24px] h-[48px] my-[47px] ">
                  <div className="flex items-center gap-[8px] h-[962px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame}
                    />

                    <h3 className="text-[28px] w-[52px] lg:w-auto font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && time}s
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px] hidden lg:flex md:flex">
                    <Image alt="hinh anh" src={frame1} />
                    <h3 className="text-[20px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.answered_question_num}/
                      {games && games.total_question}
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame2}
                    />
                    <h3 className="text-[28px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.total_score}
                    </h3>
                  </div>
                </div>
              </div>
              <Image
                alt="hinh anh"
                className="absolute top-[111px] hidden lg:block md:block"
                src={gach}
              />
              <div className="hidden lg:block md:block absolute top-[129px] left-[188px]">
                <Image alt="hinh anh" src={RectangleGame} />
              </div>

              <h3 className="w-[545px] lg:w-[909px] md:w-[909px] ml-[185px] lg:ml-0 font-medium text-[30px] lg:text-[20px] md:text-[20px] text-center mt-[330px] lg:mt-[220px] md:mt-[220px]">
                Choose the number that is close enough to the right answer.
              </h3>
              <div
                className="ml-[100px] lg:ml-auto md:ml-auto w-[703px]  bg-gradient-to-b from-[#8ad5df] h-[116px] lg:h-[104px] md:h-[104px] m-auto
             mt-[38px] lg:mt-[45px] md:mt-[45px] p-[10px] flex justify-center items-center gap-[10px] shadow-bong1 rounded-[8px] lg:rounded-[32px] md:rounded-[32px]"
              >
                <h3 className="font-semibold text-[40px]  ">
                  {games?.question?.content?.question?.expression}
                </h3>
              </div>
              {answer ? (
                <div className="absolute top-[648px] left-[414px] lg:left-[426px] md:left-[426px] lg:top-[367px] md:top-[367px] z-20">
                  {showCheck && (
                    <Image
                      alt="hinh anh"
                      src={check}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px] "
                    />
                  )}
                  {showClose && (
                    <Image
                      alt="hinh anh"
                      src={close}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px]"
                    />
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="w-[649px] h-auto m-auto mt-[369px] lg:mt-[100px] md:mt-[100px] flex justify-center gap-[160px] lg:gap-[101px] md:gap-[101px] mr-[50px] lg:ml-[134px] md:ml-[134px]">
                <button
                  onClick={handleSkip}
                  className="absolute bottom-[-306px] lg:bottom-[110px] md:bottom-[168px] left-[379px] lg:left-[422px] md:left-[428px] w-[148px] lg:w-auto md:w-[auto] flex flex-col items-center"
                >
                  <h3 className="font-semibold lg:font-medium text-[25px] lg:text-[16px] md:text-[16px]">
                    SKIP
                  </h3>
                  <Image
                    alt="hinh anh"
                    src={btnTop}
                    className="lg:h-[68px] md:h-[68px] w-[105px] lg:w-[63px] md:w-[63px]"
                  />
                </button>
                <div
                  className="w-[240px] h-[386px] lg:h-[244px] md:h-[244px] justify-center lg:h-[160px] md:h-[160px] flex-col-reverse flex lg:flex-row md:flex-row items-center gap-[12px]"
                  onClick={handleResult1}
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                >
                  <h3 className="lg:w-[52px] w-auto h-[44px] font-semibold lg:font-medium md:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    {games?.question?.content?.question?.result_1}
                  </h3>
                  <button className=" ">
                    {hover ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverLeft}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnLeft}
                      />
                    )}
                  </button>
                </div>

                <div
                  onClick={handleResult2}
                  onMouseOver={() => setHover1(true)}
                  onMouseOut={() => setHover1(false)}
                  className="w-[240px] lg:h-[244px] md:h-[244px] lg:h-[160px] justify-center md:h-[160px] flex-col-reverse flex lg:flex-row-reverse md:flex-row flex items-center gap-[12px]"
                >
                  <h3 className="lg:w-[78px] w-auto h-[44px] font-semibold lg:font-medium md:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    {games?.question?.content?.question?.result_2}
                  </h3>
                  <button className="">
                    {hover1 ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverRight}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnRight}
                      />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {router.query.id == 3 && (
            <>
              <div className="w-[800px] h-[48px] flex">
                <div className="lg:w-[297px] md:w-[297px] w-[679px] h-[44px] flex items-center gap-[12px] my-[47px] mx-[99px]">
                  <div className="w-[12px] h-[40px] bg-[#009DBE] rounded-[4px] hidden lg:block md:block"></div>
                  <Image
                    onClick={() => setExitPopup(true)}
                    alt="hinh anh"
                    src={closeRps}
                    className="w-[53px] block lg:hidden md:hidden"
                  />
                  <h3 className="font-medium w-[343px] lg:font-semibold md:font-semibold text-[30px] lg:text-[28px] leading-[44px]">
                    Logical challenge
                  </h3>
                </div>
                <div className="w-[332px] absolute lg:sticky right-[-13px] lg:w-[318px] md:w-[318px] flex items-center gap-[79px] lg:gap-[24px] h-[48px] my-[47px] ">
                  <div className="flex items-center gap-[8px] h-[962px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame}
                    />

                    <h3 className="text-[28px] w-[52px] lg:w-auto font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && time}s
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px] hidden lg:flex md:flex">
                    <Image alt="hinh anh" src={frame1} />
                    <h3 className="text-[20px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.answered_question_num}/
                      {games && games.total_question}
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame2}
                    />
                    <h3 className="text-[28px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.total_score}
                    </h3>
                  </div>
                </div>
              </div>
              <Image
                alt="hinh anh"
                className="absolute top-[111px] hidden lg:block md:block"
                src={gach}
              />
              <div className="hidden lg:block md:block absolute top-[129px] left-[188px]">
                <Image alt="hinh anh" src={RectangleGame} />
              </div>
              <h3 className="mt-[142px] lg:mt-[221px] md:mt-[221px] ml-[155px] lg:m-auto font-normal lg:font-medium md:font-medium lg:text-ink-100 md:text-ink-100 text-center text-[32px] lg:text-[20px] md:text-[20px] w-[630px] lg:w-auto md:w-auto">
                Does the conclusion logically follows the statements?
              </h3>

              <div className="my-[20px] ml-[105px] lg:ml-[51px] mx-[51px] flex flex-col gap-[18px] w-[736px] lg:w-[800px] md:w-[800px]">
                <div className="py-[20px] px-[10px] w-[96%] lg:w-full md:w-full  h-[282px] lg:h-[112px] lg:h-[112px]  flex-col gap-[45px] lg:gap-[16px] md:gap-[16px]  flex justify-center items-center border border-[#DEDDDD] rounded-[8px]">
                  <h3 className="font-normal flex justify-center items-center gap-[33px] lg:gap-2 md:gap-2 lg:font-medium md:font-medium text-[32px] lg:text-[20px] md:text-[20px]">
                    <span className="font-medium block text-[40px] lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      A.
                    </span>
                    {games?.question?.content?.question?.statement_1}
                  </h3>
                  <h3 className="font-normal flex justify-center items-center  gap-[33px] lg:gap-2 md:gap-2 lg:font-medium md:font-medium text-[32px] lg:text-[20px] md:text-[20px]">
                    <span className="font-medium block lg:font-normal text-[40px] lg:text-[16px] md:text-[16px] md:font-normal">
                      B.
                    </span>
                    {games?.question?.content?.question?.statement_2}
                  </h3>
                </div>

                <h3 className="block lg:hidden md:hidden text-[28px] font-medium mt-[23px]">
                  Conclusion
                </h3>
                <div className=" mt-[-8px] lg:hidden md:hidden  lg:w-full md:w-full w-[96%] h-[84px] lg:h-[80px] md:h-[80px] border border-[#DEDDDD] rounded-[8px] flex justify-center">
                  <div className="flex justify-center items-center gap-[16px] lg:flex lg:gap-[20px]">
                    <Image src={arrowR} alt="hinh anh" className="w-[34px]" />
                    <h3 className="font-normal  md:font-medium lg:font-medium text-[23px] lg:text-[20px] md:text-[20px]">
                      {games?.question?.content?.question?.conclusion}
                    </h3>
                  </div>
                </div>

                <div className="hidden lg:block md:block mt-2 w-full h-[80px] border border-[#DEDDDD] rounded-[8px] flex justify-center">
                  <div className="flex justify-center items-center gap-[16px]">
                    <div className="py-[8px] mt-[20px] px-[12px] w-[116px] flex justify-center items-center h-[40px] bg-primary-100 gap-[10px] rounded-[8px]">
                      <h3>Conclusion:</h3>
                    </div>
                    <h3 className="font-medium text-[20px] mt-[20px]">
                      {games?.question?.content?.question?.conclusion}
                    </h3>
                  </div>
                </div>
              </div>

              {answer ? (
                <div className="absolute top-[751px] left-[414px] lg:left-[426px] md:left-[426px] lg:top-[367px] md:top-[367px] z-20">
                  {showCheck && (
                    <Image
                      alt="hinh anh"
                      src={check}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px] "
                    />
                  )}
                  {showClose && (
                    <Image
                      alt="hinh anh"
                      src={close}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px]"
                    />
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="w-[649px] h-auto m-auto mt-[262px] lg:mt-[21px] md:mt-[21px] flex justify-center gap-[160px] lg:gap-[101px] md:gap-[101px] mr-[50px] lg:ml-[134px] md:ml-[134px]">
                <button
                  onClick={handleSkip}
                  className="absolute bottom-[-345px] lg:bottom-[103px] md:bottom-[153px] left-[379px] lg:left-[428px] md:left-[428px] w-[148px] lg:w-auto md:w-[auto] flex flex-col items-center"
                >
                  <h3 className="font-medium text-[25px] lg:text-[16px] md:text-[16px]">
                    SKIP
                  </h3>
                  <Image
                    alt="hinh anh"
                    src={btnTop}
                    className="lg:h-[68px] md:h-[68px] w-[105px] lg:w-[63px] md:w-[63px]"
                  />
                </button>
                <div
                  className="w-[240px] h-[386px] lg:h-[244px] md:h-[244px] justify-center lg:h-[160px] md:h-[160px] flex-col-reverse flex lg:flex-row md:flex-row items-center gap-[12px]"
                  onClick={handleResult1}
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                >
                  <h3 className="  h-[44px] font-semibold lg:font-medium md:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    YES
                  </h3>
                  <button className=" ">
                    {hover ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverLeft}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnLeft}
                      />
                    )}
                  </button>
                </div>

                <div
                  onClick={handleResult2}
                  onMouseOver={() => setHover1(true)}
                  onMouseOut={() => setHover1(false)}
                  className="w-[240px] lg:h-[244px] md:h-[244px] lg:h-[160px] justify-center md:h-[160px] flex-col-reverse flex lg:flex-row-reverse md:flex-row flex items-center gap-[12px]"
                >
                  <h3 className=" h-[44px] font-semibold lg:font-medium md:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    NO
                  </h3>
                  <button className="">
                    {hover1 ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverRight}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnRight}
                      />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {router.query.id == 4 && (
            <>
              <div className="w-[800px] h-[48px] flex">
                <div className="lg:w-[297px] md:w-[297px] w-[679px] h-[44px] flex items-center gap-[12px] my-[47px] mx-[99px]">
                  <div className="w-[12px] h-[40px] bg-[#009DBE] rounded-[4px] hidden lg:block md:block"></div>
                  <Image
                    onClick={() => setExitPopup(true)}
                    alt="hinh anh"
                    src={closeRps}
                    className="w-[53px] block lg:hidden md:hidden"
                  />
                  <h3 className="font-medium w-[343px] lg:font-semibold md:font-semibold text-[30px] lg:text-[28px] leading-[44px]">
                    Visual challenge
                  </h3>
                </div>
                <div className="w-[332px] absolute lg:sticky right-[-13px] lg:w-[318px] md:w-[318px] flex items-center gap-[79px] lg:gap-[24px] h-[48px] my-[47px] ">
                  <div className="flex items-center gap-[8px] h-[962px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame}
                    />

                    <h3 className="text-[28px] w-[52px] lg:w-auto font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && time}s
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px] hidden lg:flex md:flex">
                    <Image alt="hinh anh" src={frame1} />
                    <h3 className="text-[20px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.answered_question_num}/
                      {games && games.total_question}
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame2}
                    />
                    <h3 className="text-[28px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.total_score}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="h-[895px] lg:h-[auto]">
                <div
                  className={
                    games?.question?.level === "hard"
                      ? "flex flex-col items-center lg:flex-row gap-[29px] h-auto ml-[68px] lg:ml-auto  lg:gap-[70px]  justify-center mt-[119px] lg:mt-[60px]  w-full lg:h-[388px] md:h-[388px] my-[60px] "
                      : "flex h-auto ml-[68px] lg:ml-auto gap-[129px] lg:gap-[70px]  justify-center mt-[119px] lg:mt-[60px]   w-full lg:h-[388px] md:h-[388px] my-[60px] "
                  }
                >
                  <img
                    className={
                      games?.question?.level === "hard"
                        ? "w-[500px]  h-[416px] lg:h-auto lg:w-[322px] md:w-[322px]"
                        : "w-[295px] h-[54rem] lg:h-[411px] lg:w-[249px] md:w-[249px]"
                    }
                    alt="Hinh anh"
                    src={games?.question?.content?.question?.image_1}
                  />
                  <img
                    className={
                      games?.question?.level === "hard"
                        ? "w-[500px] h-[416px]  lg:h-auto lg:w-[322px] md:w-[322px]"
                        : "w-[295px] h-[54rem]  lg:h-[411px] lg:w-[249px] md:w-[249px]"
                    }
                    alt="Hinh anh"
                    src={games?.question?.content?.question?.image_2}
                  />
                </div>
              </div>

              {answer ? (
                <div className="absolute top-[560px]  left-[437px] lg:left-[426px] md:left-[426px] lg:top-[288px] md:top-[305px ] z-20">
                  {showCheck && (
                    <Image
                      alt="hinh anh"
                      src={check}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px] "
                    />
                  )}
                  {showClose && (
                    <Image
                      alt="hinh anh"
                      src={close}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px]"
                    />
                  )}
                </div>
              ) : (
                ""
              )}

              <div className="w-[649px] h-auto m-auto mt-[110px] lg:mt-[27px] md:mt-[100px] flex justify-center gap-[160px] lg:gap-[101px] md:gap-[101px] mr-[17px] lg:ml-[134px] md:ml-[134px]">
                <button
                  onClick={handleSkip}
                  className="absolute bottom-[-460px] lg:bottom-[119px] md:bottom-[119px] left-[411px] lg:left-[422px] md:left-[422px] w-[148px] lg:w-auto md:w-[auto] flex flex-col items-center"
                >
                  <h3 className="font-semibold lg:font-medium text-[25px] lg:text-[16px] md:text-[16px] ">
                    SKIP
                  </h3>
                  <Image
                    alt="hinh anh"
                    src={btnTop}
                    className="lg:h-[68px] md:h-[68px] w-[105px] lg:w-[63px] md:w-[63px]"
                  />
                </button>
                <div
                  className="w-[240px] h-[386px] lg:h-[244px] md:h-[244px] justify-center lg:h-[160px] md:h-[160px] flex-col-reverse flex lg:flex-row md:flex-row items-center gap-[12px]"
                  onClick={handleResult1}
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                >
                  <h3 className="  h-[44px] font-semibold lg:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    SAME
                  </h3>
                  <button className=" ">
                    {hover ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverLeft}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnLeft}
                      />
                    )}
                  </button>
                </div>

                <div
                  onClick={handleResult2}
                  onMouseOver={() => setHover1(true)}
                  onMouseOut={() => setHover1(false)}
                  className="w-[240px] lg:h-[244px] md:h-[244px] lg:h-[160px] justify-center md:h-[160px] flex-col-reverse flex lg:flex-row-reverse md:flex-row flex items-center gap-[12px]"
                >
                  <h3 className=" h-[44px] font-semibold lg:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    OPPSITE
                  </h3>
                  <button className="">
                    {hover1 ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverRight}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnRight}
                      />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {router.query.id == 5 && (
            <>
              <div className="w-[800px] h-[48px] flex">
                <div className="lg:w-[297px] md:w-[297px] w-[679px] h-[44px] flex items-center gap-[12px] my-[47px] mx-[99px]">
                  <div className="w-[12px] h-[40px] bg-[#009DBE] rounded-[4px] hidden lg:block md:block"></div>
                  <Image
                    onClick={() => setExitPopup(true)}
                    alt="hinh anh"
                    src={closeRps}
                    className="w-[53px] block lg:hidden md:hidden"
                  />
                  <h3 className="font-medium w-[343px] lg:font-semibold md:font-semibold text-[30px] lg:text-[28px] leading-[44px]">
                    Memory challenge
                  </h3>
                </div>
                <div className="w-[332px] absolute lg:sticky right-[-13px] lg:w-[318px] md:w-[318px] flex items-center gap-[79px] lg:gap-[24px] h-[48px] my-[47px] ">
                  <div className="flex items-center gap-[8px] h-[962px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame}
                    />

                    <h3 className="text-[28px] w-[52px] lg:w-auto font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && time}s
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px] hidden lg:flex md:flex">
                    <Image alt="hinh anh" src={frame1} />
                    <h3 className="text-[20px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.answered_question_num}/
                      {games && games.total_question}
                    </h3>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Image
                      alt="hinh anh"
                      className="w-[70px] lg:w-[50px] md:w-[50px]"
                      src={frame2}
                    />
                    <h3 className="text-[28px] font-medium lg:text-[16px] md:text-[16px] lg:font-normal md:font-normal">
                      {games && games.total_score}
                    </h3>
                  </div>
                </div>
              </div>
              <Image
                alt="hinh anh"
                className="absolute top-[111px] hidden lg:block md:block"
                src={gach}
              />
              <div className="hidden lg:block md:block absolute top-[129px] left-[188px]">
                <Image alt="hinh anh" src={RectangleGame} />
              </div>

              <>
                <h3 className="w-[545px] lg:w-[909px] md:w-[909px] ml-[185px] lg:ml-0 font-medium text-[30px] lg:text-[20px] md:text-[20px] text-center mt-[330px] lg:mt-[220px] md:mt-[220px]">
                  Memorize the pattern in {time6} seconds
                </h3>
                <div className="w-[373px] lg:w-[300px] ml-[262px] lg:m-auto mt-[14px] lg:mt-[11px]  h-[22px] lg:h-[11px] lg:h-[10px] bg-[#F4F4F4] border border-[#111315] rounded-[16px]">
                  <div
                    style={{ animation: `width ease-in ${show && time5 + 1.1}s infinite` }}
                    className={`h-full animate-[width_ease-in_${show && time5 && time5 + 1.1}s_infinite] rounded-[16px] bg-[#111315]`}></div>
                </div>
                <div className="h-[895px] lg:h-[auto]">
                  {!timeAll ? (
                    <div
                      className="shadow-bong2 h-auto ml-[100px] border  border-[#009DBE]  lg:ml-auto md:ml-auto w-[703px] bg-[#90e3eb5e] lg:h-auto md:h-[104px] m-auto
                      mt-[38px] lg:mt-[45px] md:mt-[45px] p-[10px] flex justify-center items-center gap-[10px] rounded-[8px] lg:rounded-[18px] md:rounded-[32px]"
                    >
                      <div className="flex justify-center my-[38px]  lg:my-[20px] flex-wrap lg:flex-nowrap gap-[13px] lg:gap-[0] ml-[20px] w-[90%]">
                        {listArrow.map((item) =>
                          item === "l" ? (
                            <Image alt="hinh anh" src={leftAnswer} className={`${listArrow.length > 11 ? "lg:scale-[0.7] scale-[1]" : ""} ${listArrow.length >= 21 ? "lg:scale-[0.5]  scale-[1]" : ""}`} />

                          ) : (
                            <Image alt="hinh anh" src={rightAnswer} className={`${listArrow.length > 11 ? "lg:scale-[0.7] scale-[1]" : ""} ${listArrow.length >= 21 ? "lg:scale-[0.5] scale-[1]" : ""}`} />
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="ml-[100px] w-auto lg:w-[700px] font-semibold text-[40px] text-center outline-none border border-[#009DBE] bg-[#90e3eb5e]  bg-gradient-to-b from-[#F4FDFF] h-auto lg:h-[104px] md:h-[104px] m-auto
                      mt-[38px] lg:mt-[45px] md:mt-[45px] p-[10px] flex justify-center 
                      items-center  py-[38px]  lg:py-[20px]  gap-[13px] lg:gap-[0] gap-[10px] lg:gap-[0] shadow-bong2 rounded-[8px] lg:rounded-[32px] md:rounded-[32px]"
                    >
                      <div className="flex justify-center  flex-wrap lg:flex-nowrap gap-[13px] lg:gap-[0] ml-[20px] w-[90%]">

                        {answerId5.map((item) =>
                          item == "l" ? (
                            <Image alt="hinh anh" src={leftAnswer} className={`${answerId5.length > 11 ? "lg:scale-[0.7] scale-[1]" : ""} ${answerId5.length >= 21 ? "lg:scale-[0.5]  scale-[1]" : ""}`} />

                          ) : (
                            <Image alt="hinh anh" src={rightAnswer} className={`${answerId5.length > 11 ? "lg:scale-[0.7] scale-[1]" : ""} ${answerId5.length >= 21 ? "lg:scale-[0.5] scale-[1]" : ""}`} />

                          )
                        )}
                      </div>
                      {answerId5.length <= 0 && <div className="w-[2px] lg:mr-[321px] mr-[335px] h-[60px] bg-[#009DBE] animate-flash-slow"></div>}

                    </div>
                  )}
                </div>
              </>

              {answer ? (
                <div className="absolute top-[560px]  left-[437px] lg:left-[426px] md:left-[426px] lg:top-[288px] md:top-[305px ] z-20">
                  {showCheck && (
                    <Image
                      alt="hinh anh"
                      src={check}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px] "
                    />
                  )}
                  {showClose && (
                    <Image
                      alt="hinh anh"
                      src={close}
                      className="w-[82px]  lg:w-[60px] md:w-[60px]  lg:h-[60px] md:h-[60px]"
                    />
                  )}
                </div>
              ) : (
                ""
              )}

              <div className="w-[649px] h-auto m-auto mt-[-415px] lg:mt-[27px] md:mt-[100px] flex justify-center gap-[160px] lg:gap-[101px] md:gap-[101px] mr-[47px] lg:ml-[134px] md:ml-[134px]">
                <div
                  className="w-[240px] h-[386px] lg:h-[244px] md:h-[244px] justify-center lg:h-[160px] md:h-[160px] flex-col-reverse flex lg:flex-row md:flex-row items-center gap-[12px]"
                  onClick={handleResult1}
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                >
                  <h3 className="  h-[44px] font-semibold lg:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    Left
                  </h3>
                  <button className=" ">
                    {hover ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverLeft}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnLeft}
                      />
                    )}
                  </button>
                </div>

                <div
                  onClick={handleResult2}
                  onMouseOver={() => setHover1(true)}
                  onMouseOut={() => setHover1(false)}
                  className="w-[240px] lg:h-[244px] md:h-[244px] lg:h-[160px] justify-center md:h-[160px] flex-col-reverse flex lg:flex-row-reverse md:flex-row flex items-center gap-[12px]"
                >
                  <h3 className=" h-[44px] font-semibold lg:font-medium text-[30px] md:text-[20px] lg:text-[20px] leading-[44px]">
                    Right
                  </h3>
                  <button className="">
                    {hover1 ? (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={hoverRight}
                      />
                    ) : (
                      <Image
                        alt="hinh anh"
                        className="w-[126px] lg:w-[80px] md:w-[80px] lg:h-[80px] md:h-[80px]"
                        src={btnRight}
                      />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {games && games.game_ended && (
            <div>
              <div>
                <div
                  className={
                    games && games.game_ended
                      ? "animate-height-slow h-[203%] lg:h-full md:h-full	w-full bg-[#fff] bottom-[-649px] lg:bottom-0 md:bottom-0 z-20 absolute rounded-[16px]"
                      : "	w-full bg-[#fff] bottom-0 z-20 absolute rounded-[16px]"
                  }
                ></div>
              </div>
              <div
                className={
                  games && games.game_ended
                    ? "flex z-20 animate-appear-slow2 justify-center items-center  absolute top-[573px] left-[244px] lg:top-[303px] md:top-[303px] lg:left-[192px] md:left-[192px]"
                    : "flex  justify-center items-center  absolute lg:top-[303px] md:top-[303px] lg:left-[192px] md:left-[192px]"
                }
              >
                <h3 className="text-[64px] animate-appear-slow leading-[80px] font-semibold  text-[#009DBE]">
                  Your score: {score}
                </h3>
              </div>
            </div>
          )}
        </div>
        {exitPopup && (
          <>
            <div className="z-10 fixed top-0 left-0 bottom-0 h-auto lg:h-[1124px] md:h-[1124px] right-0 bg-white-200 opacity-90 "></div>
            <div className="animate-appear-slow w-[480px] h-[189px] fixed left-[20%] top-[588px] lg:left-[34%] md:left-[34%] lg:top-[305px] md:top-[305px] bg-[#FFFFFF] rounded-[16px] shadow-bong z-30">
              <div className="flex justify-between w-[480px] h-[58px]">
                <p className="text-[#111315] text-[20px] leading-[28px] mt-[16px] ml-[23px] h-[28px] font-medium">
                  Are you sure you want to leave this test?
                </p>
                <Image
                  alt="hinh anh"
                  src={xExit}
                  onClick={() => setExitPopup(false)}
                  className="cursor-pointer w-[14px] h-[14px] text-[#6F767E] mt-[24px] mr-[25px] "
                />
              </div>
              <div className="flex flex-col items-start w-[480px] h-[64px] py-[8px] px-[24px] gap-[24px]">
                <h3 className="text-[#111315] w-[432px] text-[16px] h-[72px] font-normal ">
                  If you leave the test, your current score will be recorded and
                  you cannot continue or redo the test.
                </h3>
              </div>
              <div className="w-[480px]  bg-[#FFFFFF]  px-[24px] flex gap-[16px] justify-end">
                <button
                  onClick={() => setExitPopup(false)}
                  className="bg-[#DEDDDD] w-[89px] h-[40px] rounded-[8px] px-[16px] flex flex-col items-center justify-center"
                >
                  <p className="text-[#22313F]">Dismiss</p>
                </button>
                <button
                  onClick={() => router.push("/candidate-game")}
                  className="bg-[#FFE7E1] w-[118px] h-[40px] rounded-[8px] px-[16px] flex flex-col items-center justify-center"
                >
                  <p className="text-[#E90C31] font-medium">Leave test</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
