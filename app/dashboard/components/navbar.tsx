"use client";

import { UserNav } from "./user-nav";
import { Menu } from "lucide-react";
import Image from "next/image";
import ClientSwitcher from "./client-switcher";
import { useEffect, useState } from "react";
import { Client } from "@/types/types";
import { getAllClients } from "@/actions/client.action";

const Navbar = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllClients();
      const data = res instanceof Array ? res : [];
      setClients(data);
    };
    fetchData();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-10 shadow-sm bg-background opacity-90 px-">
      <div className="border-b">
        <div className="flex items-center h-16 px-10">
          <div className="flex items-center justify-start space-x-2">
            <div>
              <Image
                src="/images/coop-logo.png"
                width={90}
                height={40}
                alt="img"
              />
            </div>
          </div>
          <Menu className="absolute cursor-pointer left-64" />
          <div className="flex items-center ml-auto space-x-4">
            {typeof window !== "undefined" &&
              localStorage.getItem("role")?.includes("SUPER-ADMIN") && (
                <ClientSwitcher items={clients} />
              )}
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
