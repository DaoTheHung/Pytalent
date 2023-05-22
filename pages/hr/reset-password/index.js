import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useLoading } from "../../../src/hooks/useLoading";
import testApi from "../../../src/api/testApi";
import logoLogin from "../../../public/logo-login.jpg";
import logopassword from "../../../public/conmat.png";
import logopassword1 from "../../../public/matan.png";
import LogoAll from "../../../src/components/common/LogoAll"

// import cookies from "universal-cookie";
import { useRef } from "react";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import Cookies from "universal-cookie";

export default function resetPassword() {
  const cookies = new Cookies();
  const ref = useRef();
  const router = useRouter();
  const { forgot } = router.query;
  const token = router.query.token;


  const [img, setImg] = useState();
  const [block, setBlock] = useState(true);
  const [text, setText] = useState("password");

  const { isLoading, mutate } = useMutation((data) => {
    return testApi.getResetPsw(data);
  });
  // const { isLoading, mutate } = useMutation((data) => {
  //     return testApi.getResretPsw(data);
  // });

  useLoading(isLoading);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const onSubmit = (data) => {
    const tokenKey = { ...data, token: token };

    mutate(tokenKey, {
      onSuccess: (response) => {
        router.push("/login");

      },
    });
  };

  const handleForgot = () => {
    router.push("/login/forgot");
  };

  const handledisplay = () => {
    setBlock(true);
    setText("password");
  };
  const handledisplay1 = () => {
    setBlock(false);
    setText("text");
  };

  return (
    <>
      <LogoAll />

      <div className="flex ">
        <>
          <div className="mr-[150px]">
            <Image alt="hinh anh" src={logoLogin} />
          </div>

          <div className="mt-[71px]">
            <div className="flex gap-[9px] ">
              <h3 className="text-[40px] font-semibold text-[#111315] mb-[10px]">
                Reset password
              </h3>

            </div>
            <h3 className="mb-[51px]">Please type a new password.</h3>

            <div className="w-[327px] relative">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5 text-[#111315] font-semibold leading-[24px]">
                  Email
                  <input
                    className="border w-[357px] py-[12px] rounded-[8px] outline-none px-[12px] focus:border-[#009DBE]"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    })}
                  />
                </div>

                {errors.email?.type === "required" && (
                  <span className="text-red-500">Is required!</span>
                )}
                <div className="mb-5 text-[#111315] relative top-[10px] relative right-[3px] font-semibold leading-[24px]">
                  Password
                  <input
                    type={text}
                    className="border caret-primary-500 w-[357px] py-[12px] rounded-[8px] outline-none px-[12px] font-normal focus:border-[#009DBE]"
                    {...register("password", {
                      required: true,
                    })}

                  />
                  <div className="absolute top-[38px] right-[-11px]">
                    {block ? (
                      <Image alt="hinh anh"
                        onClick={handledisplay1}
                        className="cursor-pointer"
                        src={logopassword1}
                        width="24"
                        height="24"
                      />
                    ) : (
                      <Image alt="hinh anh"
                        onClick={handledisplay}
                        className="cursor-pointer"
                        src={logopassword}
                        width="24"
                        height="24"
                      />
                    )}
                  </div>
                </div>
                {errors.email?.type === "required" && (
                  <span className="text-red-500">Is required!</span>
                )}

                <div className=" top-[10px] relative right-[3px] text-[#111315] font-semibold leading-[24px]">
                  Confirm Password
                  <input
                    type={text}
                    caret-primary-500
                    className="border caret-primary-500  w-[357px] py-[12px] rounded-[8px] outline-none px-[12px] focus:border-[#009DBE]"
                    {...register("password_confirmation", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  <div className="absolute top-[38px] right-[-11px]">
                    {block ? (
                      <Image alt="hinh anh"
                        onClick={handledisplay1}
                        className="cursor-pointer"
                        src={logopassword1}
                        width="24"
                        height="24"
                      />
                    ) : (
                      <Image alt="hinh anh"
                        onClick={handledisplay}
                        className="cursor-pointer"
                        src={logopassword}
                        width="24"
                        height="24"
                      />
                    )}
                  </div>
                </div>

                {errors.password?.type === "required" && (
                  <span className="text-red-500">Is required!</span>
                )}
                {errors.password?.type == "minLength" && (
                  <span className="text-red-500">Password sai</span>
                )}

                <button
                  type="submit"
                  className="w-[357px] text-white-500 mt-[42px] bg-[#009DBE] p-[10px] rounded-[8px]"
                >
                  Reset password
                </button>

                <h2 className="w-[197px] h-[24px] font-normal absolute right-[-29px] top-[24rem]">
                  Text me back to
                  <span
                    className="text-[#009DBE] pl-1 underline decoration-solid cursor-pointer"
                    onClick={() => router.push("/login")}
                  >
                    Sign in
                  </span>
                </h2>
              </form>
            </div>
          </div>
        </>

        {!isLoading && img && <img src={img} />}
      </div>
    </>
  );
}
