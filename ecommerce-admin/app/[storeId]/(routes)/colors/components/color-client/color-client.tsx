"use client";

import { Color } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Heading } from "@/components/heading";
import { Modal } from "@/components/modal";
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

  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colors.length})`}
          description="Manage colors for your store"
        />

        <div className="flex items-center gap-4">
          <Button onClick={() => router.push(`/${params.storeId}/colors/new `)}>
            <Plus className="mr-2  h-4 w-4" />
            Add new
          </Button>

          <button onClick={() => setIsApiModalOpen(true)}>
            <Settings />
          </button>
        </div>
      </div>

      <Separator />

      <ColorsTable colors={colors} />

      <Modal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)}>
        <ColorsApi />
      </Modal>
    </div>
  );
};
