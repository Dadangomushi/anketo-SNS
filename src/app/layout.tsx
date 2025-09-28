import "./../styles/globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = { title: "アンケートSNS", description: "MVP" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <header className="border-b">
          <div className="container flex items-center gap-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="logo" className="h-8 w-8" />
              <span className="font-bold">アンケートSNS</span>
            </Link>
            <nav className="ml-auto flex gap-4 text-sm">
              <Link href="/app/home">ホーム</Link>
              <Link href="/app/create">作成</Link>
              <Link href="/app/notifications">通知</Link>
              <Link href="/app/settings">設定</Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="border-t text-sm text-gray-500">
          <div className="container py-6">© 2025 アンケートSNS</div>
        </footer>
      </body>
    </html>
  );
}
