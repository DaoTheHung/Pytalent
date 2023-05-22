import React from "react";
import Image from "next/image";
import logoLogin from "../../public/logo-login.jpg";
import { useRouter } from "next/router";
import { useContext } from "react";
import LogoAll from "../../src/components/common/LogoAll"


export default function checkemail() {
  const router = useRouter();
  return (
    <div>
      <LogoAll />
      <div className="flex w-[1440px] mt-[62px]">
        <div className="">
          <Image alt="hinh anh" src={logoLogin} />
        </div>

        <div className="">
          <div className="right-[224px] absolute top-[15rem]">
            <h3 className="text-[40px] font-semibold text-[#111315]">
              Check your email
            </h3>
          </div>

          <div className="absolute top-[28rem] right-[137px] w-[444px]">
            <p className="absolute bottom-[89px] w-[383px] h-[48px] font-normal leading-[24px] text-[16px]">
              We have sent an email to limdim@gmail.com. Follow the instructions
              to reset your password. The email will expire in 30 minutes.{" "}
            </p>
            <div className="absolute top-[-12px]">
              <h2 className="w-[193px] h-[24px] font-normal ">
                Text me back to
                <span
                  className="text-[#009DBE] pl-1 underline decoration-solid cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Sign in
                </span>
              </h2>
              <h2 className="w-[280px] h-[24px] font-normal mt-[19px]">
                Did not receive our email?
                <span
                  className="text-[#009DBE] pl-1 underline decoration-solid cursor-pointer"
                  onClick={() => router.push("#")}
                >
                  Resend
                </span>
              </h2>
            </div>
          </div>
        </div>
        {/* {!isLoading && img && <img src={img} />} */}
      </div>
    </div>
  );
}
