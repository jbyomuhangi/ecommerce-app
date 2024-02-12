"use client";

import useCreateStoreModalStore from "@/hooks/useCreateStoreModalStore";
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
