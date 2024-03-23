"use client";
import UserClient from "./components/client";
import {  CategoryResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/actions/category-action";
import { AccountForm } from "./account-form";

export default function SettingsAccountPage() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCategories();
      const data = res instanceof Array ? res : [];
      setCategories(data);
    };
    fetchData();
  }, []);

  const formattedclients: CategoryResponse[] = categories.map((item) => ({
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
