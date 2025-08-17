import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import DiagnosticTest from "@/models/DiagnosticTest";

export async function GET(req: Request, context: any) {
  const { memberId } = context.params; // no TS validation here
  await dbConnect();
  const tests = await DiagnosticTest.find({ memberId });
  return NextResponse.json(tests);
}
