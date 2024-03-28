"use client";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { FC, useEffect, useState } from "react";
import {
  getCBSReconciliationFileDetail,
  getSwitchReconciliationFileDetail,
} from "@/actions/reconciliation-action";
import {
  ReconciliationFileCBS,
  ReconciliationFileETHSWITCH,
} from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columnsswitch } from "./components/columnsswitch";

// Simulate a database read for tasks

interface TaskPagePropsType {
  bank: string;
  date: string;
}

const TaskPage: FC<TaskPagePropsType> = ({ bank, date }) => {
  const [switchRecon, setSwitchRecon] = useState<ReconciliationFileETHSWITCH[]>(
    []
  );

  const [cbsRecon, setCbsRecon] = useState<ReconciliationFileCBS[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCBSReconciliationFileDetail(date, bank);
      const data = res.data instanceof Array ? res.data : [];
      setCbsRecon(data);
      const res2 = await getSwitchReconciliationFileDetail(date, bank);
      const data2 = res2.data instanceof Array ? res2.data : [];
      setSwitchRecon(data2);
    };
    fetchData();
  }, [date, bank]);

  return (
    <>
      <Tabs defaultValue="account" className="">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="account">CBS</TabsTrigger>
          <TabsTrigger value="password">ETH-SWITCH</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="h-full flex-1 flex-col space-y-2 flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <p className="text-muted-foreground">
                  Here&apos;s a list of transactions!
                </p>
              </div>
            </div>
            <DataTable data={cbsRecon} columns={columns} />
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="h-full flex-1 flex-col space-y-2 flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <p className="text-muted-foreground">
                  Here&apos;s a list of transactions!
                </p>
              </div>
            </div>
            <DataTable data={switchRecon} columns={columnsswitch} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TaskPage;
