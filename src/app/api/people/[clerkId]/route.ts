import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Member from "@/models/Member";
import TeamMember from "@/models/TeamMember";

export async function GET(_req: Request, context: any) {
  try {
    const { clerkId } = context.params; // ✅ plain object
    await dbConnect();

    const member = await Member.findOne({ clerkId })
      .select("clerkId name imageUrl")
      .lean();

    if (member) {
      return NextResponse.json({ ...member, role: "Member" });
    }

    const team = await TeamMember.findOne({ clerkId })
      .select("clerkId name imageUrl role")
      .lean();

    if (team) {
      return NextResponse.json({ ...team, role: "TeamMember" });
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (e: any) {
    console.error("❌ Error in /members/[clerkId]:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
