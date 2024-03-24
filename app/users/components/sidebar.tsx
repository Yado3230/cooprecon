"use client";

import React, { useState } from "react";
import { MainNav } from "./main-nav";

const Sidebar = () => {
  const [isOpened, setIsOpened] = useState(true);
  return (
    <div className="fixed left-0 shadow top-16 bottom-0 w-64 border">
      <MainNav
        setIsOpened={setIsOpened}
        isOpened={isOpened}
        className="mx-5 px-2"
      />
    </div>
  );
};

export default Sidebar;
