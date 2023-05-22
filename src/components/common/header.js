import React from "react";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
// import logoHeader from '../public/lang/logo-header';
import Image from "next/image";
import gachchan1 from "../../../public/div.png";
import avatar from "../../../public/avatar.png";
import { useRouter } from "next/router";
import { isLogin } from "../../recoil/commonRecoilState";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import UserName from "./UserName";
import { getCookie } from "../../utils/cookies";
import Cookies from "universal-cookie";
import { auth } from "../../recoil/commonRecoilState";
import { tokenCandidate } from "../../recoil/commonRecoilState";
import LogoAll from "./LogoAll";

export default function Header() {
  // const get = getCookie("login");
  const cookies = new Cookies();

  const [display, setDisplay] = useRecoilState(auth);
  const [token, setToken] = useRecoilState(tokenCandidate);

  // useEffect(() => {
  //   cookies.set('isLogin', display)
  // }, [display])
  useEffect(() => {
    const a = cookies.get("login");

    setDisplay(a);
  }, []);

  const router = useRouter();

  return (
    <>
      {!display && (
        <div>
          <LogoAll />
          <div className="px-[40px] py-[40px]">
            <div className=" flex gap-[10px] justify-between ">
              <div className="absolute right-[57px] top-[71px] ">
                <>
                  <Link href="/list-game" legacyBehavior>
                    <button className="w-[180px] p-[10px] bg-[#CCEBF2] rounded-[8px]">
                      <a>Test library</a>
                    </button>
                  </Link>
                  <Link href="/login" legacyBehavior>
                    <button className="w-[180px] ml-[38px] text-white-500 p-[10px] bg-[#009DBE] rounded-[8px] text-white">
                      <a>Login</a>
                    </button>
                  </Link>
                </>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
