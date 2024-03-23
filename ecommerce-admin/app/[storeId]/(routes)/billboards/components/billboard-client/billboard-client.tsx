"use client";

import { Billboard } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Heading } from "@/components/heading";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BillboardsApi } from "./billboards-api";
import { BillboardsTable } from "./billboards-table";

interface BillboardClientProps {
  billboards: Billboard[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
  billboards,
}) => {
  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboard for your store"
        />

        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.push(`/${params.storeId}/billboards/new `)}
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

      <BillboardsTable billboards={billboards} />

      <Modal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)}>
        <BillboardsApi />
      </Modal>
    </div>
  );
};
