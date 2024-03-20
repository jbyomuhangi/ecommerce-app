import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } },
) => {
  try {
    const { storeId, categoryId } = params;

    if (!storeId || !categoryId) {
      return new NextResponse("'storeId' and 'categoryId' is required", {
        status: 400,
      });
    }

    const category = await prismaDb.category.findUnique({
      where: { id: categoryId, storeId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[STORE_CATEGORY_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const store = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) return new NextResponse("Store not found", { status: 400 });

    const body = await req.json();
    const { name, billboardId } = body;

    if (!name) return new NextResponse("'name' is required", { status: 400 });
    if (!billboardId) {
      return new NextResponse("'billboardId' is required", { status: 400 });
    }

    const category = await prismaDb.category.update({
      where: { id: params.categoryId, storeId: store.id },
      data: { name, billboardId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[STORE_CATEGORY_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { storeId, categoryId } = params;
    if (!storeId || !categoryId) {
      return new NextResponse("'storeId' and 'categoryId' is required", {
        status: 400,
      });
    }

    const category = await prismaDb.category.deleteMany({
      where: { id: categoryId, storeId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[STORE_CATEGORY_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
