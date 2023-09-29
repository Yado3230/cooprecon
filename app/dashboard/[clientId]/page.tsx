"use client";
import React, { useEffect, useState } from "react";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";
import { Reconciliation } from "@prisma/client";
import axios from "axios";

const Page = ({ params }: { params: { clientId: string } }) => {
  const [reconcilioations, setReconcilioations] = useState<Reconciliation[]>(
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Reconciliation[] = await axios
          .get(`/api/${params.clientId}/reconciliations`)
          .then((res) => res.data);
        setReconcilioations(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formattedclients: ClientColumn[] = reconcilioations?.map((item) => ({
    id: item.id,
    transactionReference: item.transactionReference,
    amount: item.amount,
    customerAccountNumber: item.customerAccountNumber,
    date: item.date,
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
