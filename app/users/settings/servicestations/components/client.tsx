"use client";

import { ServiceStationModal } from "@/components/modals/service-station-modal";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ServiceStationResponse } from "@/types/types";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useServiceStationModal } from "@/hooks/use-service-station-modal";
import { Button } from "@/components/ui/button";

interface UserClientProps {
  data: ServiceStationResponse[];
}

const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const clientId =
    typeof window !== "undefined" && localStorage.getItem("clientId");
  const serviceStationModal = useServiceStationModal();

  return (
    <div className="w-full">
      <ServiceStationModal clientId={Number(clientId)} />
      <div className="flex border-b pb-2 mb-3 items-center justify-between">
        <Heading
          title={`Service Stations (${data.length})`}
          description="Manage service stations"
        />
        <div></div>
        <div>
          <Button
            size="sm"
            className="bg-cyan-500"
            onClick={() => serviceStationModal.onOpen()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Station
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
