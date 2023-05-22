import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useLoading } from "../../src/hooks/useLoading";
import testApi from "../../src/api/testApi";
import logoLogin from "../../public/logo-login.jpg";
import logopassword from "../../public/conmat.png";
import logopassword1 from "../../public/matan.png";
// import cookies from "universal-cookie";
import { useRef } from "react";
import { auth } from "../../src/recoil/commonRecoilState";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import LogoAll from "../../src/components/common/LogoAll";
import Cookies from "universal-cookie";

export default function Login() {
  const [display, setDisplay] = useRecoilState(auth);
  const cookies = new Cookies();
  // const { forgot } = router.query;

  const ref = useRef();
  const router = useRouter();
  const { query } = router;

  // if (cookies) {

  //     if (router.pathname === "/login") {
  //       useEffect(() => {

  //         router.push('/profile')
  //       }, [router.pathname])
  //     }
  //   } else {
  //     return false
  //   }

  const [img, setImg] = useState();
  const [block, setBlock] = useState(true);
  const [text, setText] = useState("password");

  const { isLoading, mutate } = useMutation((data) => {
    return testApi.getLogin(data);
  });

  useLoading(isLoading);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        cookies.set("token", response.data.data.access_token);
        cookies.set("login", data.email);
        router.push("/dashboard");
      },
    });
  };

  const handleForgot = () => {
    router.push("/forgot-password");
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
      <div className="flex mt-[90px]">
        <div className="mr-[150px]">
          <Image alt="hinh anh" src={logoLogin} />
        </div>

        <div className="mt-[102px]">
          <div className="flex gap-[9px] ">
            <h3 className="text-[40px] font-semibold text-[#111315] mb-[20px]">
              Welcome to
            </h3>
            <h3 className="text-[#009DBE] text-[40px] font-semibold">
              pytalent
            </h3>
          </div>

          <div className="w-[327px] relative">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5 text-[#111315] font-semibold leading-[24px]">
                Email
                <input
                  className="border caret-primary-500 w-[357px] py-[12px] rounded-[8px] outline-none px-[12px] font-normal focus:border-[#009DBE]"
                  placeholder="example@email.com"
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
              {errors.email?.type === "pattern" && (
                <span className="text-red-500">Email invalid!</span>
              )}
              <div className=" top-[38px] right-[-11px]">
                Password
                <input
                  type={text}
                  caret-primary-500
                  className="border caret-primary-500  w-[357px] py-[12px] rounded-[8px] outline-none px-[12px] focus:border-[#009DBE]"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                <div className="absolute top-[131px] right-[-11px]">
                  {block ? (
                    <Image
                      alt="hinh anh"
                      onClick={handledisplay1}
                      className="cursor-pointer"
                      src={logopassword1}
                      width="24"
                      height="24"
                    />
                  ) : (
                    <Image
                      alt="hinh anh"
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
                Login
              </button>

              <span
                onClick={handleForgot}
                className="float-right mt-[33px] underline decoration-solid text-[#009DBE] font-normal cursor-pointer"
              >
                Forgot password
              </span>
            </form>
          </div>
        </div>

        {!isLoading && img && <img src={img} />}
      </div>
    </>
  );
}
