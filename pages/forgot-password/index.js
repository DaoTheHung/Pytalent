import React from "react";
import Image from "next/image";
import logoLogin from "../../public/logo-login.jpg";
import { useLoading } from "../../src/hooks/useLoading";
import { useRouter } from "next/router";
import testApi from "../../src/api/testApi";
import LogoAll from "../../src/components/common/LogoAll"
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Cookies from "universal-cookie";

export default function forgot() {
  const cookies = new Cookies();

  const router = useRouter();
  // const { forgot } = router.query
  // const [img, setImg] = useState();
  // const [block, setBlock] = useState(true);

  const { isLoading, mutate } = useMutation((data) => {
    return testApi.getForgot(data);
  });
  useLoading(isLoading);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const onSubmit = (data, e) => {

    mutate(data, {
      onSuccess: (response) => {
        if (response) {
          router.push("/checkemail")

        }
        cookies.set(response.data.data.access_token);
        cookies.set("forgot-password", data.email);
      },
    });
  };

  return (
    <div>
      <LogoAll />
      <div className="flex w-[1440px] mt-[62px]">
        <div className="">
          <Image alt="hinh anh" src={logoLogin} />
        </div>

        <div className="">
          <div className="flex gap-[9px] mt-[42px] right-[145px] absolute top-[195px]">
            <h3 className="text-[40px] font-semibold text-[#111315]">
              Welcome to
            </h3>
            <h3 className="text-[#009DBE] text-[40px] font-semibold">
              pytalent
            </h3>
          </div>

          <div className="absolute top-[24rem] right-[238px] w-[327px]">
            <p className="absolute bottom-[171px] w-[444px] h-[48px] font-normal leading-[24px] text-[16px]">
              Enter your email address and we will send you instructions to
              reset your password.
            </p>

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

              <button

                type="submit"
                className="w-[357px] text-[#fff] mt-[9px] bg-[#009DBE] p-[10px] rounded-[8px] text-white "
              >

                <p> Send reset email</p>

              </button>
              <h2 className="w-[196px] h-[24px] font-normal absolute right-[-29px] top-[11rem]">
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
        {/* {!isLoading && img && <img src={img} />} */}
      </div>
    </div>
  );
}
