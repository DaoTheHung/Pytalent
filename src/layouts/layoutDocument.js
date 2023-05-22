import Head from "next/head";
import React from "react";

export default function layoutDocument({ title, children }) {
  // const pathname = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {children}


    </>
  );
}
