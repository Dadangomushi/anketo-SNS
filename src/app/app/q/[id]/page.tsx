import { PollCard } from "@/components/PollCard";

async function fetchPoll(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/polls/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function Detail({ params }: { params: { id: string } }) {
  const poll = await fetchPoll(params.id);
  if (!poll) return <div>見つかりませんでした。</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">質問</h1>
      <PollCard poll={poll} />
    </div>
  );
}
