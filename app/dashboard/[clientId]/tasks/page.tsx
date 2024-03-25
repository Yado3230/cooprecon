import { Metadata } from "next";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks

export default function TaskPage() {
  const tasks = [
    {
      TRANS_REF: "FT24079R8D5L",
      CHECKUP: "ETH-SWITCH",
      TRANS_STATUS: "PROCESSED",
      PAN_NUMBER: "9572052599869666",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "100.00",
      RETRIEVAL_REF_NO: "407910422674",
      VALUE_DATE: "20240319",
    },
    {
      TRANS_REF: "AB12345C6D7E",
      CHECKUP: "CBS",
      TRANS_STATUS: "PROCESSED",
      PAN_NUMBER: "1234567890123456",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "50.00",
      RETRIEVAL_REF_NO: "123456789012",
      VALUE_DATE: "20240320",
    },
    {
      TRANS_REF: "CD67890E1F2G",
      CHECKUP: "COOP-SWITCH",
      TRANS_STATUS: "ATM_OR_POS",
      PAN_NUMBER: "9876543210987654",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "75.00",
      RETRIEVAL_REF_NO: "987654321098",
      VALUE_DATE: "20240321",
    },
    {
      TRANS_REF: "EF34567G8H9I",
      CHECKUP: "COOP-SWITCH",
      TRANS_STATUS: "PROCESSED",
      PAN_NUMBER: "5432167890123456",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "200.00",
      RETRIEVAL_REF_NO: "654321098765",
      VALUE_DATE: "20240322",
    },
    {
      TRANS_REF: "GH90123I4J5K",
      CHECKUP: "CBS",
      TRANS_STATUS: "ATM_OR_POS",
      PAN_NUMBER: "6789012345678901",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "150.00",
      RETRIEVAL_REF_NO: "345678901234",
      VALUE_DATE: "20240323",
    },
    {
      TRANS_REF: "IJ56789K0L1M",
      CHECKUP: "CBS",
      TRANS_STATUS: "PROCESSED",
      PAN_NUMBER: "2109876543210987",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "300.00",
      RETRIEVAL_REF_NO: "456789012345",
      VALUE_DATE: "20240324",
    },
    {
      TRANS_REF: "KL23456M7N8O",
      CHECKUP: "ETH-SWITCH",
      TRANS_STATUS: "ATM_OR_POS",
      PAN_NUMBER: "8901234567890123",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "125.00",
      RETRIEVAL_REF_NO: "567890123456",
      VALUE_DATE: "20240325",
    },
    {
      TRANS_REF: "MN78901O2P3Q",
      CHECKUP: "COOP-SWITCH",
      TRANS_STATUS: "PROCESSED",
      PAN_NUMBER: "1098765432109876",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "75.00",
      RETRIEVAL_REF_NO: "678901234567",
      VALUE_DATE: "20240326",
    },
    {
      TRANS_REF: "OP34567Q8R9S",
      CHECKUP: "COOP-SWITCH",
      TRANS_STATUS: "ATM_OR_POS",
      PAN_NUMBER: "8765432109876543",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "250.00",
      RETRIEVAL_REF_NO: "789012345678",
      VALUE_DATE: "20240327",
    },
    {
      TRANS_REF: "QR90123S4T5U",
      CHECKUP: "CBS",
      TRANS_STATUS: "PROCESSED",
      PAN_NUMBER: "3210987654321098",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "175.00",
      RETRIEVAL_REF_NO: "890123456789",
      VALUE_DATE: "20240328",
    },
    {
      TRANS_REF: "ST56789U0V1W",
      CHECKUP: "CBS",
      TRANS_STATUS: "ATM_OR_POS",
      PAN_NUMBER: "7654321098765432",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "100.00",
      RETRIEVAL_REF_NO: "901234567890",
      VALUE_DATE: "20240329",
    },
    {
      TRANS_REF: "UV23456W7X8Y",
      CHECKUP: "COOP-SWITCH",
      TRANS_STATUS: "PROCESSED",
      PAN_NUMBER: "5432109876543210",
      DEBIT_ACCT_NO: "1000007758514",
      CREDIT_ACCT_NO: "ETB1000200010146",
      TXN_AMOUNT: "50.00",
      RETRIEVAL_REF_NO: "012345678901",
      VALUE_DATE: "20240330",
    },
  ];

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-2 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <p className="text-muted-foreground">
              Here&apos;s a list of transactions!
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
