import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const billboards = await prismaDb.billboard.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[STORES_BILLBOARDS_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { label, imageUrl } = body;

    if (!label) return new NextResponse("label is required", { status: 400 });
    if (!imageUrl) {
      return new NextResponse("imageUrl is required", { status: 400 });
    }

    const store = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) return new NextResponse("Store not found", { status: 400 });

    const billboard = await prismaDb.billboard.create({
      data: { imageUrl, label, storeId: store.id },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[STORES_BILLBOARDS_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
