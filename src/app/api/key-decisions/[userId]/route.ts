import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import KeyDecision from "@/models/KeyDecision";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  await dbConnect();
  const { userId } = params;

  try {
    const decisions = await KeyDecision.find({ userClerkId: userId }).sort({ date: 1 });
    return NextResponse.json(decisions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
