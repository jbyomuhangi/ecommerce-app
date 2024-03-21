"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductsApi } from "./products-api";
import { ProductsTable, ProductType } from "./products-table";

interface ProductsClientProps {
  products: ProductType[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ products }) => {
  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage products for your store"
        />

        <Button onClick={() => router.push(`/${params.storeId}/products/new `)}>
          <Plus className="mr-2  h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />

      <ProductsTable products={products} />

      <ProductsApi />
    </div>
  );
};
