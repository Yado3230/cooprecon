"use client";
import { ReconProcessTracker } from "@/types/types";
import { useEffect, useState } from "react";
import { getReconsilationProcessingTracker } from "@/actions/header-template.action";
import UserClient from "./client";

const Page = ({ params }: { params: { clientId: string } }) => {
  const [reconcilationTracker, setReconcilationTracker] = useState<
    ReconProcessTracker[] | []
  >([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getReconsilationProcessingTracker(
        Number(params.clientId)
      );
      const data =
        response.reconProcessTrackers instanceof Array
          ? response.reconProcessTrackers
          : [];
      setReconcilationTracker(data);
    };
    fetchData();
  }, [updated]);

  const dummyData: ReconProcessTracker[] = [
    {
      id: 1,
      date: "2024-03-21",
      cbsFile: "cbs_file_1.xlsx",
      ethSwitchFile: "",
      coopSwitchFile: "coop_switch_file_1.xlsx",
      status: "PENDING",
      reconFileApprovalTrackers: [
        {
          id: 3,
          fileType: "XLSX",
          fileName: "sheet.xlsx",
          totalTransactionNumber: 200,
          requiredApprovals: 2,
          approvalCount: 2,
          addedByUserFullName: "Emily Johnson",
          listOfApprover: ["David", "Eva", "Frank"],
          createdAt: "2024-03-22T14:20:00Z",
          updatedAt: "2024-03-22T15:00:00Z",
        },
      ],
      addedAt: "2024-03-23",
      processingStartedAt: "",
      processingEndedAt: "",
    },
    {
      id: 4,
      date: "2024-03-17",
      cbsFile: "cbs_file_1.xlsx",
      ethSwitchFile: "",
      coopSwitchFile: "coop_switch_file_1.xlsx",
      status: "PENDING",
      reconFileApprovalTrackers: [
        {
          id: 3,
          fileType: "XLSX",
          fileName: "sheet.xlsx",
          totalTransactionNumber: 200,
          requiredApprovals: 2,
          approvalCount: 1,
          addedByUserFullName: "Emily Johnson",
          listOfApprover: ["David", "Eva", "Frank"],
          createdAt: "2024-03-22T14:20:00Z",
          updatedAt: "2024-03-22T15:00:00Z",
        },
      ],
      addedAt: "2024-03-23",
      processingStartedAt: "",
      processingEndedAt: "",
    },
    {
      id: 3,
      date: "2024-03-18",
      cbsFile: "cbs_file_1.xlsx",
      ethSwitchFile: "cbs_file_1.xlsx",
      coopSwitchFile: "coop_switch_file_1.xlsx",
      status: "PROCESSING",
      reconFileApprovalTrackers: [
        {
          id: 3,
          fileType: "XLSX",
          fileName: "sheet.xlsx",
          totalTransactionNumber: 200,
          requiredApprovals: 2,
          approvalCount: 2,
          addedByUserFullName: "Emily Johnson",
          listOfApprover: ["David", "Eva", "Frank"],
          createdAt: "2024-03-22T14:20:00Z",
          updatedAt: "2024-03-22T15:00:00Z",
        },
      ],
      addedAt: "2024-03-23",
      processingStartedAt: "",
      processingEndedAt: "",
    },
    {
      id: 2,
      date: "2024-03-22",
      cbsFile: "cbs_file_2.xlsx",
      ethSwitchFile: "eth_switch_file_2.xlsx",
      coopSwitchFile: "coop_switch_file_2.xlsx",
      status: "COMPLETED",
      reconFileApprovalTrackers: [
        {
          id: 1,
          fileType: "PDF",
          fileName: "document1.pdf",
          totalTransactionNumber: 100,
          requiredApprovals: 2,
          approvalCount: 2,
          addedByUserFullName: "John Doe",
          listOfApprover: ["Alice", "Bob"],
          createdAt: "2024-03-24T10:00:00Z",
          updatedAt: "2024-03-24T10:30:00Z",
        },
        {
          id: 2,
          fileType: "CSV",
          fileName: "data.csv",
          totalTransactionNumber: 500,
          requiredApprovals: 2,
          approvalCount: 1,
          addedByUserFullName: "Jane Smith",
          listOfApprover: ["Charlie"],
          createdAt: "2024-03-23T09:30:00Z",
          updatedAt: "2024-03-23T09:45:00Z",
        },
      ],
      addedAt: "2024-03-22",
      processingStartedAt: "2024-03-22",
      processingEndedAt: "2024-03-22",
    },
  ];

  const formattedclients: ReconProcessTracker[] = dummyData.map((item) => ({
    id: item.id,
    date: item.date,
    cbsFile: item.cbsFile,
    ethSwitchFile: item.ethSwitchFile,
    coopSwitchFile: item.coopSwitchFile,
    status: item.status,
    reconFileApprovalTrackers: item.reconFileApprovalTrackers,
    addedAt: item.addedAt,
    processingStartedAt: item.processingStartedAt,
    processingEndedAt: item.processingEndedAt,
  }));

  return (
    <div>
      <UserClient data={formattedclients} />
    </div>
  );
};

export default Page;
