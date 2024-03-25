"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { labels } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "TRANS_REF",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TRANS_REF" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] text-sm">{row.getValue("TRANS_REF")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "RETRIEVAL_REF_NO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RETRIEVAL_REF_NO" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.CHECKUP
      );

      return (
        <div className="flex space-x-1 items-center justify-between">
          {label && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {label.value}
            </span>
          )}
          <div className="w-[120px] font-medium">
            {row.getValue("RETRIEVAL_REF_NO")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "TRANS_STATUS",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TRANS_STATUS" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-sm">{row.getValue("TRANS_STATUS")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "PAN_NUMBER",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAN_NUMBER" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] text-sm">{row.getValue("PAN_NUMBER")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "DEBIT_ACCT_NO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DEBIT_ACCT_NO" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-sm">{row.getValue("DEBIT_ACCT_NO")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "CREDIT_ACCT_NO",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CREDIT_ACCT_NO" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-sm">{row.getValue("CREDIT_ACCT_NO")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "TXN_AMOUNT",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TXN_AMOUNT" />
    ),
    cell: ({ row }) => (
      <div className="w-[110px] text-sm flex items-center justify-between">
        <span>{row.getValue("TXN_AMOUNT")}</span>
        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-1 py-0.5 rounded">
          ETB
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "VALUE_DATE",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VALUE_DATE" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-sm">{row.getValue("VALUE_DATE")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
