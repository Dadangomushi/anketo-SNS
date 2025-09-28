import { PollCard } from "@/components/PollCard";
import Link from "next/link";

async function fetchPolls() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/polls`, { cache: "no-store" });
  const json = await res.json();
  return json.polls as any[];
}

export default async function Home() {
  const polls = await fetchPolls();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">公開タイムライン</h1>
        <Link className="px-3 py-2 rounded-lg bg-black text-white" href="/app/create">＋ 質問を作る</Link>
      </div>
      <div className="space-y-4">
        {polls.map((p) => <PollCard key={p.id} poll={p} />)}
      </div>
    </div>
  );
}
