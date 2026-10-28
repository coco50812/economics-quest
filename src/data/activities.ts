export const lessons = [
  {
    id: "day",
    chapter: 1,
    title: "如何分配有限的一天？",
    concepts: ["tradeoffs", "opportunity-cost", "margin"],
  },
  {
    id: "market",
    chapter: 4,
    title: "观察市场的隐形力量",
    concepts: ["equilibrium", "shocks"],
  },
];
export const experiments = [
  {
    id: "supply-demand",
    chapter: 4,
    title: "供给与需求实验室",
    range: [-30, 30],
    baseline: { a: 0, b: 0 },
  },
];
export const quests = [
  {
    id: "bread-city",
    chapter: 4,
    title: "面包为什么涨价了？",
    concepts: ["supply-shift", "shocks", "analysis-steps"],
    reward: "市场调查员",
    shock: { a: 0, b: -20 },
  },
];

// Additive registrations: keep original task IDs and the City quest unchanged.
export const chapterActivities = [
  {
    id: "elasticity-revenue",
    page: "elasticity",
    chapter: 5,
    title: "降价，就能赚得更多吗？",
    description: "比较弹性、销量与收入，为阿麦完成调价分析。",
    reward: "收益观察员",
    concepts: [
      "price-elasticity-demand",
      "elasticity-total-revenue",
      "midpoint-method",
    ],
  },
  {
    id: "policy-council",
    page: "policy",
    chapter: 6,
    title: "面包城的政策议事厅",
    description: "调查价格上限、下限与单位税，比较汇缴安排与实际税负。",
    reward: "政策推理员",
    concepts: ["price-ceiling", "price-floor", "tax-incidence"],
  },
];
export const taskCount = 2 + chapterActivities.length;
