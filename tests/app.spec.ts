import { test, expect } from "@playwright/test";
test("world, hierarchy, knowledge testing and persistence", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "世界很大，从一个「为什么」开始。" }),
  ).toBeVisible();
  await expect(page.locator(".chapter-row")).toHaveCount(37);
  await page.getByRole("button", { name: "知识图谱", exact: true }).click();
  await expect(page.locator(".react-flow__node")).toHaveCount(13);
  await page.locator('[data-id="part-1"]').click();
  await expect(page.locator(".react-flow__node")).toHaveCount(3);
  await page.locator('[data-id="chapter-1"]').click();
  await expect(page.locator(".react-flow__node")).toHaveCount(10);
  await page.getByLabel("搜索知识点").fill("机会成本");
  await page.getByRole("button", { name: "定位 ↗" }).click();
  await expect(page.locator(".map-detail")).toContainText("机会成本");
  await page.getByRole("button", { name: "阅读知识卡与测试" }).click();
  await expect(page.locator(".status-badge")).toContainText("已浏览");
  await page.getByRole("button", { name: "A 50元" }).click();
  await expect(page.locator(".status-badge")).toContainText("已浏览");
  await page.getByRole("button", { name: "B 30元" }).click();
  await expect(page.locator(".status-badge")).toContainText("已掌握");
  await page.reload();
  await expect(page.locator(".status-badge")).toContainText("已掌握");
  await expect(
    page.getByRole("heading", { name: "机会成本", exact: true, level: 1 }),
  ).toBeVisible();
  await page.getByRole("button", { name: "经济学世界", exact: true }).click();
  await page
    .locator(".chapter-row")
    .filter({ hasText: "消费者、生产者与市场效率" })
    .click();
  await expect(
    page.getByRole("heading", { name: "这片土地，正在绘制中" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("bread city complete, wrong branch and saved task", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "我的城市", exact: true }).click();
  await page.getByRole("button", { name: /询问面包师/ }).click();
  await page.getByRole("button", { name: /询问居民/ }).click();
  await page.getByRole("button", { name: /作出判断/ }).click();
  await page.getByRole("button", { name: "游客增加，需求曲线右移" }).click();
  await expect(page.getByRole("status")).toContainText("数量下降");
  await page
    .getByRole("button", { name: "面粉成本上升，供给曲线左移" })
    .click();
  await page.getByLabel("供给冲击").fill("-20");
  await expect(page.getByTestId("equilibrium-price")).toHaveText("¥5.0");
  await page.getByRole("button", { name: "提交当前实验，验证调查" }).click();
  await page
    .getByRole("button", {
      name: "成本上升 → 供给左移；需求不变 → 均衡价格升、数量降。",
    })
    .click();
  await expect(
    page.getByRole("heading", { name: "获得徽章：市场调查员" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("此任务已有完成记录", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "学习档案", exact: true }).click();
  await expect(page.locator(".profile-stats")).toContainText("1");
});
test("lab values, reset, time task, mobile and settings", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "经济实验室", exact: true }).click();
  await page.getByLabel("需求冲击").fill("20");
  await expect(page.getByTestId("equilibrium-price")).toHaveText("¥5.0");
  await page.getByRole("button", { name: "重置实验" }).click();
  await expect(page.getByTestId("equilibrium-price")).toHaveText("¥4.0");
  await page.getByRole("button", { name: "任务中心", exact: true }).click();
  await page.getByRole("button", { name: /有限的一天/ }).click();
  await page.getByLabel("学习时间").fill("12");
  await expect(page.locator(".time-bar")).toContainText("学习 12h");
  await page.getByRole("button", { name: "放弃的30元收入" }).click();
  await expect(page.getByRole("status")).toContainText("已完成");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "经济学世界", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "世界很大，从一个「为什么」开始。" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "设置", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByLabel("大字号阅读").check();
  await page.getByRole("button", { name: "关闭设置" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
