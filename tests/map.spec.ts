import { test, expect } from "@playwright/test";
test("map supports zoom, drag, collapse and unavailable chapter details", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "知识图谱", exact: true }).click();
  await expect(page.locator(".react-flow__node")).toHaveCount(13);
  await page.waitForTimeout(500);
  const viewport = page.locator(".react-flow__viewport");
  const before = await viewport.getAttribute("style");
  await page.locator(".react-flow__controls-zoomin").click();
  await expect(viewport).not.toHaveAttribute("style", before!);
  await page.waitForTimeout(300);
  const beforePan = await viewport.getAttribute("style");
  const box = await page.locator(".react-flow__pane").boundingBox();
  await page.mouse.move(box!.x + 20, box!.y + 100);
  await page.mouse.down();
  await page.mouse.move(box!.x + 100, box!.y + 150, { steps: 8 });
  await page.mouse.up();
  await expect(viewport).not.toHaveAttribute("style", beforePan!);
  await page.locator(".react-flow__controls-fitview").click();
  await page.locator('[data-id="part-2"]').click();
  await expect(page.locator(".react-flow__node")).toHaveCount(3);
  await page.locator('[data-id="chapter-4"]').click();
  await expect(page.locator(".react-flow__node")).toHaveCount(11);
  await page
    .getByRole("button", { name: "/ 市场如何运行", exact: true })
    .click();
  await expect(page.locator(".react-flow__node")).toHaveCount(3);
  await page.getByRole("button", { name: "全部13篇", exact: true }).click();
  await page.locator('[data-id="part-3"]').click();
  await page.locator('[data-id="chapter-7"]').click();
  await expect(
    page.getByRole("heading", { name: "这片土地，正在绘制中" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "第7章 · 消费者、生产者与市场效率" }),
  ).toBeVisible();
});
test("mobile lab and graph stay within viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const name of ["经济实验室", "知识图谱", "我的城市", "学习档案"]) {
    await page.getByRole("button", { name, exact: true }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
});
