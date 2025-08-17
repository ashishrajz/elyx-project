import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import KeyDecision from "@/models/KeyDecision";

export async function GET(_req: Request, context: any) {
  const { userId } = context.params;

  await dbConnect();

  try {
    const decisions = await KeyDecision.find({ userClerkId: userId }).sort({ date: 1 });
    return NextResponse.json(decisions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
