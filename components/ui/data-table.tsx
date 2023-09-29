"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { useParams, useRouter } from "next/navigation";
import { Input } from "./input";
import { Button } from "./button";
import axios from "axios";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  clickable: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  clickable,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();
  // const params = useParams();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleCheckButton = async () => {
    //   await axios.post("http://10.1.245.150:7081/v1/cbo/", {
    //     AwachFundTransferRequest: {
    //       ESBHeader: {
    //         serviceCode: "630000",
    //         channel: "USSD",
    //         Service_name: "AwachFundTransfer",
    //         Message_Id: "FT82040900",
    //       },
    //       FundsTransfer: {
    //         CreditAcctNo: "1000427051",
    //         CreditAmount: "50",
    //       },
    //     },
    //   });
    // };
    async function fetchData(item: any) {
      try {
        await axios
          .post("http://10.1.245.150:7081/v1/cbo/", {
            AwachFundTransferRequest: {
              ESBHeader: {
                serviceCode: "630000",
                channel: "USSD",
                Service_name: "AwachFundTransfer",
                Message_Id: item.transactionReference,
              },
              FundsTransfer: {
                CreditAcctNo: item.customerAccountNumber,
                CreditAmount: item.amount,
              },
            },
          })
          .then((res) => res.data);
        // console.log("success", item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchDataLoop() {
      for (const item of table.getFilteredSelectedRowModel().rows) {
        await fetchData(item.original);
      }
    }
    fetchDataLoop();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search ..."
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-2"
        />
        {!clickable && (
          <div className="flex w-full items-center justify-between">
            <div className="ml-2">
              <DataTableToolbar table={table} />
            </div>
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <div>
                <Button onClick={handleCheckButton} variant="secondary">
                  Check
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`${clickable && "cursor-pointer"}`}
                  onClick={() =>
                    clickable &&
                    router.push(`/dashboard/${row._valuesCache.id}`)
                  }
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
