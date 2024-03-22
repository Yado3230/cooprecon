import prismadb from "@/lib/prismadb";
import { MainNav } from "./components/main-nav";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import Navbar from "../dashboard/components/navbar";
import Sidebar from "./components/sidebar";

export default async function RootLayout({
  children,
  params: { clientId },
}: {
  children: React.ReactNode;
  params: { clientId: string };
}) {
  // const client = await prismadb.client.findFirst({
  //   where: {
  //     id: clientId,
  //   },
  // });

  // if (!client) redirect("/dashboard");
  return (
    <div>
      <Navbar />
      <div className="">
        <Sidebar />
        <div className="mt-16 ml-64 p-5 h-full">{children}</div>
      </div>
      </div>
  );
}
