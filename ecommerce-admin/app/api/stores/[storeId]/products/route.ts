import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    const products = await prismaDb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colors: { some: { id: colorId } },
        sizes: { some: { id: sizeId } },
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: { images: true, category: true, colors: true, sizes: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[STORE_PRODUCTS_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

type BodyType = {
  name: string;
  images: string[];
  price: number;
  categoryId: string;
  colorIds: string[];
  sizeIds: string[];
  isFeatured: boolean;
  isArchived: boolean;
};

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body: BodyType = await req.json();
    const {
      name,
      images,
      price,
      categoryId,
      colorIds,
      sizeIds,
      isFeatured,
      isArchived,
    } = body;

    if (!name) return new NextResponse("name is required", { status: 400 });
    if (!price) return new NextResponse("price is required", { status: 400 });
    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }
    if (!colorIds) {
      return new NextResponse("colorId is required", { status: 400 });
    }
    if (!sizeIds)
      return new NextResponse("sizeId is required", { status: 400 });

    if (!images || images.length === 0) {
      return new NextResponse("images are required", { status: 400 });
    }

    const store = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) return new NextResponse("Store not found", { status: 400 });

    const product = await prismaDb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        storeId: store.id,
        images: { createMany: { data: images.map((url) => ({ url })) } },
        sizes: { connect: sizeIds.map((id) => ({ id })) },
        colors: { connect: colorIds.map((id) => ({ id })) },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[STORE_PRODUCTS_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
