import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import DiagnosticTest from "@/models/DiagnosticTest";

export async function GET(
  _req: Request,
  context: { params: Record<string, string> }
) {
  await dbConnect();

  const memberId = context.params.memberId;
  const tests = await DiagnosticTest.find({ memberId });

  return NextResponse.json(tests);
}
