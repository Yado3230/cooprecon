"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useClientModal } from "@/hooks/use-client-modal";
import { Client } from "@/types/types";

interface ClientReconciliationProps {
  data: Client[];
}

const ClientReconciliation: React.FC<ClientReconciliationProps> = ({
  data,
}) => {
  const clientModal = useClientModal();

  return (
    <>
      <div className="flex border-b pb-2 items-center justify-between">
        <div></div>
        <div>
          <Button
            size="sm"
            className="bg-cyan-500"
            onClick={() => {
              clientModal.onOpen();
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>
      <DataTable
        searchKey="clientName"
        clickable={true}
        columns={columns}
        data={data}
      />
    </>
  );
};

export default ClientReconciliation;
