import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import Member from "@/models/Member";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    // exclude yourself from list
    const members = await Member.find({ clerkId: { $ne: userId } })
      .select("clerkId name imageUrl")
      .lean();

    return NextResponse.json(members);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
