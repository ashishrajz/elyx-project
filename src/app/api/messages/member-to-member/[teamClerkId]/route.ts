import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function GET(_req: Request, context: any) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { teamClerkId } = context.params;

    const msgs = await Message.find({
      $or: [
        { senderClerkId: userId, receiverClerkId: teamClerkId },
        { senderClerkId: teamClerkId, receiverClerkId: userId },
      ],
    }).sort({ createdAt: 1 });

    return NextResponse.json(msgs);
  } catch (err: any) {
    console.error("❌ Error in GET /messages/[teamClerkId]:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
