"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { labels } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import {
  ReconciliationFileCBS,
  ReconciliationFileETHSWITCH,
} from "@/types/types";

export const columnsswitch: ColumnDef<ReconciliationFileETHSWITCH>[] = [
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
    accessorKey: "refNum37",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="refNum37" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.status);

      return (
        <div className="flex space-x-1 items-center justify-between">
          {label && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {label.value}
            </span>
          )}
          <div className="w-[120px] font-medium">
            {row.getValue("refNum37")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "reconType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="reconType" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] text-sm">{row.getValue("reconType")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "panNumber",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="panNumber" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[120px] text-sm">{row.getValue("panNumber")}</div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "acquirer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="acquirer" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px] whitespace-nowrap text-sm">
        {row.getValue("acquirer")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "issuer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="issuer" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px] whitespace-nowrap text-sm">
        {row.getValue("issuer")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="amount" />
    ),
    cell: ({ row }) => (
      <div className="w-[110px] text-sm flex items-center justify-between">
        <span>{row.getValue("amount")}</span>
        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-1 py-0.5 rounded">
          ETB
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="date" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] whitespace-nowrap text-sm">
        {row.getValue("date")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
