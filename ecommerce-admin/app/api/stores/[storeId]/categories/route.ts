import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const categories = await prismaDb.category.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[STORE_CATEGORIES_GET]: ", error);
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
    const { name, billboardId } = body;

    if (!name) return new NextResponse("name is required", { status: 400 });
    if (!billboardId) {
      return new NextResponse("billboardId is required", { status: 400 });
    }

    const store = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) return new NextResponse("Store not found", { status: 400 });

    const category = await prismaDb.category.create({
      data: { name, billboardId, storeId: store.id },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[STORE_CATEGORIES_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
