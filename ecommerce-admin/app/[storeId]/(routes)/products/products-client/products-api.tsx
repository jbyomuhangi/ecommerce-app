import { useParams } from "next/navigation";
import React from "react";

import { ApiAlert } from "@/components/api-alert";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";

export const ProductsApi = () => {
  const params = useParams<{ storeId: string }>();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/stores/${params.storeId}/products`;

  return (
    <div>
      <Heading title="API" description="API calls for products" />

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <ApiAlert title="GET" variant="public" description={baseUrl} />

        <ApiAlert
          title="GET"
          variant="public"
          description={`${baseUrl}/{productId}`}
        />

        <ApiAlert title="POST" variant="private" description={baseUrl} />

        <ApiAlert
          title="PATCH"
          variant="private"
          description={`${baseUrl}/{productId}`}
        />

        <ApiAlert
          title="DELETE"
          variant="private"
          description={`${baseUrl}/{productId}`}
        />
      </div>
    </div>
  );
};
