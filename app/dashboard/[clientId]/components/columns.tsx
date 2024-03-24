"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ReconProcessTracker } from "@/types/types";
import { useReconciliationModalExisting } from "@/hooks/use-reconciliation-modal-esisting";

const ReconProcessCell = ({ row }: any) => {
  const reconciliationModal = useReconciliationModalExisting();

  return (
    <div>
      <div>
        {!row.original.ethSwitchFile ? (
          <Button
            className="w-full"
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.setItem("fileUploadDate", row.original.date);
              localStorage.setItem("fileTypeProps", "ETH-SWITCH");
              reconciliationModal.onOpen();
            }}
          >
            Upload File
          </Button>
        ) : (
          <div className="w-full">
            <span>{row.original.ethSwitchFile}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const columns: ColumnDef<ReconProcessTracker>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        disabled={
          row.original.status === "success" ||
          row.original.status === "inprogress"
        }
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cbs",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CBS File
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.cbsFile ? (
            <Button className="w-full" variant="outline" size="sm">
              Upload File
            </Button>
          ) : (
            <div className="w-full">
              <span>{row.original.cbsFile}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "ethswitch",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Eth-Switch File
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <ReconProcessCell row={row} />,
  },
  {
    accessorKey: "coopswitch",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coop-Switch File
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {!row.original.coopSwitchFile ? (
            <Button className="w-full" variant="outline" size="sm">
              Upload File
            </Button>
          ) : (
            <div className="w-full">
              <span>{row.original.coopSwitchFile}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "addedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Added At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div
  //         className={`flex w-[100px] items-center`}
  //         style={{ color: status.color }}
  //       >
  //         {status.icon && <status.icon className="mr-2 h-4 w-4" />}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "processingStartedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Process
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <>
          {row.original.processingStartedAt.length === 0 ? (
            <Button className="w-full" variant="default" size="sm">
              Start Process
            </Button>
          ) : (
            <div>
              <span>{row.original.processingStartedAt}</span>
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "details",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Details
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <>
          {row.original.status?.toLowerCase() === "completed" ? (
            <Button variant="secondary" size="sm">
              Details
            </Button>
          ) : (
            <Button disabled variant="secondary" size="sm">
              Details
            </Button>
          )}
        </>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
