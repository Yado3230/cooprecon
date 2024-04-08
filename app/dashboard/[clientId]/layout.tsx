"use client";
import { getClientById } from "@/actions/client.action";
import { setClient } from "@/lib/features/client/clientSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function RootLayout({
  children,
  params: { clientId },
}: {
  children: React.ReactNode;
  params: { clientId: string };
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getClientById(Number(clientId));
      console.log(res);
      res && dispatch(setClient(res));
    };
    fetchData();
  }, [clientId, dispatch]);

  return (
    <div>
      {children}
    </div>
  );
}
