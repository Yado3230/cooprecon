"use client";

import { Button } from "@/components/ui/button";
import { Import, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useReconciliationModal } from "@/hooks/use-reconciliation-modal";
import { ReconciliationModal } from "@/components/modals/reconciliation-modal";
import { ReconProcessTracker } from "@/types/types";

interface ClientReconciliationProps {
  data: ReconProcessTracker[];
}

const ClientReconciliation: React.FC<ClientReconciliationProps> = ({
  data,
}) => {
  const reconciliationModal = useReconciliationModal();
  // const clientModal = useClientModal();
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <ReconciliationModal
        clientId={Number(params.clientId)}
      />
      <div className="flex border-b pb-2 items-center justify-between">
        {/* <Heading title={`Transactions`} description="Manage clients" /> */}
        <div></div>
        <div>
          {/* <Button
            size="sm"
            variant="outline"
            className="mr-2"
            onClick={() => router.push(`/dashboard/${params.clientId}/upload`)}
          >
            <Import className="mr-2 h-4 w-4" />
            Import
          </Button> */}
          <Button
            size="sm"
            className="bg-cyan-500"
            onClick={() => reconciliationModal.onOpen()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>
      {/* <Separator className="my-4" /> */}
      <DataTable
        searchKey="transactionReference"
        clickable={false}
        columns={columns}
        data={data}
      />
    </>
  );
};

export default ClientReconciliation;
