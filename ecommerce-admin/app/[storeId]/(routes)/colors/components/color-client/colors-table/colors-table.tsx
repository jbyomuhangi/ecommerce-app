"use client";

import { Color } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { CellAction } from "./cell-action";

export type ColorsColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

interface ColorsTableProps {
  colors: Color[];
}

export const ColorsTable: React.FC<ColorsTableProps> = ({ colors }) => {
  const columns = useMemo((): ColumnDef<ColorsColumn>[] => {
    return [
      { accessorKey: "name", header: "Name" },
      {
        id: "value",
        header: "Value",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div
              className="rounded-full border p-2"
              style={{ backgroundColor: row.original.value }}
            />

            <div>{row.original.value}</div>
          </div>
        ),
      },
      { accessorKey: "createdAt", header: "Date created" },
      { id: "actions", cell: ({ row }) => <CellAction data={row.original} /> },
    ];
  }, []);

  const tableData: ColorsColumn[] = useMemo(() => {
    return colors.map((color): ColorsColumn => {
      return {
        id: color.id,
        name: color.name,
        value: color.value,
        createdAt: format(color.createdAt, "MMM do, yyyy"),
      };
    });
  }, [colors]);

  return <DataTable columns={columns} data={tableData} searchKey="name" />;
};