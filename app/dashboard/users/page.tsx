"use client";

import { UserResponse } from "@/types/types";
import UserClient from "./components/client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getAllUsers } from "@/actions/user-actions";

const Page = () => {
  const [accounts, setAccounts] = useState<UserResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      const data = res instanceof Array ? res : [];
      setAccounts(data);
    };
    fetchData();
  }, []);

  const formattedclients: UserResponse[] = accounts.map((item) => ({
    userId: item.userId,
    fullName: item.fullName,
    roleName: item.roleName,
    userStatus: item.userStatus,
    additionalAuthorities: item.additionalAuthorities,
    merchant_status: item.userStatus,
    enabled: item.enabled,
    email: item.email,
    lastLogin: item.lastLogin,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
  }));
  return (
    <div>
      <UserClient data={formattedclients} />
    </div>
  );
};

export default Page;
