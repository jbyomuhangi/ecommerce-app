"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { withClientSideMount } from "@/hoc/with-client-side-mount";
import { Modal, ModalProps } from "./modal";

interface AlertModalProps {
  isLoading?: boolean;
  ModalProps?: ModalProps;
  onConfirm?: () => void;
}

const AlertModalBase: React.FC<AlertModalProps> = ({
  isLoading,
  ModalProps = {},
  onConfirm,
}) => {
  const { title, description, onClose, ...otherModalProps } = ModalProps;

  return (
    <Modal
      title={title || "Are you sure?"}
      description={description || "This action can not be undone"}
      onClose={onClose}
      {...otherModalProps}
    >
      <div className="flex items-center justify-end gap-4">
        <Button variant={"outline"} disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant={"destructive"}
          disabled={isLoading}
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export const AlertModal = withClientSideMount<AlertModalProps>(AlertModalBase);
