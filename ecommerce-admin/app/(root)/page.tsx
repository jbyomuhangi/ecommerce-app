"use client";

import useCreateStoreModalStore from "@/hooks/useCreateStoreModalStore";
import { useEffect } from "react";

const HomePage = () => {
  const { isOpen, onOpen } = useCreateStoreModalStore();

  useEffect(() => {
    if (isOpen) return;
    onOpen();
  }, [isOpen, onOpen]);

  return <div className="p-4">Home page</div>;
};

export default HomePage;
