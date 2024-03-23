"use client";

import { Size } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Heading } from "@/components/heading";
import { Modal } from "@/components/modal";
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

  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${sizes.length})`}
          description="Manage sizes for your store"
        />

        <div className="flex items-center gap-4">
          <Button onClick={() => router.push(`/${params.storeId}/sizes/new `)}>
            <Plus className="mr-2  h-4 w-4" />
            Add new
          </Button>

          <button onClick={() => setIsApiModalOpen(true)}>
            <Settings />
          </button>
        </div>
      </div>

      <Separator />

      <SizesTable sizes={sizes} />

      <Modal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)}>
        <SizesApi />
      </Modal>
    </div>
  );
};
