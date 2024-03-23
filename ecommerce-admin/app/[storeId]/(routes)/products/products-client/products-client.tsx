"use client";

import { Plus, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Heading } from "@/components/heading";
import { Modal } from "@/components/modal";
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

  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage products for your store"
        />

        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.push(`/${params.storeId}/products/new `)}
          >
            <Plus className="mr-2  h-4 w-4" />
            Add new
          </Button>

          <button onClick={() => setIsApiModalOpen(true)}>
            <Settings />
          </button>
        </div>
      </div>

      <Separator />

      <ProductsTable products={products} />

      <Modal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)}>
        <ProductsApi />
      </Modal>
    </div>
  );
};
