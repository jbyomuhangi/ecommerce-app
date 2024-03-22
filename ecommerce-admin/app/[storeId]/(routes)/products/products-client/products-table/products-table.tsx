"use client";

import { Category, Color, Product, Size } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { currencyFormatter } from "@/utils/formatUtils";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
};

export type ProductType = Product & {
  category: Category;
  size: Size;
  color: Color;
};

interface ProductsTableProps {
  products: ProductType[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const columns = useMemo((): ColumnDef<ProductColumn>[] => {
    return [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "isFeatured", header: "Featured" },
      { accessorKey: "isArchived", header: "Archived" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "createdAt", header: "Date created" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "size", header: "Size" },
      {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div
              className="rounded-full border p-2"
              style={{ backgroundColor: row.original.color }}
            />

            <div>{row.original.color}</div>
          </div>
        ),
      },
      { id: "actions", cell: ({ row }) => <CellAction data={row.original} /> },
    ];
  }, []);

  const tableData: ProductColumn[] = useMemo(() => {
    return products.map((product): ProductColumn => {
      return {
        id: product.id,
        name: product.name,
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        price: currencyFormatter.format(Number(product.price)),
        category: product.category.name,
        size: product.size.name,
        color: product.color.value,
        createdAt: format(product.createdAt, "MMM do, yyyy"),
      };
    });
  }, [products]);

  return <DataTable columns={columns} data={tableData} searchKey="name" />;
};
