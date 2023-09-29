"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Import, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ClientColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ClientReconciliationProps {
  data: ClientColumn[];
}

const ClientReconciliation: React.FC<ClientReconciliationProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex border-b pb-2 items-center justify-between">
        {/* <Heading title={`Transactions`} description="Manage clients" /> */}
        <div></div>
        <div>
          <Button
            size="sm"
            className="bg-muted text-foreground mr-2"
            // onClick={() => router.push(`/dashboard/clients/new`)}
          >
            <Import className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button
            size="sm"
            className="bg-cyan-500"
            // onClick={() => router.push(`/dashboard/clients/new`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>
      {/* <Separator className="my-4" /> */}
      <DataTable searchKey="clientName" columns={columns} data={data} />
    </>
  );
};

export default ClientReconciliation;
