"use client";
import { ReconciliationModalExisting } from "@/components/modals/reconciliation-modal-existing";

export default async function RootLayout({
  children,
  params: { clientId },
}: {
  children: React.ReactNode;
  params: { clientId: string };
}) {
  return (
    <div>
      <ReconciliationModalExisting clientId={Number(clientId)} />
      {/* <MainNav className="mb-5" /> */}
      {/* <Separator className="my-4" /> */}
      {children}
    </div>
  );
}
