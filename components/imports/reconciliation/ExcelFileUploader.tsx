import React, { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { Input } from "semantic-ui-react";
import { Reconciliation } from "@prisma/client";

interface ExcelFileUploaderProps {
  onDataUpload: (data: Reconciliation[]) => void;
}

const ExcelFileUploader: React.FC<ExcelFileUploaderProps> = ({
  onDataUpload,
}) => {
  const [excelData, setExcelData] = useState<Reconciliation[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });

        setExcelData(jsonData);

        // Find the desired column index in the first row
        const firstRow: any = jsonData[0];
        const txnIdIndex = firstRow.findIndex((cell: string | undefined) =>
          cell?.toLowerCase().includes("Transaction Reference".toLowerCase())
        );
        const amountIndex = firstRow.findIndex((cell: string | undefined) =>
          cell?.toLowerCase().includes("Amount".toLowerCase())
        );
        const accountNumberIndex = firstRow.findIndex(
          (cell: string | undefined) =>
            cell
              ?.toLowerCase()
              .includes("Customer Awach Account No".toLowerCase())
        );
        const reversalReferenceIndex = firstRow.findIndex(
          (cell: string | undefined) =>
            cell?.toLowerCase().includes("Reversal Reference".toLowerCase())
        );
        const letterNoIndex = firstRow.findIndex((cell: string | undefined) =>
          cell?.toLowerCase().includes("Letter No".toLowerCase())
        );
        const interestReferenceIndex = firstRow.findIndex(
          (cell: string | undefined) =>
            cell?.toLowerCase().includes("Interest Reference".toLowerCase())
        );
        const operationIndex = firstRow.findIndex((cell: string | undefined) =>
          cell?.toLowerCase().includes("Opration".toLowerCase())
        );
        const dateIndex = firstRow.findIndex((cell: string | undefined) =>
          cell?.toLowerCase().includes("Date".toLowerCase())
        );

        const mappedData: any[] = jsonData
          .slice(1) // Exclude the first row
          .map((row: any[]) => ({
            transactionReference: row[txnIdIndex]?.toString(),
            amount: row[amountIndex]?.toString() || "",
            customerAccountNumber: row[accountNumberIndex]?.toString() || "",
            reversalReference: row[reversalReferenceIndex]?.toString() || "",
            letterNo: row[letterNoIndex]?.toString() || "",
            interestReference: row[interestReferenceIndex]?.toString() || "",
            operation: row[operationIndex]?.toString()?.toLowerCase() || "",
            date: row[dateIndex]?.toString() || "",
            status: "pending",
          }));

        onDataUpload(mappedData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return <Input type="file" onChange={handleFileUpload} />;
};

export default ExcelFileUploader;
