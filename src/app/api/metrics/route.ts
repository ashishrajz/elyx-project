import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Metric from "@/models/Metric";

export async function POST(req: Request) {
  await dbConnect();
  const metric = await Metric.create(await req.json());
  return NextResponse.json(metric);
}
