import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const sizes = await prismaDb.size.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[STORES_SIZES_GET]: ", error);
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
    const { name, value } = body;

    if (!name) return new NextResponse("name is required", { status: 400 });
    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }

    const store = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) return new NextResponse("Store not found", { status: 400 });

    const size = await prismaDb.size.create({
      data: { name, value, storeId: store.id },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[STORES_SIZE_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
