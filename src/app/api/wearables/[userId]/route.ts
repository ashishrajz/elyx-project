import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TestReport from "@/models/TestReport";

export async function GET(_req: Request, context: any) {
  try {
    await dbConnect();
    const { userId } = context.params; // ✅ access params safely

    const reports = await TestReport.find({ userClerkId: userId }).sort({ date: 1 });
    return NextResponse.json(reports);
  } catch (err: any) {
    console.error("❌ Error in /test-reports/[userId]:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
