import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) => {
  try {
    const { storeId, sizeId } = params;

    if (!storeId || !sizeId) {
      return new NextResponse("'storeId' and 'sizeId' is required", {
        status: 400,
      });
    }

    const size = await prismaDb.size.findUnique({
      where: { id: sizeId, storeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[STORE_SIZE_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
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

    const size = await prismaDb.size.update({
      where: { id: params.sizeId, storeId: store.id },
      data: { name, value },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[STORE_SIZE_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { storeId, sizeId } = params;
    if (!storeId || !sizeId) {
      return new NextResponse("'storeId' and 'sizeId' is required", {
        status: 400,
      });
    }

    const size = await prismaDb.size.deleteMany({
      where: { id: sizeId, storeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[STORE_SIZE_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
