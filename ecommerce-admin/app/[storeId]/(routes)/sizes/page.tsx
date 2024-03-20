import React from "react";

import prismaDb from "@/lib/prismadb";
import { SizeClient } from "./components/size-client";

interface SizesPageProps {
  params: { storeId: string };
}

const SizesPage: React.FC<SizesPageProps> = async ({ params }) => {
  const sizes = await prismaDb.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <SizeClient sizes={sizes} />
    </div>
  );
};

export default SizesPage;
