import React from "react";

import prismaDb from "@/lib/prismadb";
import { CategoryClient } from "./components/category-client";

interface CategoriesPageProps {
  params: { storeId: string };
}

const CategoriesPage: React.FC<CategoriesPageProps> = async ({ params }) => {
  const categories = await prismaDb.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <CategoryClient categories={categories} />
    </div>
  );
};

export default CategoriesPage;
