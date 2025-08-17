import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Plan from "@/models/Plan";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  await dbConnect();
  const { userId } = params;

  try {
    const plans = await Plan.find({ userClerkId: userId }).sort({ date: 1 });
    return NextResponse.json(plans);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
