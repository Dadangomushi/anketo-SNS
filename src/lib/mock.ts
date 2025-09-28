import { nanoid } from "nanoid";
import type { Poll } from "./types";

// In-memory store. Replaced with DB later.
const store: { polls: Poll[]; votesByUser: Record<string, Record<string, string>> } = {
  polls: [],
  votesByUser: {}, // userId -> { pollId: optionId }
};

function seed() {
  if (store.polls.length) return;
  const now = new Date();
  const mk = (body: string, mins: number) => {
    const id = nanoid(10);
    const created = new Date(now.getTime() - mins * 60000).toISOString();
    const closesAt = new Date(now.getTime() + (120 - mins) * 60000).toISOString();

    // ① options を先に作って…
    const options = [
      { id: nanoid(8), label: "和食",   votes: Math.floor(Math.random() * 100) },
      { id: nanoid(8), label: "洋食",   votes: Math.floor(Math.random() * 100) },
      { id: nanoid(8), label: "中華",   votes: Math.floor(Math.random() * 100) },
      { id: nanoid(8), label: "その他", votes: Math.floor(Math.random() * 100) },
    ];

    // ② 合計を数値で保持（getterを使わない）
    const totalVotes = options.reduce((a, o) => a + o.votes, 0);

    // ③ Poll を返す
    return {
      id,
      authorHandle: "mika",
      body,
      visibility: "public" as const,
      closesAt,
      createdAt: created,
      options,
      totalVotes,
    } as Poll;
  };

  const a = mk("明日のランチ、何がいい？", 5);
  const b = mk("休日はどう過ごす？", 60);
  const c = mk("推しの新曲、どうだった？", 30);
  store.polls.push(a, b, c);
}
seed();

export function listPolls(): Poll[] {
  return store.polls
    .slice()
    .sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPoll(id: string, userId?: string) {
  const p = store.polls.find(p=>p.id===id);
  if (!p) return null;
  const userVoted = userId ? !!store.votesByUser[userId]?.[id] : false;
  return { ...p, userVoted };
}

export function createPoll({ authorHandle, body, options, visibility, closesAt }:{ authorHandle:string; body:string; options:string[]; visibility:"public"|"unlisted"; closesAt:string; }): Poll {
  const poll: Poll = {
    id: nanoid(10),
    authorHandle,
    body,
    visibility,
    createdAt: new Date().toISOString(),
    closesAt,
    options: options.map(l => ({ id: nanoid(8), label: l, votes: 0 })),
    totalVotes: 0,
  };
  store.polls.unshift(poll);
  return poll;
}

export function vote({ pollId, optionId, userId }:{ pollId:string; optionId:string; userId:string }) {
  const p = store.polls.find(p=>p.id===pollId);
  if (!p) throw new Error("poll not found");
  if (!store.votesByUser[userId]) store.votesByUser[userId] = {};
  if (store.votesByUser[userId][pollId]) return p; // already voted
  const opt = p.options.find(o=>o.id===optionId);
  if (!opt) throw new Error("option not found");
  opt.votes += 1;
  p.totalVotes += 1;
  store.votesByUser[userId][pollId] = optionId;
  return { ...p, userVoted: true };
}
