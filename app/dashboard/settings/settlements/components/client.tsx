"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { SettlementSettingResponse } from "@/types/types";
import { Heading } from "@/components/ui/heading";
import { useUserModal } from "@/hooks/use-user-modal";
import { UserModal } from "@/components/modals/user-modal";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

interface UserClientProps {
  data: SettlementSettingResponse[];
}

const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const userModal = useUserModal();
  const router = useRouter();
  const clientId = localStorage.getItem("clientId")
  // const { data: session } = useSession();

  return (
    <>
      <UserModal clientId={} />
      <div className="flex border-b pb-2 mb-3 items-center justify-between">
        <Heading
          title={`Settlements (${data.length})`}
          description="Manage settlements"
        />
        <div></div>
        <div>
          {/* @ts-ignore */}
          <Button
            size="sm"
            className="bg-cyan-500"
            onClick={() => router.push(`/users/settings/settlements/new`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
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
