"use client";

import { Size } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { CellAction } from "./cell-action";

export type SizeColumn = {
  id: string;
  name: string;
  createdAt: string;
};

interface SizesTableProps {
  sizes: Size[];
}

export const SizesTable: React.FC<SizesTableProps> = ({ sizes }) => {
  const columns = useMemo((): ColumnDef<SizeColumn>[] => {
    return [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "createdAt", header: "Date created" },
      { id: "actions", cell: ({ row }) => <CellAction data={row.original} /> },
    ];
  }, []);

  const tableData: SizeColumn[] = useMemo(() => {
    return sizes.map((size): SizeColumn => {
      return {
        id: size.id,
        name: size.name,
        createdAt: format(size.createdAt, "MMM do, yyyy"),
      };
    });
  }, [sizes]);

  return <DataTable columns={columns} data={tableData} searchKey="name" />;
};
