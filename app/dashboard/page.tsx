"use client";

import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(auth)/contexts/AuthContext";

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
      // Redirect to login page if not authenticated
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
          <div className="mt-16 ml-72 p-5 h-full">{children}</div>
        </div>
      </div>
    </>
  );
}
