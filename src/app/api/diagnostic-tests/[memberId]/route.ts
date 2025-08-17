import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import DiagnosticTest from "@/models/DiagnosticTest";

export async function GET(
  _req: Request,
  context: { params: { memberId: string } }
) {
  await dbConnect();

  const { memberId } = context.params; // destructure inside
  const tests = await DiagnosticTest.find({ memberId });

  return NextResponse.json(tests);
}
