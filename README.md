# アンケートSNS – MVP 初期リポジトリ

Next.js + TypeScript + Tailwind の最小構成。APIは**モック（メモリ内）**で動作します。
将来は Supabase(Postgres/Auth/Realtime/Storage) に差し替え可能な構造です。

## セットアップ

```bash
# Node.js 20 を推奨
npm install
npm run dev
# http://localhost:3000 で起動
```

## 主要ルート
- `/` : ランディング（アプリ導線）
- `/app/home` : ホームフィード（公開質問一覧）
- `/app/create` : 質問作成
- `/app/q/:id` : 質問詳細（投票/結果）
- `/app/profile/:id` : プロフィール（簡易）
- `/app/notifications` : 通知（ダミー）
- `/app/settings` : 設定（ダミー）

## モックAPI
- `GET /api/polls` : 質問一覧（カーソル省略版）
- `POST /api/polls` : 質問作成
- `GET /api/polls/:id` : 質問詳細
- `POST /api/polls/:id/votes` : 投票
- `POST /api/reports` : 通報

### 設計メモ
- 型安全: Zod で入力検証
- UI: Tailwind + コンポーネント（`PollCard`, `ResultGraph`）
- 重複投票: 簡易的に Cookie + メモリで制御（本番はDB + RLS/UNIQUE制約で置換）
- 将来の置換点: `src/lib/mock.ts` をDBアクセス層（Supabase/Prisma）にすり替え

## テスト
```bash
npm run test:e2e
```

## ライセンス
MIT
