import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { clientId: string; transactionId: string } }
) {
  try {
    const body = await req.json();

    const { status } = body;

    if (!params.clientId) {
      return new NextResponse("Client Id is required", { status: 400 });
    }

    if (!params.transactionId) {
      return new NextResponse("Transaction Id is required", { status: 400 });
    }

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    const existingReconciliation = await prismadb.reconciliation.findUnique({
      where: {
        clientId: params.clientId,
        id: params.transactionId,
      },
    });

    if (!existingReconciliation) {
      return new NextResponse("Transaction not found", { status: 404 });
    }

    const updatedReconciliation = await prismadb.reconciliation.update({
      where: {
        clientId: params.clientId,
        id: params.transactionId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedReconciliation);
  } catch (error) {
    console.error("[RECONCILIATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
