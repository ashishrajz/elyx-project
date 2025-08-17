import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import DiagnosticTest from "@/models/DiagnosticTest";

export async function GET(
  req: Request,
  context: { params: { memberId: string } }
) {
  const { memberId } = context.params;
  await dbConnect();
  const tests = await DiagnosticTest.find({ memberId });
  return NextResponse.json(tests);
}
