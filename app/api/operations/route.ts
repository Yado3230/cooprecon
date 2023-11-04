import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
// import { join } from "path";

// @ts-ignore
export const POST = async (req) => {
  try {
    const body = await req.json();

    const { clientId, operation, bodyData } = body;
    if (!clientId) {
      return NextResponse.json(
        { error: "Client Id is required." },
        { status: 400 }
      );
    }
    if (!operation) {
      return NextResponse.json(
        { error: "operation is required." },
        { status: 400 }
      );
    }
    if (!bodyData) {
      return NextResponse.json(
        { error: "bodyData is required." },
        { status: 400 }
      );
    }

    const client = await prismadb.operation.create({
      data: {
        clientId,
        operation,
        bodyData,
      },
    });
    return NextResponse.json(client);
  } catch (error) {
    console.log("[OPERATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(req: Request) {
  try {
    const operations = await prismadb.operation.findMany();

    return NextResponse.json(operations);
  } catch (error) {
    console.log("[OPERATIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
