import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } },
) => {
  try {
    const { storeId, colorId } = params;

    if (!storeId || !colorId) {
      return new NextResponse("'storeId' and 'colorId' is required", {
        status: 400,
      });
    }

    const color = await prismaDb.color.findUnique({
      where: { id: colorId, storeId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[STORE_COLOR_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const store = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) return new NextResponse("Store not found", { status: 400 });

    const body = await req.json();
    const { name, value } = body;

    if (!name) return new NextResponse("'name' is required", { status: 400 });
    if (!value) {
      return new NextResponse("'value' is required", { status: 400 });
    }

    const color = await prismaDb.color.update({
      where: { id: params.colorId, storeId: store.id },
      data: { name, value },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[STORE_COLOR_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { storeId, colorId } = params;
    if (!storeId || !colorId) {
      return new NextResponse("'storeId' and 'colorId' is required", {
        status: 400,
      });
    }

    const color = await prismaDb.color.deleteMany({
      where: { id: colorId, storeId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[STORE_COLOR_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
