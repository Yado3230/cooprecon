import { format } from "date-fns";
import React from "react";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
import { Client } from "@prisma/client";
import prismadb from "@/lib/prismadb";

const Page = async () => {
  const clients: Client[] = await prismadb.client.findMany();

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
