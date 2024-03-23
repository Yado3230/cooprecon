"use client";
import { Separator } from "@/components/ui/separator";
import { AccountForm } from "@/app/users/settings/banks/account-form";
import { BankResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { getAllBanks } from "@/actions/bank.action";
import UserClient from "./banks/components/client";

export default function SettingsAccountPage() {
  const [banks, setBanks] = useState<BankResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBanks();
      const data = res instanceof Array ? res : [];
      setBanks(data);
    };
    fetchData();
  }, []);

  const formattedclients: BankResponse[] = banks.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
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
