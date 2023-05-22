import LayoutDocument from "../src/layouts/layoutDocument";
import Link from "next/link";
import Image from "next/image";
import Header from "../src/components/common/header";
import { useRouter } from "next/router";
import Head from "next/head";

import logo1 from "../public/logo-home.png";

export default function Home() {

  return (
    <>
      <Header />

      <LayoutDocument title="Home">
        <div>
          <div className="max-w-[1440px]">
            <div className=" flex  py-0 px-[134px]">
              <div className="absolute left-[120px] top-[321px]">
                <h1 className="w-[545px] h-[252px] text-[72px] leading-[84px] font-semibold">
                  Hire the best. No bias. No stress.
                </h1>
                <p className="text-[18px] w-[470px] leading-[32px] font-normal text-[#111315] mt-[20px]">
                  Our screening tests identify the best participantss and make
                  your hiring decisions faster, easier, and bias-free.
                </p>
              </div>
              <div className="absolute right-[149px] ">
                <Image alt="hinh anh" src={logo1} width="600" height="600" />
              </div>
            </div>
          </div>
        </div>
      </LayoutDocument>
    </>
  );
}
