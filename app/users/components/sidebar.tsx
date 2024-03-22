import React from "react";
import { MainNav } from "./main-nav";

const Sidebar = () => {
  return (
    <div className="fixed left-0 shadow top-16 bottom-0 w-64 border">
      <MainNav className="mx-5 px-2" />
    </div>
  );
};

export default Sidebar;
