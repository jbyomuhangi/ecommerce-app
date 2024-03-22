"use client";

import { Order, OrderItem, Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { currencyFormatter } from "@/utils/formatUtils";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  products: string;
  totalPrice: string;
  createdAt: string;
};

export type OrderType = Order & {
  orderItems: (OrderItem & { product: Product })[];
};
interface OrdersTableProps {
  orders: OrderType[];
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const columns = useMemo((): ColumnDef<OrderColumn>[] => {
    return [
      { accessorKey: "products", header: "Products" },
      { accessorKey: "phone", header: "Phone number" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "totalPrice", header: "Total Price" },
      { accessorKey: "isPaid", header: "Paid" },
      { accessorKey: "createdAt", header: "Date created" },
    ];
  }, []);

  const tableData: OrderColumn[] = useMemo(() => {
    return orders.map((order): OrderColumn => {
      const formattedProducts = order.orderItems
        .map((orderItem) => orderItem.product.name)
        .join(", ");

      const totalPrice = order.orderItems.reduce((acc, val) => {
        return acc + Number(val.product.price);
      }, 0);

      return {
        id: order.id,
        phone: order.phone,
        address: order.address,
        isPaid: order.isPaid,
        products: formattedProducts,
        totalPrice: currencyFormatter.format(totalPrice),
        createdAt: format(order.createdAt, "MMM do, yyyy"),
      };
    });
  }, [orders]);

  return <DataTable columns={columns} data={tableData} searchKey="products" />;
};
