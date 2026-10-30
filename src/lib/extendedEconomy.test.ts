import { describe, it, expect } from "vitest";
import {
  elasticDemand,
  revenueExperiment,
  midpointElasticity,
  priceControl,
  taxMarket,
} from "./extendedEconomy";
import {
  recordActivityAnswer,
  recordAnswer,
  parseProgress,
  freshProgress,
  STORAGE_KEY,
} from "./progress";
import { concepts, relationships } from "../data/concepts";
import { chapterActivities } from "../data/activities";
describe("elasticity and revenue", () => {
  it("calculates symmetric midpoint elasticity", () => {
    expect(midpointElasticity(4, 60, 6, 40)).toBe(1);
    expect(midpointElasticity(6, 40, 4, 60)).toBe(1);
    expect(midpointElasticity(4, 60, 4, 60)).toBeNull();
  });
  it("retains baseline across elasticities", () => {
    for (const e of [0.5, 1, 2]) expect(elasticDemand(4, e)).toBe(60);
  });
  it("computes the task without canned output", () => {
    const r = revenueExperiment(3, 2);
    expect(r.revenue).toBeCloseTo(320);
    expect(r.quantity).toBeCloseTo(106.6666667);
    expect(r.arcElasticity).toBeCloseTo(1.96);
  });
  it("checks price effects and constant unit-elastic revenue", () => {
    for (let p = 2; p <= 8; p += 0.5) {
      expect(revenueExperiment(p, 1).revenue).toBeCloseTo(240);
      if (p !== 4) {
        expect(Math.sign(revenueExperiment(p, 0.5).revenue - 240)).toBe(
          Math.sign(p - 4),
        );
        expect(Math.sign(revenueExperiment(p, 2).revenue - 240)).toBe(
          -Math.sign(p - 4),
        );
      }
    }
  });
  it("distinguishes point elasticity from arc elasticity", () => {
    const p = 3,
      e = 2,
      h = 0.00001;
    const slope = (elasticDemand(p + h, e) - elasticDemand(p - h, e)) / (2 * h);
    expect((-slope * p) / elasticDemand(p, e)).toBeCloseTo(e, 5);
    expect(midpointElasticity(4, 60, 3, elasticDemand(3, e))).not.toBe(e);
  });
  it("rejects invalid prices", () => {
    expect(() => elasticDemand(0, 1)).toThrow();
    expect(() => midpointElasticity(1, -2, 2, 4)).toThrow();
  });
});
describe("price controls", () => {
  it("computes binding ceilings and floors", () => {
    expect(priceControl("ceiling", 3)).toMatchObject({
      binding: true,
      price: 3,
      qd: 70,
      qs: 50,
      shortage: 20,
      surplus: 0,
      quantity: 50,
    });
    expect(priceControl("floor", 5)).toMatchObject({
      binding: true,
      price: 5,
      qd: 50,
      qs: 70,
      shortage: 0,
      surplus: 20,
      quantity: 50,
    });
  });
  it("leaves equilibrium unchanged with nonbinding constraints", () => {
    for (const limit of [4, 5, 7])
      expect(priceControl("ceiling", limit)).toMatchObject({
        binding: false,
        price: 4,
        quantity: 60,
        shortage: 0,
        surplus: 0,
      });
    for (const limit of [1, 3, 4])
      expect(priceControl("floor", limit)).toMatchObject({
        binding: false,
        price: 4,
        quantity: 60,
        shortage: 0,
        surplus: 0,
      });
  });
});
describe("unit tax", () => {
  it("matches symmetric and asymmetric benchmarks", () => {
    expect(taxMarket(2, 10, 10)).toMatchObject({
      buyerPrice: 5,
      sellerPrice: 3,
      quantity: 50,
      revenue: 100,
    });
    expect(taxMarket(2, 5, 20)).toMatchObject({
      buyerPrice: 5.6,
      sellerPrice: 3.6,
      quantity: 52,
      buyerShare: 0.8,
    });
    expect(taxMarket(2, 20, 5).sellerShare).toBe(0.8);
  });
  it("satisfies market clearing, budget balance and collector equivalence throughout UI domain", () => {
    for (let tax = 0; tax <= 3; tax += 0.5)
      for (const d of [5, 10, 20])
        for (const s of [5, 10, 20]) {
          const a = taxMarket(tax, d, s, "buyer"),
            b = taxMarket(tax, d, s, "seller");
          expect(a.buyerPrice - a.sellerPrice).toBeCloseTo(tax);
          expect(a.buyerBurden + a.sellerBurden).toBeCloseTo(tax);
          expect(60 - d * (a.buyerPrice - 4)).toBeCloseTo(a.quantity);
          expect(60 + s * (a.sellerPrice - 4)).toBeCloseTo(a.quantity);
          expect(a.revenue).toBeCloseTo(tax * a.quantity);
          expect(a.quantity).toBeGreaterThan(0);
          expect(a.sellerPrice).toBeGreaterThan(0);
          expect(a.buyerPrice).toBe(b.buyerPrice);
          expect(a.sellerPrice).toBe(b.sellerPrice);
          expect(a.quantity).toBe(b.quantity);
          expect(a.invoicePrice + tax).toBeCloseTo(b.invoicePrice);
        }
  });
  it("rejects unsupported corner equilibria and invalid parameters", () => {
    expect(() => taxMarket(10, 20, 20)).toThrow();
    expect(() => taxMarket(-1, 10, 10)).toThrow();
    expect(() => taxMarket(1, 0, 10)).toThrow();
  });
});
describe("additive curriculum and legacy progress compatibility", () => {
  it("keeps all original IDs and relationships", () => {
    const ids = [
      "tradeoffs",
      "opportunity-cost",
      "margin",
      "incentives",
      "trade",
      "markets",
      "government",
      "productivity",
      "money-prices",
      "inflation-unemployment",
      "market-definition",
      "competition",
      "demand-law",
      "demand-curve",
      "market-demand",
      "demand-shift",
      "supply-law",
      "supply-curve",
      "market-supply",
      "supply-shift",
      "equilibrium",
      "imbalance",
      "shocks",
      "analysis-steps",
      "price-allocation",
    ];
    expect(
      concepts.filter((c) => [1, 4].includes(c.chapter)).map((c) => c.id),
    ).toEqual(ids);
    expect(relationships).toContainEqual({
      source: "equilibrium",
      target: "shocks",
      type: "prerequisite",
    });
    expect(relationships).toContainEqual({
      source: "demand-shift",
      target: "supply-shift",
      type: "contrasts_with",
    });
  });
  it("requires new teaching fields and valid links", () => {
    const fresh = concepts.filter((c) => [5, 6].includes(c.chapter));
    expect(fresh).toHaveLength(22);
    fresh.forEach((c) => {
      expect(c.mechanism).toBeTruthy();
      expect(c.provenance).toContain("原创");
      expect(
        relationships.some((r) => r.source === c.id || r.target === c.id),
      ).toBe(true);
    });
    chapterActivities.forEach((a) =>
      a.concepts.forEach((id) =>
        expect(concepts.some((c) => c.id === id)).toBe(true),
      ),
    );
    expect(relationships).toContainEqual({
      source: "price-elasticity-demand",
      target: "tax-incidence",
      type: "prerequisite",
    });
  });
  it("preserves old records and never grants concept mastery for task answers", () => {
    const old = {
      ...freshProgress(),
      viewed: ["margin", "equilibrium"],
      mastered: ["margin"],
      quests: ["bread-city"],
      results: { margin: { attempts: 3, correct: true } },
      last: { page: "lesson", concept: "margin" },
    };
    let p = parseProgress(JSON.stringify(old));
    expect(p).toEqual(old);
    p = recordActivityAnswer(p, "quest:policy-incidence", true);
    expect(p.mastered).toEqual(old.mastered);
    p = recordAnswer(p, "tax-incidence", true);
    expect(p.mastered).toEqual(["margin", "tax-incidence"]);
    expect(p.results.margin).toEqual(old.results.margin);
    expect(p.quests).toEqual(old.quests);
    expect(STORAGE_KEY).toBe("economics-quest:v1");
    expect(
      parseProgress(
        JSON.stringify({
          ...p,
          last: { page: "policy", concept: "tax-incidence" },
        }),
      ).last.page,
    ).toBe("policy");
  });
});
