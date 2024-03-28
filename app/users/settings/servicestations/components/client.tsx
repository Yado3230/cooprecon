"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ServiceStationResponse } from "@/types/types";

interface UserClientProps {
  data: ServiceStationResponse[];
}

const UserClient: React.FC<UserClientProps> = ({ data }) => {
  return (
    <div className="col-span-3">
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
