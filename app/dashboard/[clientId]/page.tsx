"use client";
import React from "react";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";

const page = async ({ params }: { params: { clientId: string } }) => {
  const clients = [
    {
      clientId: 1,
      clientName: "q",
      description: "Q",
      points: "ew",
    },
    {
      clientId: 2,
      clientName: "qfdsf",
      description: "Qdfs",
      points: "ewdsf",
    },
  ];

  const formattedclients: ClientColumn[] = clients.map((item) => ({
    clientId: item.clientId?.toString() || "00",
    clientName: item.clientName,
    description: item.description,
    points: item.points,
    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default page;
