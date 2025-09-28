import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const _ = await req.json().catch(()=>null);
  // 受領のみ（本番ではDBに記録してモデレーションへ）
  return NextResponse.json({ ok: true });
}
