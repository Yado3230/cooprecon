import { format } from "date-fns";
import APIClient from "./components/client";
import { ClientApiColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";

async function getClientApis() {
  const feed = await prismadb.clientAPI.findMany();
  return feed;
}

export const revalidate = 1;

const ClientApiPage = async () => {
  const clientApis = await getClientApis();

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
