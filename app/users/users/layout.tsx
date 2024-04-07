"use client";

import { useAuth } from "@/app/api/auth/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useAuth();
  const role = typeof window !== "undefined" && localStorage.getItem("role");

  const router = useRouter();

  useEffect(() => {
    if (!accessToken || role !== "CLIENT-ADMIN") {
      router.push("/users/dashboard");
    }
  }, [accessToken, role]);

  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
