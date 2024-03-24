"use client";

import { Category, Image, Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { BooleanCell } from "@/components/data-table/cells/boolean-cell";
import { ImageCell } from "@/components/data-table/cells/image-cell";
import { currencyFormatter } from "@/utils/formatUtils";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  imageUrl: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  category: string;
  createdAt: string;
};

export type ProductType = Product & {
  category: Category;
  images: Image[];
};

interface ProductsTableProps {
  products: ProductType[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const columns = useMemo((): ColumnDef<ProductColumn>[] => {
    return [
      {
        id: "imageUrl",
        header: "Image",
        cell: ({ row }) => <ImageCell url={row.original.imageUrl} />,
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "price", header: "Price" },
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
        imageUrl: product.images[0].url,
        name: product.name,
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        price: currencyFormatter.format(Number(product.price)),
        category: product.category.name,
        createdAt: format(product.createdAt, "dd-MM-yyyy"),
      };
    });
  }, [products]);

  return <DataTable columns={columns} data={tableData} searchKey="name" />;
};
