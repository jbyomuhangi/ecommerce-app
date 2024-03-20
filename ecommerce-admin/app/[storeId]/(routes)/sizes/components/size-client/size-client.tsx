"use client";

import { Size } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SizesApi } from "./sizes-api";
import { SizesTable } from "./sizes-table";

interface SizeClientProps {
  sizes: Size[];
}

export const SizeClient: React.FC<SizeClientProps> = ({ sizes }) => {
  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${sizes.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new `)}>
          <Plus className="mr-2  h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />

      <SizesTable sizes={sizes} />

      <SizesApi />
    </div>
  );
};
