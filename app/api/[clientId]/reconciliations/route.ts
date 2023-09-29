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
    } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!transactionReference) {
      return new NextResponse("Transaction Reference is required", {
        status: 400,
      });
    }
    if (!amount) {
      return new NextResponse("amount is required", { status: 400 });
    }
    if (!customerAccountNumber) {
      return new NextResponse("customerAccountNumber is required", {
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
