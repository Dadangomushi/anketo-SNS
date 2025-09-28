import { NextRequest, NextResponse } from "next/server";
import { vote } from "@/lib/mock";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const json = await req.json().catch(()=>null);
  const parsed = z.object({ optionId: z.string() }).safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  try {
    const updated = vote({ pollId: params.id, optionId: parsed.data.optionId, userId: "guest" });
    return NextResponse.json(updated);
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
