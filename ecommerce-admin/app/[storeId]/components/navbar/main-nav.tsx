"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

import { Button } from "@/components/ui/button";

export const MainNav = () => {
  const pathname = usePathname();
  const params = useParams<{ storeId: string }>();
  const router = useRouter();

  const routes = useMemo(() => {
    return [
      { href: `/${params.storeId}/billboards`, label: "Billboards" },
      { href: `/${params.storeId}/categories`, label: "Categories" },
      { href: `/${params.storeId}/sizes`, label: "Sizes" },
      { href: `/${params.storeId}/colors`, label: "Colors" },
      { href: `/${params.storeId}/products`, label: "Products" },
      { href: `/${params.storeId}/orders`, label: "Orders" },
      { href: `/${params.storeId}/settings`, label: "Settings" },
    ];
  }, [params.storeId]);

  return (
    <nav className="flex items-center gap-2">
      {routes.map((route) => {
        const isActive = pathname.startsWith(route.href);

        return (
          <Button
            key={route.href}
            className="h-[30px]"
            variant={isActive ? "default" : "ghost"}
            onClick={() => router.push(route.href)}
          >
            {route.label}
          </Button>
        );
      })}
    </nav>
  );
};
