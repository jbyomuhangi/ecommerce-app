import React from "react";

import prismaDb from "@/lib/prismadb";
import { ColorFrom } from "./components/color-form";

interface ColorPageProps {
  params: { storeId: string; colorId: string };
}

const ColorPage: React.FC<ColorPageProps> = async ({ params }) => {
  const color = await prismaDb.color.findUnique({
    where: { id: params.colorId },
  });

  return (
    <div className="p-6">
      <ColorFrom color={color} />
    </div>
  );
};

export default ColorPage;
