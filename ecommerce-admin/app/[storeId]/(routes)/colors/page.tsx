import React from "react";

import prismaDb from "@/lib/prismadb";
import { ColorClient } from "./components/color-client";

interface ColorsPageProps {
  params: { storeId: string };
}

const ColorsPage: React.FC<ColorsPageProps> = async ({ params }) => {
  const colors = await prismaDb.color.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <ColorClient colors={colors} />
    </div>
  );
};

export default ColorsPage;
