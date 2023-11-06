import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
// import { join } from "path";

// @ts-ignore

export async function GET({ params }: { params: { clientId: string } }) {
  try {
    const operations = await prismadb.operation.findMany();

    return NextResponse.json(operations);
  } catch (error) {
    console.log("[OPERATIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
