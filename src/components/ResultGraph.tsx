"use client";
import type { Poll } from "@/lib/types";

export function ResultGraph({ poll }: { poll: Poll }) {
  const total = Math.max(1, poll.totalVotes);
  return (
    <div className="space-y-2" aria-live="polite">
      {poll.options.map(opt => {
        const count = opt.votes ?? 0;
        const pct = Math.round((count / total) * 100);
        return (
          <div key={opt.id} className="w-full">
            <div className="flex items-center justify-between text-sm">
              <span>{opt.label}</span>
              <span>{pct}% ({count})</span>
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div className="h-2 rounded bg-gray-800" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
