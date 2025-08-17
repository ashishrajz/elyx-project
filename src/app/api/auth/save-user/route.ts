import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Member from "@/models/Member";
import TeamMember from "@/models/TeamMember";

export async function POST(req: Request) {
  await dbConnect();
  const { clerkId, email, name, type } = await req.json();

  if (type === "member") {
    await Member.create({ clerkId, email, name });
  } else {
    await TeamMember.create({ clerkId, email, name, role: "Concierge" });
  }

  return NextResponse.json({ success: true });
}
