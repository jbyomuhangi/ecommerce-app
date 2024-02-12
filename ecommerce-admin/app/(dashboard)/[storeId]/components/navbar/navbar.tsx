import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import prismaDb from "@/lib/prismadb";
import { MainNav } from "./main-nav";
import { StoreSelector } from "./store-selector";

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismaDb.store.findMany({
    where: { userId },
    select: { id: true, name: true },
  });

  return (
    <div className="flex items-center gap-4 border-b p-2 ">
      <StoreSelector stores={stores} />

      <MainNav />

      <div className="ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
