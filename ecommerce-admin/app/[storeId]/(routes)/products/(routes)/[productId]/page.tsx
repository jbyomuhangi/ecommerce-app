import React from "react";

import prismaDb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

interface ProductPageProps {
  params: { storeId: string; productId: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await prismaDb.product.findUnique({
    where: { id: params.productId },
    include: {
      images: true,
      productColors: { include: { color: true } },
      productSizes: { include: { size: true } },
    },
  });

  const categories = await prismaDb.category.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const sizes = await prismaDb.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const colors = await prismaDb.color.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <ProductForm
        product={product}
        categories={categories}
        sizes={sizes}
        colors={colors}
      />
    </div>
  );
};

export default ProductPage;
