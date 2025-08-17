import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TeamMember from "@/models/TeamMember";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const teamMember = await TeamMember.findById(params.id);
  return NextResponse.json(teamMember);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const updated = await TeamMember.findByIdAndUpdate(params.id, await req.json(), { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  await TeamMember.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

