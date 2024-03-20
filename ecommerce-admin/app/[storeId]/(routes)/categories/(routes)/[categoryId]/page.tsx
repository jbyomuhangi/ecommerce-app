import React from "react";

import prismaDb from "@/lib/prismadb";
import { CategoryFrom } from "./components/category-form";

interface CategoryPageProps {
  params: { storeId: string; categoryId: string };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const category = await prismaDb.category.findUnique({
    where: { id: params.categoryId },
  });

  const billboards = await prismaDb.billboard.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <div className="p-6">
      <CategoryFrom category={category} billboards={billboards} />
    </div>
  );
};

export default CategoryPage;
