"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {
  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboard for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new `)}
        >
          <Plus className="mr-2  h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />
    </div>
  );
};
