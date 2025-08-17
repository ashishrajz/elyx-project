import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Journey from "@/models/Journey";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const journey = await Journey.create(body);
  return NextResponse.json(journey);
}
