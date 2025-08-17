import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TestReport from "@/models/TestReport";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  await dbConnect();
  const { userId } = params;

  try {
    const reports = await TestReport.find({ userClerkId: userId }).sort({ date: 1 });
    return NextResponse.json(reports);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
