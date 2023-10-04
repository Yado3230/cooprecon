"use client";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
import { Client } from "@prisma/client";
// import { getAllClients } from "@/actions/client.action";

async function getData() {
  const res = await fetch("/api/clients", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Page = async () => {
  const clients: Client[] = await getData();

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
