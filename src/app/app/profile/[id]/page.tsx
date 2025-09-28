export default function Profile({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">@{params.id}</h1>
      <p>このページは将来の拡張対象です（質問一覧など）。</p>
    </div>
  );
}
