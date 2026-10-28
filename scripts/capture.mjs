import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
await page.goto("http://127.0.0.1:5173/");
await page.waitForLoadState("networkidle");
await mkdir("artifacts", { recursive: true });
await page.screenshot({ path: "artifacts/desktop.png", fullPage: false });
await page.getByRole("button", { name: "经济实验室", exact: true }).click();
await page.screenshot({ path: "artifacts/lab.png" });
await page.getByRole("button", { name: "知识图谱", exact: true }).click();
await page.locator('[data-id="part-2"]').click();
await page.locator('[data-id="chapter-4"]').click();
await page.waitForTimeout(500);
await page.screenshot({ path: "artifacts/map.png" });
await page.getByRole("button", { name: "任务中心", exact: true }).click();
await page
  .locator(".concept-tile")
  .filter({ hasText: "降价，就能赚得更多吗？" })
  .click();
await page.getByLabel("需求弹性", { exact: true }).selectOption("2");
await page.getByLabel("调价价格").fill("3");
await page.screenshot({
  path: "artifacts/chapter5-elasticity.png",
  fullPage: true,
});
await page.getByRole("button", { name: "任务中心", exact: true }).click();
await page
  .locator(".concept-tile")
  .filter({ hasText: "面包城的政策议事厅" })
  .click();
await page.getByRole("button", { name: "单位税", exact: true }).click();
await page.getByLabel("需求敏感系数").selectOption("5");
await page.getByLabel("供给敏感系数").selectOption("20");
await page.screenshot({
  path: "artifacts/chapter6-policy.png",
  fullPage: true,
});
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({
  path: "artifacts/chapter6-mobile.png",
  fullPage: true,
});
await page.getByRole("button", { name: "经济学世界", exact: true }).click();
await page.screenshot({ path: "artifacts/mobile.png" });
console.log(JSON.stringify({ errors }));
await browser.close();
