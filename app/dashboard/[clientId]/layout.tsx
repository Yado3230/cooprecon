import { MainNav } from "./components/main-nav";
import { Separator } from "@/components/ui/separator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainNav className="mb-5" />
      <Separator className="my-4" />
      {children}
    </div>
  );
}
