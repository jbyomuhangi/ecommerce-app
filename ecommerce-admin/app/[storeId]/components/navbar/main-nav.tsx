"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useMemo } from "react";

export const MainNav = () => {
  const pathname = usePathname();
  const params = useParams<{ storeId: string }>();

  const routes = useMemo(() => {
    return [
      { href: `/${params.storeId}`, label: "Overview" },
      { href: `/${params.storeId}/billboards`, label: "Billboards " },
      { href: `/${params.storeId}/settings`, label: "Settings" },
    ];
  }, [params.storeId]);

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => {
        const isActive = route.href === pathname;

        return (
          <Link
            key={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-black dark:text-white" : "text-muted-foreground",
            )}
            href={route.href}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};