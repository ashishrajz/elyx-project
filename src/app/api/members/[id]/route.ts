import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Member from "@/models/Member";
import TeamMember from "@/models/TeamMember";

export async function GET(_req: Request, context: any) {
  try {
    await dbConnect();
    const { id } = context.params; // Clerk ID

    const teamMember = await TeamMember.findOne({ clerkId: id });
    if (teamMember) {
      return NextResponse.json({
        clerkId: teamMember.clerkId,
        name: teamMember.name,
        imageUrl: teamMember.imageUrl,
        role: teamMember.role ?? "Concierge",
      });
    }

    const member = await Member.findOne({ clerkId: id });
    if (member) {
      return NextResponse.json({
        clerkId: member.clerkId,
        name: member.name,
        imageUrl: member.imageUrl,
        role: "Member",
      });
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (err: any) {
    console.error("❌ Error in /members/[id]:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
