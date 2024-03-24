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
// import { Loader } from "lucide-react";
import Loading from "@/app/loading";
import { setClient } from "@/lib/features/client/clientSlice";
import { useDispatch } from "react-redux";

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
  const [loading, setLoading] = React.useState(false);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

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

  const handleProcessClick = async () => {
    setLoading(true);

    // @ts-ignore
    async function fetchDataForOperation(item, requestData) {
      try {
        const response = await axios.post(
          "http://10.1.245.150:7081/v1/cbo/",
          requestData
        );

        if (response.status === 200) {
          // axios.patch(`/api/${params.clientId}/reconciliations/${requestData.id}`, {
          //   status:
          //     response.data.AwachFundTransferResponse.ESBStatus.status?.toLowerCase(),
          // });
          fetch(`/api/${params.clientId}/reconciliations/${item.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status:
                response.data.AwachFundTransferResponse?.ESBStatus.status?.toLowerCase() ||
                response.data.AwachFTReversalResponse?.ESBStatus.status?.toLowerCase() ||
                response.data.AwachFTRevesalNextDayResponse?.ESBStatus.status?.toLowerCase() ||
                response.data.AwachFTLumpSumResponse?.ESBStatus.status?.toLowerCase() ||
                response.data.AwachFTIntResponse?.ESBStatus.status?.toLowerCase(),
            }),
          }).catch((error) => {
            console.log(error);
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    // @ts-ignore
    async function fetchData(item) {
      switch (item.operation) {
        case "ft":
          await fetchDataForOperation(item, {
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
          });
          break;

        case "ft interest":
          await fetchDataForOperation(item, {
            AwachFTIntRequest: {
              ESBHeader: {
                serviceCode: "640000",
                channel: "USSD",
                Service_name: "AwachFTInt",
                Message_Id: item.transactionReference,
              },
              FundsTransferInt: {
                CreditAmount: item.amount,
                Ref: item.interestReference,
              },
            },
          });
          break;

        case "ft reversal next day":
          await fetchDataForOperation(item, {
            AwachAwachFTRevesalNextDayRequest: {
              ESBHeader: {
                serviceCode: "870000",
                channel: "USSD",
                Service_name: "AwachFTRevesalNextDay",
                Message_Id: item.transactionReference,
              },
              Reversal: {
                DebitAcctNo: item.customerAccountNumber,
                CreditAmount: item.amount,
                Ref: item.reversalReference,
                LetterNo: item.letterNo,
              },
            },
          });
          break;

        case "ft reversal":
          await fetchDataForOperation(item, {
            AwachFTReversalRequest: {
              ESBHeader: {
                serviceCode: "850000",
                channel: "USSD",
                Service_name: "AwachFTReversal",
                Message_Id: item.transactionReference,
              },
              Revesal: {
                transactionId: item.reversalReference,
              },
            },
          });
          break;
        case "ft lump sum":
          await fetchDataForOperation(item, {
            AwachFTLumpSumRequest: {
              ESBHeader: {
                serviceCode: "830000",
                channel: "USSD",
                Service_name: "AwachFTLumpSum",
                Message_Id: item.transactionReference,
              },
              FundsTransferLumpSum: {
                CreditAmount: item.amount,
                LetterNo: item.letterNo,
              },
            },
          });
          break;

        default:
          console.log("Unknown operation:", item.operation);
      }
    }

    try {
      for (const item of table.getFilteredSelectedRowModel().rows) {
        await fetchData(item.original);
      }
      router.refresh();
    } catch (error) {
      console.error("Error processing data:", error);
    }
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
                  onClick={() => {
                    dispatch(setClient(row._valuesCache));
                    clickable &&
                      router.push(`/dashboard/${row._valuesCache.id}`);
                  }}
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
