"use client";

import { UserResponse } from "@/types/types";
import UserClient from "./components/client";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/actions/user-actions";
import { useParams } from "next/navigation";

const Page = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers(Number(params.clientId));
      const data = res instanceof Array ? res : [];
      setUsers(data);
    };
    fetchData();
  }, []);

  const formattedclients: UserResponse[] = users.map((item) => ({
    userId: item.userId,
    fullName: item.fullName,
    role: item.role,
    status: item.status,
    email: item.email,
    lastLoggedIn: new Date(item.lastLoggedIn),
    registeredAt: new Date(item.registeredAt),
    registeredBy: item.registeredBy,
    updatedAt: item.updatedAt,
  }));

  return (
    <div>
      <UserClient data={formattedclients} />
    </div>
  );
};

export default Page;
