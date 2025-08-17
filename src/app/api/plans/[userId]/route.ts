import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Plan from "@/models/Plan";

export async function GET(_req: Request, context: any) {
  try {
    await dbConnect();
    const { userId } = context.params; // ✅ access params here

    const plans = await Plan.find({ userClerkId: userId }).sort({ date: 1 });
    return NextResponse.json(plans);
  } catch (err: any) {
    console.error("❌ Error in /plans/[userId]:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
