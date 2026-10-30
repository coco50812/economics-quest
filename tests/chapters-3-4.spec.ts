import { test, expect } from "@playwright/test";

for (const chapter of [
  { number: 3, title: "相互依存性与贸易的好处", count: 9, id: "ch3-comparative-advantage", concept: "比较优势", answer: "B Rose" },
  { number: 4, title: "供给与需求的市场力量", count: 15, id: "market-demand", concept: "市场需求与个人需求", answer: "A 7个" },
]) {
  test(`chapter ${chapter.number} cards, graph and progress survive reload`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto("/");
    await page.locator(".chapter-row").filter({ hasText: chapter.title }).click();
    await expect(page.locator(".concept-tile")).toHaveCount(chapter.count);
    await page.locator(".concept-tile").filter({ has: page.getByRole("heading", { name: chapter.concept, exact: true }) }).click();
    await expect(page.locator(".content-provenance")).toContainText("原创");
    await page.getByRole("button", { name: chapter.answer, exact: true }).click();
    await page.reload();
    await expect(page.locator(".status-badge")).toContainText("已掌握");
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("economics-quest:v1")!));
    expect(saved.mastered).toContain(chapter.id);
    expect(saved.results[chapter.id]).toEqual({ attempts: 1, correct: true });
    await page.getByRole("button", { name: "知识图谱", exact: true }).click();
    await page.getByLabel("搜索知识点").fill(chapter.concept);
    await page.getByRole("button", { name: "定位 ↗" }).click();
    await expect(page.locator(".react-flow__node")).toHaveCount(chapter.count);
    expect(errors).toEqual([]);
  });
}
