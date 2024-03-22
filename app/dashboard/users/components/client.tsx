"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { UserResponse } from "@/types/types";
import { Heading } from "@/components/ui/heading";
import { useUserModal } from "@/hooks/use-user-modal";
import { UserModal } from "@/components/modals/user-modal";
// import { useSession } from "next-auth/react";

interface UserClientProps {
  data: UserResponse[];
}

const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const userModal = useUserModal();
  // const { data: session } = useSession();

  return (
    <>
      <UserModal />
      <div className="flex border-b pb-2 mb-3 items-center justify-between">
        <Heading title={`Users (${data.length})`} description="Manage users" />
        <div></div>
        <div>
          {/* @ts-ignore */}
          <Button
            size="sm"
            className="bg-cyan-500"
            onClick={() => userModal.onOpen()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      <DataTable
        clickable={false}
        searchKey="fullName"
        columns={columns}
        data={data}
      />
    </>
  );
};

export default UserClient;
