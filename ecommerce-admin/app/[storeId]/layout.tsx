import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import prismaDb from "@/lib/prismadb";
import { Navbar } from "./components/navbar";

interface StoreDashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

const StoreDashboardLayout: React.FC<StoreDashboardLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) redirect("/sign-in");

  const store = await prismaDb.store.findFirst({
    where: { id: storeId, userId },
  });

  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default StoreDashboardLayout;
