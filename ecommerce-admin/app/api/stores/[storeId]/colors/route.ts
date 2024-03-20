import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const colors = await prismaDb.color.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[STORE_COLORS_GET]: ", error);
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

    const color = await prismaDb.color.create({
      data: { name, value, storeId: store.id },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[STORE_COLORS_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
