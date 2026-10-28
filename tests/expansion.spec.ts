import { test, expect } from "@playwright/test";
const key = "economics-quest:v1";
test("new concepts, cross-chapter graph and mastery preserve legacy progress", async ({
  page,
}) => {
  await page.addInitScript(
    ({ key }) => {
      if (!localStorage.getItem(key))
        localStorage.setItem(
          key,
          JSON.stringify({
            version: 1,
            viewed: ["margin", "equilibrium"],
            mastered: ["margin"],
            quests: ["bread-city"],
            results: { margin: { attempts: 3, correct: true } },
            last: { page: "world", concept: "margin" },
          }),
        );
    },
    { key },
  );
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByText("13篇 · 4章已开放")).toBeVisible();
  await page
    .locator(".chapter-row")
    .filter({ hasText: "弹性及其应用" })
    .click();
  await expect(
    page.locator(".concept-tile").filter({ has: page.locator("h3") }),
  ).toHaveCount(13);
  await page
    .locator(".concept-tile")
    .filter({
      has: page.getByRole("heading", { name: "需求价格弹性", exact: true }),
    })
    .click();
  await expect(page.locator(".content-provenance")).toContainText("原创");
  await expect(page.getByText("核心机制", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "B 2", exact: true }).click();
  await expect(page.locator(".status-badge")).toContainText("已掌握");
  await page.getByRole("button", { name: "知识图谱", exact: true }).click();
  await page.getByLabel("搜索知识点").fill("弹性与税负归宿");
  await page.getByRole("button", { name: "定位 ↗" }).click();
  await expect(page.locator(".react-flow__node")).toHaveCount(9);
  await page.getByLabel("显示跨章节关联（虚线边框节点）").check();
  await expect(
    page.locator('[data-id="price-elasticity-demand"]'),
  ).toBeAttached();
  await page.getByRole("button", { name: "阅读知识卡与测试" }).click();
  await page.getByRole("button", { name: "A 买者", exact: true }).click();
  await page.reload();
  await expect(page.locator(".status-badge")).toContainText("已掌握");
  const saved = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    key,
  );
  expect(saved.mastered).toEqual(
    expect.arrayContaining([
      "margin",
      "price-elasticity-demand",
      "tax-incidence",
    ]),
  );
  expect(saved.results.margin).toEqual({ attempts: 3, correct: true });
  expect(saved.quests).toContain("bread-city");
  expect(saved.version).toBe(1);
  expect(errors).toEqual([]);
});
test("elasticity task checks settings, computes revenue and persists result", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "任务中心", exact: true }).click();
  await page
    .locator(".concept-tile")
    .filter({ hasText: "降价，就能赚得更多吗？" })
    .click();
  await page
    .getByRole("button", {
      name: "需求富有弹性，降价使总收益增加；利润还要看成本。",
    })
    .click();
  await expect(page.getByRole("status")).toContainText("先将弹性设为2");
  await page.getByLabel("需求弹性", { exact: true }).selectOption("2");
  await page.getByLabel("调价价格").fill("3");
  await expect(page.getByTestId("elastic-revenue")).toHaveText("¥320");
  await page
    .getByRole("button", { name: "降价后销量增加，因此利润必然增加。" })
    .click();
  await expect(page.getByRole("status")).toContainText("利润");
  await page
    .getByRole("button", {
      name: "需求富有弹性，降价使总收益增加；利润还要看成本。",
    })
    .click();
  await expect(page.getByRole("status")).toContainText("获得");
  await page.reload();
  await expect(
    page.getByText("收益观察员 · 已完成", { exact: false }),
  ).toBeVisible();
  let saved = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    key,
  );
  expect(saved.quests).toContain("elasticity-revenue");
  expect(saved.results["quest:elasticity-revenue"]).toEqual({
    attempts: 3,
    correct: true,
  });
  expect(saved.mastered).toEqual([]);
  await page.getByRole("button", { name: "重置调价实验" }).click();
  await expect(page.getByTestId("elastic-revenue")).toHaveText("¥240");
  await page.getByLabel("需求弹性", { exact: true }).selectOption("0.5");
  await page.getByLabel("调价价格").fill("3");
  await expect(page.getByTestId("elastic-revenue")).toHaveText("¥208");
});
test("policy task compares controls, collector and relative elasticity", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "任务中心", exact: true }).click();
  await page
    .locator(".concept-tile")
    .filter({ hasText: "面包城的政策议事厅" })
    .click();
  await expect(page.getByTestId("policy-gap")).toHaveText("20 个");
  await expect(page.getByTestId("control-traded")).toHaveText("50 个");
  await page.getByLabel("管制价格").fill("5");
  await expect(page.getByTestId("binding-state")).toHaveText("无约束力");
  await expect(page.getByTestId("control-traded")).toHaveText("60 个");
  await page.getByLabel("管制价格").fill("3");
  await page
    .getByRole("button", { name: "短缺20个，成交上界50个，不保证每人受益。" })
    .click();
  await page.getByRole("button", { name: "价格下限", exact: true }).click();
  await page.getByLabel("管制价格").fill("5");
  await expect(page.getByTestId("policy-gap")).toHaveText("20 个");
  await page
    .getByRole("button", { name: "过剩20个，无政府收购时成交上界50个。" })
    .click();
  await page.getByRole("button", { name: "单位税", exact: true }).click();
  await page.getByLabel("需求敏感系数").selectOption("5");
  await page.getByLabel("供给敏感系数").selectOption("20");
  await expect(page.getByTestId("buyer-price")).toHaveText("¥5.60");
  await expect(page.getByTestId("seller-price")).toHaveText("¥3.60");
  await expect(page.getByTestId("tax-quantity")).toHaveText("52.0");
  await page.getByRole("button", { name: /记录当前汇缴结果/ }).click();
  await page.getByLabel("法定汇缴方").selectOption("buyer");
  await expect(page.getByTestId("buyer-price")).toHaveText("¥5.60");
  await page.getByRole("button", { name: /记录当前汇缴结果/ }).click();
  await page
    .getByRole("button", { name: "谁负责汇缴，谁就承担全部税负。" })
    .click();
  await expect(page.getByRole("status")).toContainText("较缺乏弹性");
  await page
    .getByRole("button", {
      name: "买方承担80%：需求更缺乏弹性；改变汇缴方不改变经济归宿。",
    })
    .click();
  await expect(page.getByRole("status")).toContainText("政策分析完成");
  await page.reload();
  await expect(
    page.getByText("政策推理员 · 已完成", { exact: false }),
  ).toBeVisible();
  const saved = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    key,
  );
  expect(saved.quests).toContain("policy-council");
  expect(saved.results["quest:policy-incidence"]).toEqual({
    attempts: 2,
    correct: true,
  });
  await page.getByRole("button", { name: "单位税", exact: true }).click();
  await page.getByLabel("单位税", { exact: true }).fill("0");
  await expect(page.getByTestId("buyer-price")).toHaveText("¥4.00");
  await expect(page.getByTestId("tax-quantity")).toHaveText("60.0");
});
test("new experiments remain usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const title of ["降价，就能赚得更多吗？", "面包城的政策议事厅"]) {
    await page.getByRole("button", { name: "任务中心", exact: true }).click();
    await page.locator(".concept-tile").filter({ hasText: title }).click();
    await expect(
      page.getByRole("heading", { name: title, level: 1 }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
