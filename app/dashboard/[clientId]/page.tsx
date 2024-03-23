import { ReconProcessTracker } from "@/types/types";
import ClientReconciliation from "./components/client";

const Page = async ({ params }: { params: { clientId: string } }) => {
  const dummyData: ReconProcessTracker[] = [
    {
      id: 1,
      date: "2024-03-23",
      cbsFile: "cbs_file_1.xlsx",
      ethSwitchFile: "",
      coopSwitchFile: "coop_switch_file_1.xlsx",
      status: "PENDING",
      addedAt: "2024-03-23",
      addedBy: {
        userId: 1,
        fullName: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        status: "Active",
        lastLoggedIn: new Date("2024-03-23T09:30:00"),
        registeredAt: new Date("2023-01-01T09:00:00"),
        registeredBy: "Admin",
        updatedAt: new Date("2024-03-23T10:00:00"),
      },
      processingStartedAt: "",
      processingEndedAt: "",
      processedBy: {
        userId: 2,
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        role: "User",
        status: "Active",
        lastLoggedIn: new Date("2024-03-22T15:45:00"),
        registeredAt: new Date("2023-01-15T11:30:00"),
        registeredBy: "Admin",
        updatedAt: new Date("2024-03-23T11:00:00"),
      },
    },
    {
      id: 2,
      date: "2024-03-22",
      cbsFile: "cbs_file_2.xlsx",
      ethSwitchFile: "eth_switch_file_2.xlsx",
      coopSwitchFile: "coop_switch_file_2.xlsx",
      status: "COMPLETED",
      addedAt: "2024-03-22",
      addedBy: {
        userId: 3,
        fullName: "Alice Johnson",
        email: "alice.johnson@example.com",
        role: "User",
        status: "Active",
        lastLoggedIn: new Date("2024-03-22T10:30:00"),
        registeredAt: new Date("2023-02-10T14:00:00"),
        registeredBy: "Admin",
        updatedAt: new Date("2024-03-22T11:00:00"),
      },
      processingStartedAt: "2024-03-22",
      processingEndedAt: "2024-03-22",
      processedBy: {
        userId: 1,
        fullName: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        status: "Active",
        lastLoggedIn: new Date("2024-03-23T09:30:00"),
        registeredAt: new Date("2023-01-01T09:00:00"),
        registeredBy: "Admin",
        updatedAt: new Date("2024-03-23T10:00:00"),
      },
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
    addedBy: item.addedBy,
    processingStartedAt: item.processingStartedAt,
    processingEndedAt: item.processingEndedAt,
    processedBy: item.processedBy,
  }));

  return (
    <div>
      <ClientReconciliation data={formattedclients} />
    </div>
  );
};

export default Page;
