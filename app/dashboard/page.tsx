"use client";

import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
import { Client } from "@prisma/client";
import axios from "axios";
import { getAllClients } from "@/actions/client.action";
// import { getAllClients } from "@/actions/client.action";

const Page = async () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllClients();
      setClients(res);
    };
    fetchData();
  }, []);

  const formattedclients: ClientColumn[] = clients.map((item) => ({
    id: item.id,
    clientName: item.clientName,
    logoUrl: item.logoUrl,
    description: item.description,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
  }));
  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default Page;
