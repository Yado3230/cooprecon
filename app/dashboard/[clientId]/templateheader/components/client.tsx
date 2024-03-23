"use client";

import { ClientColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ClientReconciliationProps {
  data: ClientColumn[];
}

const ClientReconciliation: React.FC<ClientReconciliationProps> = ({
  data,
}) => {
  return (
    <div className="border p-3 shadow">
      <div className="flex pb-2 items-center justify-between"></div>
      <DataTable
        searchKey="templateName"
        clickable={false}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default ClientReconciliation;
