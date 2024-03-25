"use client";

import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar";
// import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Head from "next/head";
import { useEffect } from "react";
import { setClient } from "@/lib/features/client/clientSlice";
import { RootState } from "@/lib/store";
// import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const activeClient = useSelector(
    (state: RootState) => state.client.activeClient
  );

  // useEffect(() => {
  //   dispatch(setClient(""));
  // }, []);
  // console.log("from client", activeClient);
  // const [domLoaded, setDomLoaded] = useState(false);

  // useEffect(() => {
  //   setDomLoaded(true);
  // }, []);

  // const { accessToken } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!domLoaded) {
  //     return;
  //   }

  //   if (!accessToken) {
  //     // Redirect to login page if not authenticated
  //     router.push("/");
  //   }
  // }, [domLoaded, accessToken, router]);

  // if (!domLoaded) {
  //   return null;
  // }

  return (
    <>
      <Head>Coop | Admin</Head>
      <div>
        <Navbar />
        <div className="">
          <Sidebar />
          <div className="mt-16 ml-64 p-5 h-full">{children}</div>
        </div>
      </div>
    </>
  );
}
