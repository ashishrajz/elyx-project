import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import DiagnosticTest from "@/models/DiagnosticTest";

export async function POST(req: Request) {
  await dbConnect();
  const test = await DiagnosticTest.create(await req.json());
  return NextResponse.json(test);
}
