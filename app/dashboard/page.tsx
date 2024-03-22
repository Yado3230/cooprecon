import { format } from "date-fns";
import React from "react";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";

async function getClients() {
  const feed = await prismadb.client.findMany();
  return feed;
}
export const revalidate = 1;

const Page = async () => {
  const clients = await getClients();

  const formattedclients: ClientColumn[] = clients.map((item) => ({
    id: item.id,
    clientName: item.clientName,
    logoUrl: item.logoUrl,
    description: item.description,
    createdAt: new Date(item.createdAt).toISOString().split("T")[0],
  }));
  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default Page;
