"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ClientApiColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface APIClientProps {
  data: ClientApiColumn[];
}

const APIClient: React.FC<APIClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Client API`} description="Manage client api" />
        <Button
          size="sm"
          className="bg-cyan-500"
          onClick={() => router.push(`/dashboard/clientapi/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        clickable={false}
        searchKey="domain"
        columns={columns}
        data={data}
      />
    </>
  );
};

export default APIClient;
