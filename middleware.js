import { NextResponse } from "next/server";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { routerConstant, routerPrivate } from "./src/constants/routerConstant";
import { TOKEN } from "./src/constants/settingConstant";
export function middleware(request) {

  const cookie = request.cookies.get(TOKEN);
  const pathName = request.nextUrl.pathname;

  const checkPathName = () => {
    let check = false;
    routerPrivate.forEach((path) => {
      if (pathName.startsWith(path)) {

        check = true;
      }
    });
    return check;
  };
  if (checkPathName() && !cookie) {

    return NextResponse.redirect(new URL(routerConstant.login, request.url));
  } else {


  }
  // if (cookie) {

  //   if (router.pathname === "/login") {
  //     useEffect(() => {

  //       router.push('/profile')
  //     }, [router.pathname])
  //   }
  // } else {
  //   return false
  // }



  return NextResponse.next();
}
