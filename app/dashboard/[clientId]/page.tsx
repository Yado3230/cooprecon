"use client";

import { Reconciliation } from "@prisma/client";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
// import prismadb from "@/lib/prismadb";
import { useEffect, useState } from "react";
// import axios from "axios";
import { getAllReconciliations } from "@/actions/reconciliation-action";

const Page = ({ params }: { params: { clientId: string } }) => {
  // const reconciliationss: Reconciliation[] =
  //   await prismadb.reconciliation.findMany({
  //     where: {
  //       clientId: params.clientId,
  //     },
  //   });

  const [reconciliations, setReconciliations] = useState<Reconciliation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllReconciliations(params.clientId.toString());
      setReconciliations(res);
    };
    fetchData();
  }, []);

  const formattedclients: ClientColumn[] = reconciliations.map((item) => ({
    id: item.id,
    transactionReference: item.transactionReference,
    amount: item.amount,
    customerAccountNumber: item.customerAccountNumber,
    date: item.date,
    operation: item.operation,
    status: item.status,
    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default Page;
