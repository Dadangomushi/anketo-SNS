import { NextRequest, NextResponse } from "next/server";
import { getPoll } from "@/lib/mock";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const userId = "guest"; // TODO: replace with real auth
  const poll = getPoll(params.id, userId);
  if (!poll) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(poll);
}
