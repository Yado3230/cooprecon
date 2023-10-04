"use client";
import { UserNav } from "./user-nav";
import { Menu } from "lucide-react";
import Image from "next/image";
import ClientSwitcher from "./client-switcher";
// import prismadb from "@/lib/prismadb";
import { Client } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllClients } from "@/actions/client.action";

const Navbar = async () => {
  // const clients: Client[] = await prismadb.client.findMany();
  const [clients, setClients] = useState<Client[]>([]);
  // const clients: Client[] = await prismadb.client.findMany();
  useEffect(() => {
    const fetchData = async () => {
      const clients: Client[] = await getAllClients();
      setClients(clients);
    };
    fetchData();
  }, []);

  return (
    <div className="fixed z-10 shadow-sm bg-background opacity-90 px- top-0 right-0 left-0">
      <div className="border-b">
        <div className="flex h-16 items-center px-10">
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
          <Menu className="absolute left-64 cursor-pointer" />
          <div className="ml-auto flex items-center space-x-4">
            <ClientSwitcher items={clients} />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
