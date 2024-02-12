import { UserButton } from "@clerk/nextjs";
import React from "react";

import { MainNav } from "./main-nav";

export const Navbar = () => {
  return (
    <div className="flex items-center gap-4 border-b p-2 ">
      <div>Store switcher</div>

      <div>
        <MainNav />
      </div>

      <div className="ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
