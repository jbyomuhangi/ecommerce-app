import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismaDb from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name } = body;
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await prismaDb.store.create({ data: { name, userId } });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
