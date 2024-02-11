"use client";

import React from "react";

import Modal from "@/components/Modal";
import useCreateStoreModalStore from "@/hooks/useCreateStoreModalStore";

const CreateStoreModal = () => {
  const { isOpen, onClose } = useCreateStoreModalStore();

  return (
    <Modal
      isOpen={isOpen}
      title="Create Store"
      description="Add a new store to manage products and categories"
      onClose={onClose}
    >
      Create store modal content
    </Modal>
  );
};

export default CreateStoreModal;
