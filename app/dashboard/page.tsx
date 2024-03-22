import { format } from "date-fns";
import React from "react";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";

async function getClients() {
  // const feed = await prismadb.client.findMany();
  return [
    {
      id: "1",
      transactionReference: "1",
      amount: "1",
      customerAccountNumber: "1",
      date: "2022/12/12",
      operation: "1",
      status: "1",
    },
  ];
}
export const revalidate = 1;

const Page = async () => {
  const clients = await getClients();

  const formattedclients: ClientColumn[] = clients.map((item) => ({
    id: item.id,
    clientName: item.clientName,
    logoUrl: item.logoUrl,
    description: item.description,
    createdAt: new Date(item.createdAt),
  }));
  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default Page;
