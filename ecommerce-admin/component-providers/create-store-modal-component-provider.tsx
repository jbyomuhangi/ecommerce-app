"use client";

import React, { useEffect, useState } from "react";

import { CreateStoreModal } from "@/components/create-store-modal";

export const CreateStoreModalComponentProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <CreateStoreModal />;
};
