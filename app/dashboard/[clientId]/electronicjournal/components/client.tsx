"use client";

import { ServiceStationModal } from "@/components/modals/service-station-modal";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ServiceStationResponse } from "@/types/types";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { EJModal } from "@/components/modals/ej-modal";
import { useEJModal } from "@/hooks/use-ej-modal";

interface UserClientProps {
  data: ServiceStationResponse[];
}

const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const params = useParams();
  const ejModal = useEJModal();

  return (
    <div className="w-full">
      <EJModal clientId={Number(params.clientId)} />
      <div className="flex border-b pb-2 mb-3 items-center justify-between">
        <Heading
          title={`EJ File (${data.length})`}
          description="Manage Electronic Journal"
        />
        <div></div>
        <div>
          <Button
            size="sm"
            className="bg-cyan-500"
            onClick={() => ejModal.onOpen()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add EJ
          </Button>
        </div>
      </div>
      <DataTable
        clickable={false}
        searchKey="name"
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default UserClient;
