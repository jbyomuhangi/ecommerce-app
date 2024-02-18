import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) => {
  try {
    const { storeId, billboardId } = params;

    if (!storeId || !billboardId) {
      return new NextResponse("'storeId' and 'billboardId' is required", {
        status: 400,
      });
    }

    const billboard = await prismaDb.billboard.findUnique({
      where: { id: billboardId, storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[STORE_BILLBOARD_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const store = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) return new NextResponse("Store not found", { status: 400 });

    const body = await req.json();
    const { label, imageUrl } = body;

    if (!label) return new NextResponse("'label' is required", { status: 400 });
    if (!imageUrl) {
      return new NextResponse("'imageUrl' is required", { status: 400 });
    }

    const billboard = await prismaDb.billboard.updateMany({
      where: { id: params.billboardId, storeId: store.id },
      data: { label, imageUrl },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[STORE_BILLBOARD_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { storeId, billboardId } = params;
    if (!storeId || !billboardId) {
      return new NextResponse("'storeId' and 'billboardId' is required", {
        status: 400,
      });
    }

    const billboard = await prismaDb.billboard.deleteMany({
      where: { id: billboardId, storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[STORE_BILLBOARD_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
