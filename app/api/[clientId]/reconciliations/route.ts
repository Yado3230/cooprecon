import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    // const { userId } = auth();
    const body = await req.json();

    const {
      transactionReference,
      amount,
      customerAccountNumber,
      date,
      status,
      operation,
      reversalReference,
      interestReference,
      letterNo,
    } = body;

    if (!transactionReference) {
      return new NextResponse("Transaction Reference is required", {
        status: 400,
      });
    }
    if (!operation) {
      return new NextResponse("operation is required", {
        status: 400,
      });
    }

    if (!date) {
      return new NextResponse("date is required", { status: 400 });
    }

    if (!params.clientId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const reconciliation = await prismadb.reconciliation.create({
      data: {
        clientId: params.clientId,
        transactionReference,
        amount,
        customerAccountNumber,
        date,
        reversalReference,
        interestReference,
        letterNo,
        operation,
        status,
      },
    });

    return NextResponse.json(reconciliation);
  } catch (error) {
    console.log("[RECONCILIATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const reconciliations = await prismadb.reconciliation.findMany({
      where: {
        clientId: params.clientId,
      },
    });

    return NextResponse.json(reconciliations);
  } catch (error) {
    console.log("[reconciliations_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
