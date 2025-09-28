"use client";
import { useState } from "react";
import { createPoll } from "@/lib/clientApi";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const [q, setQ] = useState("");
  const [opts, setOpts] = useState<string[]>(["", ""]);
  const [visibility, setVisibility] = useState<"public"|"unlisted">("public");
  const [hours, setHours] = useState(24);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onAdd = () => setOpts((o)=> o.length<4 ? [...o, ""] : o);
  const onChangeOpt = (i:number, v:string) => setOpts(prev => prev.map((x,idx)=> idx===i? v : x));
  const onSubmit = async () => {
    try {
      setLoading(true);
      const closesAt = new Date(Date.now() + hours*3600*1000).toISOString();
      const poll = await createPoll({ body: q, options: opts.filter(Boolean), visibility, closesAt, authorHandle: "guest" });
      router.push(`/app/q/${poll.id}`);
    } catch {
      alert("作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">質問を作成</h1>
      <textarea value={q} onChange={e=>setQ(e.target.value)} maxLength={140}
        className="w-full border rounded-lg p-3" placeholder="質問文（140文字）" rows={3} />
      <div className="space-y-2">
        {opts.map((o,i)=>(
          <input key={i} value={o} onChange={e=>onChangeOpt(i, e.target.value)} className="w-full border rounded-lg p-2" placeholder={`選択肢 ${i+1}`} />
        ))}
        {opts.length < 4 && <button onClick={onAdd} className="text-sm text-blue-600">＋ 選択肢を追加</button>}
      </div>
      <div className="flex gap-3 items-center text-sm">
        <label>可視性:
          <select value={visibility} onChange={e=>setVisibility(e.target.value as any)} className="ml-2 border rounded p-1">
            <option value="public">公開</option>
            <option value="unlisted">限定リンク</option>
          </select>
        </label>
        <label>締切:
          <select value={hours} onChange={e=>setHours(parseInt(e.target.value))} className="ml-2 border rounded p-1">
            <option value={24}>24時間</option>
            <option value={12}>12時間</option>
            <option value={6}>6時間</option>
            <option value={1}>1時間</option>
          </select>
        </label>
      </div>
      <button onClick={onSubmit} disabled={loading} className="px-4 py-2 rounded-lg bg-black text-white">
        {loading? "公開中..." : "公開する"}
      </button>
    </div>
  );
}
