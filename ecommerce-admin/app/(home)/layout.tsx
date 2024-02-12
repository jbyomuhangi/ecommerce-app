import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import prismaDb from "@/lib/prismadb";

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const HomePageLayout: React.FC<HomePageLayoutProps> = async ({ children }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismaDb.store.findFirst({
    where: { userId },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
};

export default HomePageLayout;
