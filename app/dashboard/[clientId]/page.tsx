"use client";
import { ReconProcessTracker } from "@/types/types";
import ClientReconciliation from "./components/client";
import { useEffect, useState } from "react";
import { getReconsilationProcessingTracker } from "@/actions/header-template.action";

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

  const formattedclients: ReconProcessTracker[] = reconcilationTracker.map(
    (item) => ({
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
    })
  );

  return (
    <div>
      <ClientReconciliation
        setUpdated={setUpdated}
        updated={updated}
        data={formattedclients}
      />
    </div>
  );
};

export default Page;
