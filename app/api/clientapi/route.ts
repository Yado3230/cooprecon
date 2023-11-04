import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
// import { join } from "path";

// @ts-ignore
export const POST = async (req) => {
  try {
    const body = await req.json();

    const { clientId, domain, port, endpoint } = body;
    if (!clientId) {
      return NextResponse.json(
        { error: "Client Id is required." },
        { status: 400 }
      );
    }
    if (!domain) {
      return NextResponse.json(
        { error: "domain is required." },
        { status: 400 }
      );
    }
    if (!port) {
      return NextResponse.json({ error: "port is required." }, { status: 400 });
    }
    if (!endpoint) {
      return NextResponse.json(
        { error: "endpoint is required." },
        { status: 400 }
      );
    }

    const client = await prismadb.clientAPI.create({
      data: {
        clientId,
        domain,
        port,
        endpoint,
      },
    });
    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENTAPI_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(req: Request) {
  try {
    const operations = await prismadb.clientAPI.findMany();

    return NextResponse.json(operations);
  } catch (error) {
    console.log("[CLIENTAPI'S_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
