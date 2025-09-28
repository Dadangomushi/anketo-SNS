import { cookies } from "next/headers";

export async function createPoll(payload: any) {
  const res = await fetch("/api/polls", { method: "POST", body: JSON.stringify(payload) });
  if (!res.ok) throw new Error("failed");
  return res.json();
}

export async function voteOnPoll(id: string, optionId: string) {
  const res = await fetch(`/api/polls/${id}/votes`, { method: "POST", body: JSON.stringify({ optionId }) });
  if (!res.ok) throw new Error("failed");
  return res.json();
}
