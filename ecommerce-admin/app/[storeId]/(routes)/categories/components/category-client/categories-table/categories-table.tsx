"use client";

import { Billboard, Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { CellAction } from "./cell-action";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export type CategoryType = Category & { billboard: Billboard };

interface CategoriesTableProps {
  categories: CategoryType[];
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
}) => {
  const columns = useMemo((): ColumnDef<CategoryColumn>[] => {
    return [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "billboardLabel", header: "Billboard" },
      { accessorKey: "createdAt", header: "Date created" },
      { id: "actions", cell: ({ row }) => <CellAction data={row.original} /> },
    ];
  }, []);

  const tableData: CategoryColumn[] = useMemo(() => {
    return categories.map((category): CategoryColumn => {
      return {
        id: category.id,
        name: category.name,
        billboardLabel: category.billboard.label,
        createdAt: format(category.createdAt, "MMM do, yyyy"),
      };
    });
  }, [categories]);

  return <DataTable columns={columns} data={tableData} searchKey="name" />;
};
