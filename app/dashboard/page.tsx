"use client";
import React, { useEffect, useMemo, useState } from "react";
import ClientReconciliation from "./components/client";
import { getAllClients } from "@/actions/client.action";
import { Client } from "@/types/types";

const Page = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllClients();
      const data = res instanceof Array ? res : [];
      setClients(data);
    };
    fetchData();
  }, []);


  const formattedclients: Client[] = clients.map((item) => ({
    id: item.id,
    clientName: item.clientName,
    logo: item.logo,
    status: item.status,
    description: item.description,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default Page;
