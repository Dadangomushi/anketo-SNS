export type PollOption = { id: string; label: string; votes: number };
export type Poll = {
  id: string;
  authorHandle: string;
  body: string;
  visibility: "public" | "unlisted";
  closesAt: string;
  createdAt: string;
  options: PollOption[];
  totalVotes: number;
  userVoted?: boolean;
};
