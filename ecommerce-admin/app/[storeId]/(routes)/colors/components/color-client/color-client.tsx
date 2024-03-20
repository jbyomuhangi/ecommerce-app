"use client";

import { Color } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ColorsApi } from "./colors-api";
import { ColorsTable } from "./colors-table";

interface ColorClientProps {
  colors: Color[];
}

export const ColorClient: React.FC<ColorClientProps> = ({ colors }) => {
  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colors.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new `)}>
          <Plus className="mr-2  h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />

      <ColorsTable colors={colors} />

      <ColorsApi />
    </div>
  );
};
