import React from "react";

import prismaDb from "@/lib/prismadb";
import { SizeFrom } from "./components/size-form";

interface SizePageProps {
  params: { storeId: string; sizeId: string };
}

const SizePage: React.FC<SizePageProps> = async ({ params }) => {
  const size = await prismaDb.size.findUnique({
    where: { id: params.sizeId },
  });

  return (
    <div className="p-6">
      <SizeFrom size={size} />
    </div>
  );
};

export default SizePage;
