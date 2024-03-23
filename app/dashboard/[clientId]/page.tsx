"use client";
import { ReconProcessTracker } from "@/types/types";
import ClientReconciliation from "./components/client";
import { useEffect, useState } from "react";
import { getReconsilationProcessingTracker } from "@/actions/header-template.action";

const Page = async ({ params }: { params: { clientId: string } }) => {
  const [reconcilationTracker, setReconcilationTracker] = useState<
    ReconProcessTracker[] | []
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getReconsilationProcessingTracker(
        Number(params.clientId)
      );
      const data = response instanceof Array ? response : [];
      setReconcilationTracker(data);
    };
    fetchData();
  }, []);

  const dummyData: ReconProcessTracker[] = [
    {
      id: 1,
      date: "2024-03-21",
      cbsFile: "cbs_file_1.xlsx",
      ethSwitchFile: "",
      coopSwitchFile: "coop_switch_file_1.xlsx",
      status: "PENDING",
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
    addedAt: item.addedAt,
    processingStartedAt: item.processingStartedAt,
    processingEndedAt: item.processingEndedAt,
  }));

  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default Page;
