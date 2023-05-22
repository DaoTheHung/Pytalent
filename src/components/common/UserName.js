import React from "react";
import gachchan1 from "../../../public/div.png";
import Link from "next/link";
import avatar from "../../../public/avatar.png";
import x from "../../../public/Union.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import testApi from "../../api/testApi";
import { useLoading } from "../../hooks/useLoading";
import { auth } from "../../recoil/commonRecoilState";
import { useEffect, useState } from "react";
import logout from "../../../public/logout.svg";
import setting from "../../../public/setting.svg";
import { tokenCandidate } from "../../recoil/commonRecoilState";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import LogoAll from "./LogoAll";
import {
  useRecoilState,

} from "recoil";

export default function username() {
  const cookies = new Cookies();
  const router = useRouter();

  const [display, setDisplay] = useRecoilState(auth);
  const [token, setToken] = useRecoilState(tokenCandidate);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [candidateTk, setCandidateTk] = useState("");

  // console.log(a)

  useEffect(() => {
    const a = cookies.get("login");
    const b = cookies.get("tokenCandidate");
    setDisplay(a);
    setCandidateTk(b);
  });

  const { isLoading, mutate } = useMutation((undefined) => {
    return testApi.getLogout();
  });
  useLoading(isLoading);

  const handleLogout = () => {
    cookies.remove("login");

    mutate(undefined, {
      onSuccess: (response) => {
        router.push("/login");
      },
    });
  };
  const changePsw = useMutation((data) => {
    return testApi.getChangePsw(data);
  });

  useLoading(isLoading);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    changePsw.mutate(data, {
      onSuccess: (response) => {

        setVisible1(false);
      },
    });
  };

  return (
    <div>
      {display && !token && (
        <>
          <LogoAll />
          <div className="absolute left-[40%] top-[73px] flex gap-[80px] w-[355px] h-[34px]">
            <div>
              <Link href="/dashboard">
                <p className="text-[#009DBE] cursor-pointer">My assessments</p>
              </Link>
              <Image alt="hinh anh"
                width="114"
                className="h-[2px] w-[132px]"
                src={gachchan1}
              />
            </div>

            <div>
              {" "}
              <Link href="/list-game">
                <p className="cursor-pointer">Test library</p>
              </Link>
            </div>
          </div>
          <button
            onClick={() => setVisible(!visible)}
            className="py-[4px] px[12px] w-[241px]  h-[68px] absolute right-[59px] flex items-center top-[58px]"
          >
            <h3 className="w-[103px] h-[28px] font-medium mr-[95px]">
              {display}
            </h3>
            <Image alt="hinh anh" width="60" height="60" src={avatar} />
          </button>
          {visible && (
            <div className="w-[243px] h-[112px] shadow-bong right-[55px] top-[141px] z-20 bg-[#fff] rounded-[16px] absolute">
              <button
                onClick={handleLogout}
                className="py-[16px] pr-[10px] pl-[16px]  flex gap-[12px]"
              >
                <Image alt="hinh anh" src={logout} />
                <p>Log out</p>
              </button>
              <button
                onClick={() => {
                  setVisible1(!visible1);
                  setVisible(false);
                }}
                className="py-[16px] pr-[10px] pl-[16px] gap-[12px] flex"
              >
                <Image alt="hinh anh" src={setting} />
                <p> Change password</p>
              </button>
            </div>
          )}
          {visible1 && (
            <>
              <div className="z-10 fixed top-0 left-0 bottom-0 h-[1124px] right-0 bg-white-200 opacity-90 "></div>

              <div className="animate-appear-slow top-[132px] z-20 w-[675px] h-auto Change password bg-[#fff] rounded-[16px] shadow-bong absolute left-[26%]  2xl:top-[18%] p-[24px] ">
                <div className="flex justify-between">
                  <h3 className="text-[37px] leading-[44px] font-semibold ">
                    Change password
                  </h3>
                  <button
                    onClick={() => setVisible1(false)}
                    className=" w-[40px] h-[40px] bg-[#EFEFEF] rounded-[36px] items-center flex justify-center"
                  >
                    <Image alt="hinh anh" src={x} />
                  </button>
                </div>
                <div className="mt-[40px]">
                  <div className="mb-5 text-[#111315] font-semibold leading-[24px]">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex w-[678px] h-[auto] flex-col items-start p-0   gap-[38px]"
                    >
                      <div className=" w-[357px]">
                        <h3 className="font-medium text-[19px] leading-[24px]  h-[24px] mb-[6px]">
                          Type your current password
                          {/* <span className="text-red-500">*</span> */}
                        </h3>
                        <input
                          type="text"
                          className="border   w-[401px] py-[12px] rounded-[8px] outline-none px-[12px] font-normal "
                          {...register("password", {
                            required: true,
                            minLength: 9,
                            maxLength: 15,
                          })}
                        />
                        {errors.password?.type === "required" && (
                          <span className="text-red-500">Is required!</span>
                        )}
                        {errors.password?.type == "minLength" && (
                          <span className="text-red-500">
                            Your password is not long enough
                          </span>
                        )}
                        {errors.password?.type == "maxLength" && (
                          <span className="text-red-500">
                            Your password is too long
                          </span>
                        )}
                      </div>
                      <div className=" w-[357px]">
                        <h3 className="font-medium text-[19px] leading-[24px]  h-[24px] mb-[6px]">
                          Type your new password
                          {/* <span className="text-red-500">*</span> */}
                        </h3>
                        <input
                          type="text"
                          className="border   w-[401px] py-[12px] rounded-[8px] outline-none px-[12px] font-normal "
                          {...register("new_password", {
                            required: true,
                            minLength: 9,
                            maxLength: 15,
                          })}
                        />
                        {errors.new_password?.type === "required" && (
                          <span className="text-red-500">Is required!</span>
                        )}
                        {errors.new_password?.type == "minLength" && (
                          <span className="text-red-500">
                            Your new_password is not long enough
                          </span>
                        )}
                        {errors.password?.type == "maxLength" && (
                          <span className="text-red-500">
                            Your password is too long
                          </span>
                        )}
                      </div>
                      <div className=" w-[357px]">
                        <h3 className="font-medium text-[19px] leading-[24px]  h-[24px] mb-[6px]">
                          Retype your new password
                          {/* <span className="text-red-500">*</span> */}
                        </h3>
                        <input
                          type="text"
                          className="border   w-[401px] py-[12px] rounded-[8px] outline-none px-[12px] font-normal "
                          {...register("new_password_confirmation", {
                            required: true,
                            minLength: 9,
                            maxLength: 15,
                          })}
                        />
                        {errors.new_password_confirmation?.type ===
                          "required" && (
                            <span className="text-red-500">Is required!</span>
                          )}
                        {errors.new_password_confirmation?.type ==
                          "minLength" && (
                            <span className="text-red-500">
                              Your password is not long enough
                            </span>
                          )}
                        {errors.new_password_confirmation?.type ==
                          "maxLength" && (
                            <span className="text-red-500">
                              Your password is too long
                            </span>
                          )}
                      </div>
                      <button
                        type="submit"
                        className="text-[#fff] font-normal w-[401px] h-[44px] p-[10px] rounded-[8px] mt-[9px] bg-[#009DBE]"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
