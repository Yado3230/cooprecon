"use client";

import { SettlementSettingResponse } from "@/types/types";
import UserClient from "./components/client";
import { useEffect, useState } from "react";
import {
  getAllSettlements,
  getSettlementByClientId,
} from "@/actions/settlement-action";

const Page = () => {
  const [settlements, setSettlements] = useState<SettlementSettingResponse[]>(
    []
  );
  const clientId =
    typeof window !== "undefined" && localStorage.getItem("clientId");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettlementByClientId(Number(clientId));
      const data = res instanceof Array ? res : [];
      setSettlements(data);
    };
    fetchData();
  }, [clientId]);

  const formattedclients: SettlementSettingResponse[] = settlements.map(
    (item) => ({
      id: item.id,
      accountName: item.accountName,
      accountNumber: item.accountNumber,
      accountOfficer: item.accountOfficer,
      category: item.category,
      productType: item.productType,
      bank: item.bank,
      status: item.status,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    })
  );

  return (
    <div>
      <UserClient data={formattedclients} />
    </div>
  );
};

export default Page;
