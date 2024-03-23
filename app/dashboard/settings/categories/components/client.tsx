"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useUserModal } from "@/hooks/use-user-modal";
import { CategoryResponse } from "@/types/types";
// import { useSession } from "next-auth/react";

interface UserClientProps {
  data: CategoryResponse[];
}

const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const userModal = useUserModal();
  // const { data: session } = useSession();

  return (
    <div className="col-span-3">
      <DataTable
        clickable={false}
        searchKey="fullName"
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default UserClient;
