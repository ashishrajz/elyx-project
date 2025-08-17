import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Metric from "@/models/Metric";

export async function GET(_req: Request, { params }: { params: { memberId: string } }) {
  await dbConnect();
  const metrics = await Metric.find({ memberId: params.memberId });
  return NextResponse.json(metrics);
}
