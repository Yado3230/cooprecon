"use client";
import UserClient from "./components/client";
import {
  BankResponse,
  ProcessingTransactionTypeResponse,
  ProductTypeResponse,
} from "@/types/types";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/actions/product-action";
import { AccountForm } from "./account-form";
import { getAllProcessingTypes } from "@/actions/processing-action";

export default function SettingsAccountPage() {
  const [processingTransactionTypes, setProcessingTransactionTypes] = useState<
    ProcessingTransactionTypeResponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProcessingTypes();
      const data = res instanceof Array ? res : [];
      setProcessingTransactionTypes(data);
    };
    fetchData();
  }, []);

  const formattedclients: ProcessingTransactionTypeResponse[] =
    processingTransactionTypes.map((item) => ({
      id: item.id,
      name: item.name,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  return (
    <div className="space-y-6 w-full">
      {/* <div>
        <h3 className="text-lg font-medium">Bank</h3>
        <p className="text-sm text-muted-foreground">
          Update banks settings. add new bank.
        </p>
      </div>
      <Separator /> */}
      <div className="grid grid-cols-5 w-full gap-8">
        <UserClient data={formattedclients} />
        <AccountForm />
      </div>
    </div>
  );
}
