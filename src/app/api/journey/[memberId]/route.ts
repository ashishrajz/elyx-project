import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Journey from "@/models/Journey";

export async function GET(_req: Request, { params }: { params: { memberId: string } }) {
  await dbConnect();
  const journey = await Journey.findOne({ memberId: params.memberId });
  return NextResponse.json(journey);
}
