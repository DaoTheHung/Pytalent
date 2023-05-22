import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import Loading from "../src/components/common/loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import UserName from "../src/components/common/UserName";
import { handleResultApi } from "../src/utils/handleResultApi";
import { useRouter } from "next/router";

import LogoAll from "../src/components/common/LogoAll";
import React from "react";
import Cookies from "universal-cookie";


function MyApp({ Component, pageProps }) {


  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,

          onError: (result) => {
            handleResultApi(result.response?.data);
          },
        },
        mutations: {
          onSuccess: (result) => {
            handleResultApi(result);
          },
          onError: (result) => {
            handleResultApi(result.response?.data);
          },
        },
      },
    })
  );

  // const abc1 = cookies.get("login");

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Loading />

          <ToastContainer />
          <UserName />

          <Component {...pageProps} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
