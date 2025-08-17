// src/app/api/auth/me/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Member, { IMember } from "@/models/Member";
import TeamMember, { ITeamMember } from "@/models/TeamMember";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // ✅ check team member first
    const teamMember = await TeamMember.findOne<ITeamMember>({ clerkId: userId }).lean();
    if (teamMember) {
      return NextResponse.json({
        role: "team",
        user: {
          id: String(teamMember._id), // 👈 force it to string
          clerkId: teamMember.clerkId,
          name: teamMember.name,
          email: teamMember.email,
          role: teamMember.role,
          imageUrl: teamMember.imageUrl || null,
        },
      });
    }

    // ✅ check normal member
    const member = await Member.findOne<IMember>({ clerkId: userId }).lean();
    if (member) {
      return NextResponse.json({
        role: "member",
        user: {
          id: String(member._id), // 👈 force it to string
          clerkId: member.clerkId,
          name: member.name,
          email: member.email,
          imageUrl: member.imageUrl || null,
        },
      });
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (err: any) {
    console.error("Auth /me error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
