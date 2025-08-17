import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";
import { auth } from "@clerk/nextjs/server";

export async function GET(_req: Request, context: any) {
  try {
    await dbConnect();
    const { userId: memberClerkId } = context.params;

    const { userId } = await auth(); // logged-in team member
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1:1 chat: either sender or receiver is this member
    const messages = await Message.find({
      $or: [
        { senderClerkId: memberClerkId },
        { receiverClerkId: memberClerkId },
      ],
    }).sort({ createdAt: 1 });

    return NextResponse.json(messages);
  } catch (err: any) {
    console.error("❌ Error in messages route:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
