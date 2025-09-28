import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { listPolls, createPoll as create } from "@/lib/mock";

export async function GET() {
  return NextResponse.json({ polls: listPolls() });
}

const CreateSchema = z.object({
  body: z.string().min(1).max(140),
  options: z.array(z.string().min(1)).min(2).max(4),
  visibility: z.enum(["public", "unlisted"]).default("public"),
  closesAt: z.string(),
  authorHandle: z.string().min(1).max(32).default("guest"),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(()=>null);
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const poll = create(parsed.data);
  return NextResponse.json(poll, { status: 201 });
}
