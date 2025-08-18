import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import WearableData from "@/models/WearableData";

export async function GET(_req: Request, context: any) {
  try {
    await dbConnect();
    const { userId } = context.params; // ✅ correct way

    const wearables = await WearableData.find({ userClerkId: userId }).sort({ date: 1 });
    return NextResponse.json(wearables);
  } catch (err: any) {
    console.error("❌ Error in /wearables/[userId]:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
