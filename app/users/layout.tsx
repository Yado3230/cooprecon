"use client";

import { useEffect, useState } from "react";
import Navbar from "../dashboard/components/navbar";
import Sidebar from "./components/sidebar";
import { useAuth } from "../api/auth/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default async function RootLayout({
  children,
  params: { clientId },
}: {
  children: React.ReactNode;
  params: { clientId: string };
}) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const { accessToken } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!domLoaded) {
  //     return;
  //   }

  //   if (!accessToken) {
  //     router.push("/");
  //   }
  // }, [domLoaded, accessToken, router]);

  // if (!domLoaded) {
  //   return null;
  // }
  return (
    <div>
      <Navbar />
      <div className="">
        <Sidebar />
        <div className="mt-16 ml-64 p-5 h-full">{children}</div>
      </div>
    </div>
  );
}
