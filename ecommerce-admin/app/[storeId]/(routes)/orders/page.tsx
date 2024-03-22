import React from "react";

import prismaDb from "@/lib/prismadb";
import { OrderClient } from "./components/order-client";

interface OrdersPageProps {
  params: { storeId: string };
}

const OrdersPage: React.FC<OrdersPageProps> = async ({ params }) => {
  const orders = await prismaDb.order.findMany({
    where: { storeId: params.storeId },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <OrderClient orders={orders} />
    </div>
  );
};

export default OrdersPage;
