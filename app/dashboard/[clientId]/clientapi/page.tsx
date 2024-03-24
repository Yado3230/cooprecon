import { format } from "date-fns";
import APIClient from "./components/client";
import { ClientApiColumn } from "./components/columns";

const ClientApiPage = async () => {
  const clientApis = [
    {
      id: "1",
      clientId: "Awach",
      domain: "http://localhost.com",
      port: "9000",
      endpoint: "/v1/cbo",
      createdAt: "2024-12-12",
    },
  ];

  const formattedClientApis: ClientApiColumn[] = clientApis.map((item) => ({
    id: item.id?.toString() || "00",
    clientId: item.clientId,
    domain: item.domain,
    port: item.port,
    endpoint: item.endpoint,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col bg-background shadow-sm">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <APIClient data={formattedClientApis} />
      </div>
    </div>
  );
};

export default ClientApiPage;
