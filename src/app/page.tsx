import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">みんなの“今”がわかる、アンケートSNS</h1>
      <p>質問を作って、投票して、すぐ結果が見える。まずは公開タイムラインを覗いてみよう。</p>
      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded-lg bg-black text-white" href="/app/home">今すぐ投票</Link>
        <Link className="px-4 py-2 rounded-lg border" href="/app/create">質問を作る</Link>
      </div>
    </div>
  );
}
