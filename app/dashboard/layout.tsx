"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../api/auth/contexts/AuthContext";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Head from "next/head";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!domLoaded) {
      return;
    }

    if (!accessToken) {
      router.push("/");
    }
  }, [domLoaded, accessToken, router]);

  if (!domLoaded) {
    return null;
  }

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
