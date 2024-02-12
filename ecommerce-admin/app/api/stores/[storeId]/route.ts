import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name } = body;
    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await prismaDb.store.updateMany({
      where: { userId, id: params.storeId },
      data: { name },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const store = await prismaDb.store.deleteMany({
      where: { userId, id: params.storeId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
