"use client";

import { Billboard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useMemo } from "react";

import { DataTable } from "@/components/data-table";
import { ImageCell } from "@/components/data-table/cells/image-cell";

import { CellAction } from "./cell-action";

export type BillboardColumn = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
};

interface BillboardsTableProps {
  billboards: Billboard[];
}

export const BillboardsTable: React.FC<BillboardsTableProps> = ({
  billboards,
}) => {
  const columns = useMemo((): ColumnDef<BillboardColumn>[] => {
    return [
      { accessorKey: "label", header: "Label" },
      {
        id: "imageUrl",
        header: "Image",
        cell: ({ row }) => <ImageCell url={row.original.imageUrl} />,
      },
      { accessorKey: "createdAt", header: "Date created" },
      { id: "actions", cell: ({ row }) => <CellAction data={row.original} /> },
    ];
  }, []);

  const tableData: BillboardColumn[] = useMemo(() => {
    return billboards.map((billboard): BillboardColumn => {
      return {
        id: billboard.id,
        label: billboard.label,
        imageUrl: billboard.imageUrl,
        createdAt: format(billboard.createdAt, "dd-MM-yyyy"),
      };
    });
  }, [billboards]);

  return <DataTable columns={columns} data={tableData} searchKey="label" />;
};
