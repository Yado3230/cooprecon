import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    // const { userId } = auth();
    const body = await req.json();

    const { clientName, accountNumber, description } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!clientName) {
      return new NextResponse("Client Name is required", { status: 400 });
    }

    const client = await prismadb.client.create({
      data: {
        clientName,
        accountNumber,
        description,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const clients = await prismadb.client.findMany();

    return NextResponse.json(clients);
  } catch (error) {
    console.log("[CLIENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
