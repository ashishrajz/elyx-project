import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TeamMember from "@/models/TeamMember";

export async function GET(_req: Request, context: any) {
  await dbConnect();
  const { id } = context.params;
  const teamMember = await TeamMember.findById(id);
  return NextResponse.json(teamMember);
}

export async function PUT(req: Request, context: any) {
  await dbConnect();
  const { id } = context.params;
  const body = await req.json();
  const updated = await TeamMember.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, context: any) {
  await dbConnect();
  const { id } = context.params;
  await TeamMember.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
