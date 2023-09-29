"use client";

import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
import { Client } from "@prisma/client";
import axios from "axios";

const Page = () => {
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Client[] = await axios
          .get("/api/clients")
          .then((res) => res.data);
        setClients(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formattedclients: ClientColumn[] = clients?.map((item) => ({
    id: item.id,
    clientName: item.clientName,
    accountNumber: item.accountNumber,
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
