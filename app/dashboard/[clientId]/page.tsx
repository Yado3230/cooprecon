import { Reconciliation } from "@prisma/client";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";

const Page = async ({ params }: { params: { clientId: string } }) => {
  const reconciliations: Reconciliation[] =
    await prismadb.reconciliation.findMany({
      where: {
        clientId: params.clientId,
      },
    });

  const formattedclients: ClientColumn[] = reconciliations?.map((item) => ({
    id: item.id,
    transactionReference: item.transactionReference,
    amount: item.amount,
    customerAccountNumber: item.customerAccountNumber,
    date: item.date,
    operation: item.operation,
    status: item.status,
    // createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default Page;
