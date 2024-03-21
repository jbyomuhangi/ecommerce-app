import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) => {
  try {
    const { storeId, productId } = params;

    if (!storeId || !productId) {
      return new NextResponse("'storeId' and 'productId' is required", {
        status: 400,
      });
    }

    const product = await prismaDb.product.findUnique({
      where: { id: productId, storeId },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[STORE_PRODUCT_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

type BodyType = {
  name: string;
  images: string[];
  price: number;
  categoryId: string;
  colorId: string;
  sizeId: string;
  isFeatured: boolean;
  isArchived: boolean;
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const store = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!store) return new NextResponse("Store not found", { status: 400 });

    const body: BodyType = await req.json();
    const {
      name,
      images,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body;

    if (!name) return new NextResponse("name is required", { status: 400 });
    if (!price) return new NextResponse("price is required", { status: 400 });
    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("colorId is required", { status: 400 });
    }
    if (!sizeId) return new NextResponse("sizeId is required", { status: 400 });

    if (!images || images.length === 0) {
      return new NextResponse("images are required", { status: 400 });
    }

    await prismaDb.product.update({
      where: { id: params.productId, storeId: store.id },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        storeId: store.id,
        colorId,
        images: { deleteMany: {} },
      },
    });

    const product = await prismaDb.product.update({
      where: { id: params.productId, storeId: store.id },
      data: {
        images: { createMany: { data: images.map((url) => ({ url })) } },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[STORE_PRODUCT_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { storeId, productId } = params;
    if (!storeId || !productId) {
      return new NextResponse("'storeId' and 'productId' is required", {
        status: 400,
      });
    }

    const product = await prismaDb.product.deleteMany({
      where: { id: productId, storeId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[STORE_PRODUCT_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
