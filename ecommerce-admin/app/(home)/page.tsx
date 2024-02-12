"use client";

import { useCreateStoreModalStore } from "@/hooks/use-create-store-modal-store";
import { useEffect } from "react";

const HomePage = () => {
  const { isOpen, onOpen } = useCreateStoreModalStore();

  useEffect(() => {
    if (isOpen) return;
    onOpen();
  }, [isOpen, onOpen]);

  return null;
};

export default HomePage;
