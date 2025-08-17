import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import Member from "@/models/Member";
import TeamMember from "@/models/TeamMember";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const clerkId = body.clerkId ?? userId;

  await dbConnect();

  // Already team member?
  const existingTeam = await TeamMember.findOne({ clerkId });
  if (existingTeam) return NextResponse.json(existingTeam);

  // Prevent dual registration
  const existingMember = await Member.findOne({ clerkId });
  if (existingMember) {
    return NextResponse.json(
      { error: "This account is already a member." },
      { status: 409 }
    );
  }

  const role = body.role || "Concierge";

  const doc = await TeamMember.create({
    clerkId,
    email: body.email,
    name: body.name,
    imageUrl: body.imageUrl,
    role,
  });

  return NextResponse.json(doc);
}
