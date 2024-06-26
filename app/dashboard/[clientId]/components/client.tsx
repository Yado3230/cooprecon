import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import DataTable from "react-data-table-component";
import { useReconciliationModal } from "@/hooks/use-reconciliation-modal";
import { ReconciliationModal } from "@/components/modals/reconciliation-modal";
import { ProcessingResponse, ReconProcessTracker } from "@/types/types";
import { reconTrackerApproval } from "@/actions/header-template.action";
import toast from "react-hot-toast";
import { ProcessModal } from "@/components/modals/process-modal";
import { useProcessModal } from "@/hooks/use-process-modal";
import { getReconcilationDetails } from "@/actions/processing-action";

interface ClientReconciliationProps {
  data: ReconProcessTracker[];
  updated: boolean;
  setUpdated: Dispatch<SetStateAction<boolean>>;
}

const ClientReconciliation: React.FC<ClientReconciliationProps> = ({
  data,
  updated,
  setUpdated,
}) => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");

  const reconciliationModal = useReconciliationModal();
  const processModal = useProcessModal();
  const params = useParams();
  const router = useRouter();

  const columns = [
    {
      name: "Date",
      selector: (row: { date: any }) => row.date,
      sortable: true,
    },
    {
      name: "#File Uploaded",
      selector: (row: { reconFileApprovalTrackers: any; approvals: any }) =>
        row.reconFileApprovalTrackers.length,
      sortable: true,
    },
    {
      name: "Approval Status",
      selector: (row: {
        reconFileApprovalTrackers: any;
        approvals: any;
        status: any;
      }) =>
        row.reconFileApprovalTrackers
          .map(
            (item: { requiredApprovals: any; approvalCount: any }) =>
              item.requiredApprovals !== item.approvalCount
          )
          .includes(true)
          ? "PENDING"
          : "APPROVED",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: { status: any }) => row.status,
      sortable: true,
    },
    {
      name: "Process",
      selector: (row: {
        date(date: any): unknown;
        id: any;
        reconFileApprovalTrackers: any;
        status: any;
        approvals: any;
        processingStartedAt: any;
      }) =>
        row.reconFileApprovalTrackers
          .map(
            (item: { requiredApprovals: any; approvalCount: any }) =>
              item.requiredApprovals !== item.approvalCount
          )
          .includes(true) ? (
          <Button
            className="w-full my-1"
            onClick={() => processModal.onOpen()}
            variant="default"
            disabled
            size="sm"
          >
            Start Process
          </Button>
        ) : row.status === "PENDING" ? (
          <Button
            className="w-full my-1"
            onClick={() => {
              // @ts-ignore
              setSelectedDate(row.date);
              processModal.onOpen();
            }}
            variant="default"
            size="sm"
          >
            Start Process
          </Button>
        ) : (
          <Button
            className="w-full my-1"
            onClick={() => processModal.onOpen()}
            variant="default"
            disabled
            size="sm"
          >
            Processing
          </Button>
        ),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row: { addedAt: string | number | Date }) =>
        new Date(row.addedAt).toISOString().split("T")[0],
      sortable: true,
    },
    {
      name: "actions",
      selector: (row: {
        processingEndedAt: any;
        processingStartedAt: any;
        id: any;
      }) => {
        return (
          <Button
            className="w-full my-1"
            onClick={() =>
              router.push(`/dashboard/${params.clientId}/details/${row.id}`)
            }
            disabled={
              row.processingEndedAt ||
              row.processingStartedAt === undefined ||
              row.processingStartedAt === null
            }
            variant="secondary"
            size="sm"
          >
            Details
          </Button>
        );
      },
      sortable: true,
    },
  ];

  const ExpandableTableComponent = ({ data }: any) => {
    const columnOne = [
      {
        name: "ID",
        selector: (row: { id: any }) => row.id,
        sortable: true,
      },
      {
        name: "File Type",
        selector: (row: { fileType: any }) => row.fileType,
        sortable: true,
      },
      // {
      //   name: "File Name",
      //   selector: (row: { fileName: any }) => row.fileName,
      //   sortable: true,
      // },
      {
        name: "Transaction Number",
        selector: (row: { totalTransactionNumber: any }) =>
          row.totalTransactionNumber,
        sortable: true,
      },
      {
        name: "Added By",
        selector: (row: { addedByUserFullName: any }) =>
          row.addedByUserFullName,
        sortable: true,
      },
      {
        name: "Approver",
        selector: (row: { listOfApprover: any }) =>
          `[ ${row.listOfApprover[0] || ""} ,${row.listOfApprover[1] || ""} ]`,
        sortable: true,
      },
      {
        name: "User",
        selector: (row: { createdAt: any }) =>
          new Date(row.createdAt).toISOString().split("T")[0],
        sortable: true,
      },
      {
        name: "Status",
        selector: (row: {
          id(id: any): number;
          requiredApprovals: any;
          approvalCount: any;
          createdAt: any;
        }) =>
          row.approvalCount === row.requiredApprovals ? (
            "Approved"
          ) : (
            <Button
              className="w-full my-1"
              onClick={async () => {
                try {
                  const res = await reconTrackerApproval(Number(row.id));
                  if (res) {
                    toast.success("approved");
                  }
                } catch (error) {
                  toast.error("Failed to approve");
                } finally {
                  setUpdated(!updated);
                }
              }}
              variant="outline"
              size="sm"
            >
              Approve
            </Button>
          ),
        sortable: true,
      },
    ];

    return (
      <div className="bg-gray-500">
        <div className="m-2 mx-2 border-x-2 border-cyan-500">
          <DataTable
            // @ts-ignore
            columns={columnOne}
            data={data.reconFileApprovalTrackers}
            dense
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <ProcessModal clientId={Number(params.clientId)} date={selectedDate} />
      <ReconciliationModal clientId={Number(params.clientId)} />
      <div className="flex border-b pb-2 mb-6 items-center justify-between">
        <Heading
          title={`Reconciliations`}
          description="Manage reconciliations"
        />
        <div>
          <Button
            size="sm"
            className="bg-cyan-500"
            onClick={() => reconciliationModal.onOpen()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>
      <div>
        <DataTable
          // @ts-ignore
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          expandableRows
          dense
          expandableRowsComponent={ExpandableTableComponent}
          expandableRowExpanded={(row) => expandedRowId === row.id.toString()}
        />
      </div>
    </>
  );
};

export default ClientReconciliation;
