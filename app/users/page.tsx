import { Reconciliation } from "@prisma/client";
import ClientReconciliation from "./components/client";
import { ClientColumn } from "./components/columns";

const Page = async ({ params }: { params: { clientId: string } }) => {
 const  reconciliations = [
  {
    id: "1",
    transactionReference: "ew",
    amount: "ew",
    customerAccountNumber: "we",
    date: "we",
    operation: "we",
    status: "we",
  }
 ]

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
