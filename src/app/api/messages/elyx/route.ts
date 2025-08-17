import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    await dbConnect();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only return messages that involve this member
    const messages = await Message.find({
      group: "elyx",
      $or: [
        { senderClerkId: userId },
        { receiverClerkId: userId }, // some messages may have receiverClerkId
        { receiverClerkId: null } // group messages
      ],
    }).sort({ createdAt: 1 });

    return NextResponse.json(messages);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
