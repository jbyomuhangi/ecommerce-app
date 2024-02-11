"use client";

import React, { useEffect, useState } from "react";

import CreateStoreModal from "@/components/CreateStoreModal";

const CreateStoreModalComponentProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <CreateStoreModal />;
};

export default CreateStoreModalComponentProvider;
