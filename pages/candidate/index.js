import React from "react";
import { useForm } from "react-hook-form";
import logoShoppe from "../../public/logoShoppe.jpg";
import { useMutation } from "@tanstack/react-query";
import { useLoading } from "../../src/hooks/useLoading";
import testApi from "../../src/api/testApi";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { tokenCandidate } from "../../src/recoil/commonRecoilState";
import Image from "next/image";
import Cookies from "universal-cookie";
import LogoAll from "../../src/components/common/LogoAll";

export default function index() {
  const [token, setToken] = useRecoilState(tokenCandidate);

  const cookies = new Cookies();
  const router = useRouter();
  const tokens = router.query.token;

  if (tokens) {
    setToken(tokens);
  }

  const candidateLogin = useMutation((data) => {
    return testApi.getCandidateLogin(data);
  });
  useLoading(candidateLogin.isLoading);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    const emailLogin = {
      email: data,
      token: router.query.token,
    };
    candidateLogin.mutate(emailLogin, {
      onSuccess: (response) => {
        cookies.set("token", response.data.data.access_token);
        cookies.remove("login");

        router.push("/candidate-game");
      },
    });
  };

  return (
    <>
      <LogoAll />
      <div className="flex flex-col justify-center items-center m-auto w-[513px] md:w-[1440px] lg:w-[1440px] h-[500px] mt-[-38px] lg:mt-[155px] md:mt-[155px]">
        <div className="w-[500px] h-[300px] lg:shadow-bong md:shadow-bong bg-[#fff] rounded-[16px] flex flex-col justify-center items-center m-auto mb-[-109px] lg:mb-[47px]  md:mb-[47px]">
          <Image alt="hinh anh" className="w-[154px] lg:w-auto md:w-auto" src={logoShoppe} />
        </div>
        <div className="w-[500px] h-[304px] flex flex-col gap-[16px] justify-center items-center text-center mt-[39px]">
          <div>
            <h3 className=" w-[392px] lg:w-[496px] md:w-[496px]  font-semibold text-[26px] lg:text-[48px] md:text-[48px] leading-[34px] lg:leading-[56px] md:leading-[56px] ">
              Welcome to
            </h3>
            <h3 className="w-[392px] lg:w-[496px] md:w-[496px]  font-semibold text-[26px] lg:text-[48px] md:text-[48px] leading-[34px] lg:leading-[56px] md:leading-[56px]">
              {" "}
              Shopee assessment
            </h3>
          </div>
          <div>
            <p className="w-[437px] ">
              Thanks for your interest in this position!
            </p>
            <p className="w-[437px] ">
              Please enter your email adress to access the assessment.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 text-[#111315] font-semibold leading-[24px]">
              <input
                className="border border-[#DEDDDD] caret-primary-500 w-[474px] lg:w-[500px] md:w-[500px] py-[21px] lg:py-[12px] md:py-[12px] rounded-[8px] outline-none px-[12px] font-normal focus:border-[#009DBE]"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                })}
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500 block ml-[17px]  md:ml-0  lg:ml-0 float-left py-[6px]">
                  Is required!
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="text-red-500 ml-[17px] lg:ml-0 md:ml-0 float-left py-[6px]">
                  Email address is invalid.!
                </span>
              )}
            </div>
            <button className="w-[474px] lg:w-[500px] md:w-[500px] h-[44px] p-[27px] lg:p-[10px] mt-[0rem] lg:mt-3 md:mt-3  bg-[#009DBE] lg:flex md:flex md:justify-center  lg:justify-center items-center rounded-[8px] ">
              <h3 className="mt-[-10px] lg:mt-0 font-medium text-[#FFFFFF]">Continue</h3>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
