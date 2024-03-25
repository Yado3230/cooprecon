"use client";
import { getClientById } from "@/actions/client.action";
import { ReconciliationModalExisting } from "@/components/modals/reconciliation-modal-existing";
import { setClient } from "@/lib/features/client/clientSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default async function RootLayout({
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
      dispatch(setClient(res));
    };
    fetchData();
  }, [clientId]);

  return (
    <div>
      <ReconciliationModalExisting clientId={Number(clientId)} />
      {children}
    </div>
  );
}
