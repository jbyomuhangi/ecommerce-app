import React from "react";

import prismaDb from "@/lib/prismadb";
import { BillboardFrom } from "./components/billboard-form";

interface BillboardPageProps {
  params: { storeId: string; billboardId: string };
}

const BillboardPage: React.FC<BillboardPageProps> = async ({ params }) => {
  const billboard = await prismaDb.billboard.findUnique({
    where: { id: params.billboardId },
  });

  return (
    <div className="p-6">
      <BillboardFrom billBoard={billboard} />
    </div>
  );
};

export default BillboardPage;
