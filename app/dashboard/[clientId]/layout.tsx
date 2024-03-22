import prismadb from "@/lib/prismadb";
import { MainNav } from "./components/main-nav";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

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
      <MainNav className="mb-5" />
      <Separator className="my-4" />
      {children}
    </div>
  );
}
