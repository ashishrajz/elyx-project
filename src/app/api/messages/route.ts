// src/app/api/messages/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";
import { auth } from "@clerk/nextjs/server";
import TeamMember from "@/models/TeamMember";
import Member from "@/models/Member";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { text, receiverClerkId, group } = body;

    // get logged-in user from Clerk
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // fetch user role from DB
    let role = "Member"; // default
    const teamMember = await TeamMember.findOne({ clerkId: userId });
    if (teamMember) role = "TeamMember";

    // create the message
    const message = await Message.create({
      senderClerkId: userId,
      senderName: body.senderName || (teamMember ? teamMember.name : "Unknown"),
      senderRole: role, // ✅ properly detect TeamMember vs Member
      text,
      group:"elyx",
      receiverClerkId: group ? null : receiverClerkId || null,
    });

    return NextResponse.json(message);
  } catch (err: any) {
    console.error("POST /messages error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
