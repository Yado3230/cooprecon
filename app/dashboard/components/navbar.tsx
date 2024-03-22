import { UserNav } from "./user-nav";
import { Menu } from "lucide-react";
import Image from "next/image";
import ClientSwitcher from "./client-switcher";
import prismadb from "@/lib/prismadb";

async function getClients() {
  // const feed = await prismadb.client.findMany();
  return [
    {
      id: "1",
      transactionReference: "1",
      amount: "1",
      customerAccountNumber: "1",
      date: "2022/12/12",
      operation: "1",
      status: "1",
    },
  ];
}

export const revalidate = 1;

const Navbar = async () => {
  const clients = await getClients();

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
            <ClientSwitcher items={clients} />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
