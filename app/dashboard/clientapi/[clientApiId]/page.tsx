import { ChallengeForm } from "./components/challenge-form";



function getClientsApis(id: string) {
 

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
