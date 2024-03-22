import { Reconciliation } from "@prisma/client";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";

async function getReconciliations(id: string) {
  const feed = await prismadb.reconciliation.findMany({
    where: {
      clientId: id,
    },
  });
  return feed;
}

export const revalidate = 1;

const Page = async ({ params }: { params: { clientId: string } }) => {
  const reconciliations: Reconciliation[] = await getReconciliations(
    params.clientId.toString()
  );

  const formattedclients: ClientColumn[] = reconciliations.map((item) => ({
    id: item.id,
    transactionReference: item.transactionReference,
    amount: item.amount,
    customerAccountNumber: item.customerAccountNumber,
    date: item.date,
    operation: item.operation,
    status: item.status,
  }));

  
  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default Page;
