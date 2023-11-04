import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { clientApiId: string } }
) {
  try {
    if (!params.clientApiId) {
      return new NextResponse("clientApiId is required", { status: 400 });
    }

    const api = await prismadb.clientAPI.findUnique({
      where: {
        id: params.clientApiId,
      },
    });

    return NextResponse.json(api);
  } catch (error) {
    console.log("[CLIENT_API_GET_BY_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
