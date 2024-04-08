"use client";

import UserClient from "./components/client";
import { ServiceStationResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { getServiceStationsByClientId } from "@/actions/service-station.action";

export default function SettingsAccountPage() {
  const [serviceStations, setServiceStations] = useState<
    ServiceStationResponse[]
  >([]);

  const clientId =
    typeof window !== "undefined" && localStorage.getItem("clientId");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getServiceStationsByClientId(Number(clientId));
      const data = res instanceof Array ? res : [];
      setServiceStations(data);
    };
    fetchData();
  }, []);

  const formattedclients: ServiceStationResponse[] = serviceStations.map(
    (item) => ({
      id: item.id,
      name: item.name,
      product: item.product,
      ccy: item.ccy,
      accountOfficer: item.accountOfficer,
      accountNo: item.accountNo,
      machineType: item.machineType,
      terminalId: item.terminalId,
      district: item.district,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })
  );

  return (
    <div className="space-y-6 w-full">
      <div className="flex w-full gap-8">
        <UserClient data={formattedclients} />
      </div>
    </div>
  );
}
