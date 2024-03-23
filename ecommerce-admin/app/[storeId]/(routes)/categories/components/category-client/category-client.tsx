"use client";

import { Plus, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Heading } from "@/components/heading";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoriesApi } from "./categories-api";
import { CategoriesTable, CategoryType } from "./categories-table";

interface CategoryClientProps {
  categories: CategoryType[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
  categories,
}) => {
  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage categories for your store"
        />

        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.push(`/${params.storeId}/categories/new `)}
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

      <CategoriesTable categories={categories} />

      <Modal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)}>
        <CategoriesApi />
      </Modal>
    </div>
  );
};
