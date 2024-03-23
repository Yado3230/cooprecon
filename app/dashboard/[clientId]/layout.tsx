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
  return (
    <div>
      <MainNav className="mb-5" />
      <Separator className="my-4" />
      {children}
    </div>
  );
}
