import { ChallengeForm } from "./components/challenge-form";
import prismadb from "@/lib/prismadb";

async function getClients() {
  const feed = await prismadb.client.findMany();
  return feed;
}

async function getClientsApis(id: string) {
  const clientapi = await prismadb.clientAPI.findUnique({
    where: {
      id,
    },
  });
  return clientapi;
}

export const revalidate = 1;

const BillboardPage = async ({
  params,
}: {
  params: { clientApiId: string };
}) => {
  const clientapi = await getClientsApis(params.clientApiId.toString());
  const clients = await getClients();

  return (
    <div className="flex-col shadow">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ChallengeForm
          initialData={clientapi !== null ? clientapi : null}
          clients={clients}
        />
      </div>
    </div>
  );
};

export default BillboardPage;
