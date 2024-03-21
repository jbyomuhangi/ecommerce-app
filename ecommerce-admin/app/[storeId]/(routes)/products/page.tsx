import React from "react";

import prismaDb from "@/lib/prismadb";
import { ProductsClient } from "./products-client";

interface ProductsPageProps {
  params: { storeId: string };
}

const ProductsPage: React.FC<ProductsPageProps> = async ({ params }) => {
  const products = await prismaDb.product.findMany({
    where: { storeId: params.storeId },
    include: { category: true, size: true, color: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <ProductsClient products={products} />
    </div>
  );
};

export default ProductsPage;
