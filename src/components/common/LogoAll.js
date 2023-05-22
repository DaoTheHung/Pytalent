import React from 'react'
import { useRouter } from "next/router";
import logo from "../../../public/logo-header.jpg";
import Image from 'next/image';
import { isDisplayLogo } from '../../recoil/commonRecoilState';
import { useRecoilState } from 'recoil';


export default function LogoAll() {

    const router = useRouter()
    const [display, setDisPlay] = useRecoilState(isDisplayLogo)
    return (
        <>
            {
                display && <div className=''>
                    <div
                        onClick={() => router.push("/")}
                        className="relative flex lg:flex-none md:flex-none   top-[55.5rem] lg:top-10 md:top-10 w-[129px] lg:w-[200px] md:w-[200px] h-[73px] lg:h-[100px] md:h-[100px] left-[15.5rem] md:left-10 lg:left-10"
                    >
                        <h3 className='block absolute left-[-88px] top-[28px] lg:hidden md:hidden text-[12px]'>powered by</h3>

                        <Image alt='hinh anh' className='w-[142px] lg:w-[200px] md:w-[200px]' src={logo} />
                    </div>
                </div>
            }
        </>
    )
}
