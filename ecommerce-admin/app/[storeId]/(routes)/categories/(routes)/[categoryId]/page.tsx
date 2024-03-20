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

  return (
    <div className="p-6">
      <CategoryFrom category={category} />
    </div>
  );
};

export default CategoryPage;
