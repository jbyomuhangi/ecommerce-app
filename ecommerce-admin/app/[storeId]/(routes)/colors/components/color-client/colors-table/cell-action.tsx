"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorsColumn } from "./colors-table";

interface CellActionProps {
  data: ColorsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams<{ storeId: string }>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Color ID copied to clipboard");
  };

  const onEdit = () => {
    router.push(`/${params.storeId}/colors/${data.id}`);
  };

  const { isPending: isDeleteColorLoading, mutate: deleteColor } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/stores/${params.storeId}/colors/${data.id}`);
    },

    onSuccess: () => {
      toast.success("Color deleted successfully");
      router.refresh();
    },

    onError: () => {
      toast.error("Unable to delete color");
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 p-0" variant={"ghost"}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem className="cursor-pointer" onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertModal
        isLoading={isDeleteColorLoading}
        ModalProps={{
          title: `Delete "${data.name}" color`,
          description: "Are you sure you want to delete this color?",
          isOpen: isDeleteModalOpen,
          onClose: () => setIsDeleteModalOpen(false),
        }}
        onConfirm={deleteColor}
      />
    </>
  );
};
