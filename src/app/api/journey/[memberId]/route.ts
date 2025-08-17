import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Journey from "@/models/Journey";

export async function GET(_req: Request, context: any) {
  const { memberId } = context.params;

  await dbConnect();
  const journey = await Journey.findOne({ memberId });

  return NextResponse.json(journey);
}
