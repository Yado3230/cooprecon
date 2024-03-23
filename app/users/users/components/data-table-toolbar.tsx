"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { types, statuses } from "./data";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UserDataTableToolbox<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("STATUS") && (
          <DataTableFacetedFilter
            column={table.getColumn("STATUS")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("TRANSACTIONTYPE") && (
          <DataTableFacetedFilter
            column={table.getColumn("TRANSACTIONTYPE")}
            title="Type"
            options={types}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="ml-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
