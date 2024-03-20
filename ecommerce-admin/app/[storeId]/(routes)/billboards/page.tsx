import React from "react";

import prismaDb from "@/lib/prismadb";
import { BillboardClient } from "./components/billboard-client";

interface BillboardsPageProps {
  params: { storeId: string };
}

const BillboardsPage: React.FC<BillboardsPageProps> = async ({ params }) => {
  const billboards = await prismaDb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <BillboardClient billboards={billboards} />
    </div>
  );
};

export default BillboardsPage;
