"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { empty } from "@/utils/noop-utils";

export interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  description,
  isOpen,
  onClose = empty,
}) => {
  const onOpenChange = (open: boolean) => {
    if (open) return;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
