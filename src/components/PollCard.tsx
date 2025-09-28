"use client";
import Link from "next/link";
import { useState } from "react";
import { voteOnPoll } from "@/lib/clientApi";
import type { Poll } from "@/lib/types";
import { ResultGraph } from "./ResultGraph";
import clsx from "clsx";

export function PollCard({ poll, dense=false }: { poll: Poll; dense?: boolean }) {
  const [local, setLocal] = useState<Poll>(poll);
  const voted = local.userVoted;
  const closed = new Date(local.closesAt).getTime() <= Date.now();

  const onVote = async (optionId: string) => {
    if (voted || closed) return;
    const updated = await voteOnPoll(local.id, optionId);
    setLocal(updated);
  };

  return (
    <article className={clsx("border rounded-xl p-4 space-y-3", dense && "p-3")}>
      <header className="flex items-center justify-between text-sm text-gray-500">
        <div>@{local.authorHandle}・{timeAgo(local.createdAt)}</div>
        <Link href={`/app/q/${local.id}`} className="text-blue-600">詳細</Link>
      </header>
      <h2 className="text-lg">{local.body}</h2>

      {!voted && !closed ? (
        <div className="space-y-2">
          {local.options.map(opt => (
            <button key={opt.id} onClick={() => onVote(opt.id)}
              className="w-full text-left border rounded-lg px-3 py-2 hover:bg-gray-50">
              {opt.label}
            </button>
          ))}
          <div className="text-xs text-gray-500 flex gap-3">
            <span>締切: {new Date(local.closesAt).toLocaleString()}</span>
            <span>投票数: {local.totalVotes}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <ResultGraph poll={local} />
          <div className="text-xs text-gray-500 flex gap-3">
            <span>{closed ? "締切済" : "投票済"}</span>
            <span>投票数: {local.totalVotes}</span>
          </div>
        </div>
      )}
    </article>
  );
}

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime())/1000;
  if (diff < 60) return `${Math.floor(diff)}s`;
  if (diff < 3600) return `${Math.floor(diff/60)}m`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h`;
  return `${Math.floor(diff/86400)}d`;
}
