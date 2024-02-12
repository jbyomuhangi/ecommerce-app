import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import prismaDb from "@/lib/prismadb";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
  params: { storeId: string };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) redirect("/sign-in");

  const store = await prismaDb.store.findFirst({
    where: { id: storeId, userId },
  });

  if (!store) redirect("/");

  return (
    <div>
      <div className="p-6">
        <SettingsForm store={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
