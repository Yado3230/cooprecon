"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { useUserModal } from "@/hooks/use-user-modal";
import { UserModal } from "@/components/modals/user-modal";
import { BankResponse, ProcessingTransactionTypeResponse, ProductTypeResponse } from "@/types/types";
// import { useSession } from "next-auth/react";

interface UserClientProps {
  data: ProcessingTransactionTypeResponse[];
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
