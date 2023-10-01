import { NextResponse } from "next/server";
import multer from "multer";
import prismadb from "@/lib/prismadb";
import { join } from "path";
import { writeFile } from "fs/promises";

import path from "path";

// @ts-ignore
export const POST = async (req) => {
  const formData = await req.formData();

  const file = formData.get("file");
  const clientName = formData.get("clientName");
  const description = formData.get("description");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    const client = await prismadb.client.create({
      data: {
        clientName,
        description,
        logoUrl: `/uploads/${filename}`,
      },
    });
    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(req: Request) {
  try {
    const clients = await prismadb.client.findMany();

    return NextResponse.json(clients);
  } catch (error) {
    console.log("[CLIENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
