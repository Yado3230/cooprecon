import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Pending from "./Pending";
import Completed from "./Completed";

const Page = () => {
  return (
    <div>
      <Tabs defaultValue="pending">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Pending />
        </TabsContent>
        <TabsContent value="completed">
          <Completed />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
