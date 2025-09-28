import { test, expect } from '@playwright/test';

test('LP → ホーム → 作成 → 公開', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: '今すぐ投票' }).click();
  await expect(page).toHaveURL(/.*\/app\/home/);
  await page.getByRole('link', { name: '＋ 質問を作る' }).click();
  await expect(page).toHaveURL(/.*\/app\/create/);
  await page.getByPlaceholder('質問文（140文字）').fill('テスト質問：好きな色は？');
  await page.getByPlaceholder('選択肢 1').fill('青');
  await page.getByPlaceholder('選択肢 2').fill('赤');
  await page.getByRole('button', { name: '公開する' }).click();
  await expect(page).toHaveURL(/.*\/app\/q\//);
});
