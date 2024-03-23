import { useState } from "react";
import { ChallengeForm } from "./components/challenge-form";

const BillboardPage = async ({
  params,
}: {
  params: { clientApiId: string };
}) => {
  return (
    <div className="flex-col shadow">
      {/* <div className="flex-1 space-y-4 p-8 pt-6">
        <ChallengeForm
          initialData={clientapi !== null ? clientapi : null}
          clients={clients}
        />
      </div> */}
      <span>client api</span>
    </div>
  );
};

export default BillboardPage;
