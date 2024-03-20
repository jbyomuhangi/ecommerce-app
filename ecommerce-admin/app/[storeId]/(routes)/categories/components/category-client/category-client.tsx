"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoriesApi } from "./categories-api";
import { CategoriesTable, CategoriesType } from "./categories-table";

interface CategoryClientProps {
  categories: CategoriesType[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
  categories,
}) => {
  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new `)}
        >
          <Plus className="mr-2  h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />

      <CategoriesTable categories={categories} />

      <CategoriesApi />
    </div>
  );
};
