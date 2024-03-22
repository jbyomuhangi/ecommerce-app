import React from "react";

import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { OrdersTable, OrderType } from "./orders-table";

interface OrderClientProps {
  orders: OrderType[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ orders }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${orders.length})`}
          description="Manage orders for your store"
        />
      </div>

      <Separator />

      <OrdersTable orders={orders} />
    </div>
  );
};
