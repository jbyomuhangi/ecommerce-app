import { Plus } from "lucide-react";
import React from "react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboard for your store"
        />

        <Button>
          <Plus className="mr-2  h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />
    </div>
  );
};
