import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function GET(_: Request, { params }: { params: { teamClerkId: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const msgs = await Message.find({
    $or: [
      { senderClerkId: userId, receiverClerkId: params.teamClerkId },
      { senderClerkId: params.teamClerkId, receiverClerkId: userId },
    ],
  }).sort({ createdAt: 1 });

  return NextResponse.json(msgs);
}
