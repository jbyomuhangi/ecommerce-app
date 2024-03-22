import { redirect } from "next/navigation";
import React from "react";

interface StoreHomePageProps {
  params: { storeId: string };
}

const StoreHomePageProps: React.FC<StoreHomePageProps> = ({ params }) => {
  redirect(`/${params.storeId}/billboards`);
  return null;
};

export default StoreHomePageProps;
