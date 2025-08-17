import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import WearableData from "@/models/WearableData";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  await dbConnect();
  const { userId } = params;

  try {
    const wearables = await WearableData.find({ userClerkId: userId }).sort({ date: 1 });
    return NextResponse.json(wearables);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
