"use client";
import React from "react";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";

const page = async ({ params }: { params: { clientId: string } }) => {
  const clients = [
    {
      clientId: 1,
      clientName: "q",
      accountNo: "Q",
      description: "ew",
    },
    {
      clientId: 2,
      clientName: "q",
      accountNo: "Q",
      description: "ew",
    },
  ];

  const formattedclients: ClientColumn[] = clients.map((item) => ({
    clientId: item.clientId?.toString() || "00",
    clientName: item.clientName,
    accountNo: item.accountNo,
    description: item.description,
    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default page;
