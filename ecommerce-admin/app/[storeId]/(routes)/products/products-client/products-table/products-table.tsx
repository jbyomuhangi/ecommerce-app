"use client";

import { Category, Color, Product, Size } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { BooleanCell } from "@/components/data-table/cells/boolean-cell";
import { ColorCell } from "@/components/data-table/cells/color-cell";
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
      { accessorKey: "category", header: "Category" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "size", header: "Size" },
      {
        id: "color",
        header: "Color",
        cell: ({ row }) => <ColorCell color={row.original.color} />,
      },
      {
        id: "isFeatured",
        header: "Featured",
        cell: ({ row }) => <BooleanCell value={row.original.isFeatured} />,
      },
      {
        id: "isArchived",
        header: "Archived",
        cell: ({ row }) => <BooleanCell value={row.original.isArchived} />,
      },
      { accessorKey: "createdAt", header: "Date created" },
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
        createdAt: format(product.createdAt, "dd-MM-yyyy"),
      };
    });
  }, [products]);

  return <DataTable columns={columns} data={tableData} searchKey="name" />;
};
