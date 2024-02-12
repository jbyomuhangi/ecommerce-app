"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useMemo } from "react";

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const client = useMemo(() => {
    return new QueryClient();
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
