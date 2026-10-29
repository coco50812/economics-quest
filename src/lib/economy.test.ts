import { describe, it, expect } from "vitest";
import { equilibrium, demand, supply, marketAt, allocate } from "./economy";
import { parseProgress, recordAnswer, freshProgress } from "./progress";
import { concepts, relationships } from "../data/concepts";
import { chapters, parts } from "../data/chapters";
describe("competitive market", () => {
  it("baseline clears at P=4,Q=60", () =>
    expect(equilibrium()).toEqual({ price: 4, quantity: 60 }));
  it("positive demand shock raises both price and quantity", () =>
    expect(equilibrium(20, 0)).toEqual({ price: 5, quantity: 70 }));
  it("bread city supply shock raises price and lowers quantity", () =>
    expect(equilibrium(0, -20)).toEqual({ price: 5, quantity: 50 }));
  it("positive supply shock lowers price and raises quantity", () =>
    expect(equilibrium(0, 20)).toEqual({ price: 3, quantity: 70 }));
  it("clears throughout allowed parameter space", () => {
    for (let a = -30; a <= 30; a += 10)
      for (let b = -30; b <= 30; b += 10) {
        const e = equilibrium(a, b);
        expect(e.price).toBeGreaterThan(0);
        expect(demand(e.price, a)).toBeCloseTo(e.quantity);
        expect(supply(e.price, b)).toBeCloseTo(e.quantity);
      }
  });
  it("computes shortage and surplus at fixed prices", () => {
    expect(marketAt(3).shortage).toBe(20);
    expect(marketAt(5).surplus).toBe(20);
    expect(marketAt(4).shortage).toBe(0);
    expect(demand(20)).toBe(0);
  });
  it("equal shifts can leave price unchanged", () =>
    expect(equilibrium(20, 20)).toEqual({ price: 4, quantity: 80 }));
});
describe("time and progress", () => {
  it("respects the time constraint", () => {
    for (let s = 0; s <= 12; s++)
      for (let w = 0; w <= 12; w++) {
        const d = allocate(s, w);
        expect(d.study + d.work + d.leisure).toBe(12);
        expect(d.leisure).toBeGreaterThanOrEqual(0);
        expect(d.income).toBe(d.work * 30);
      }
  });
  it("recovers from invalid or outdated storage", () => {
    expect(parseProgress("{bad")).toEqual(freshProgress());
    expect(parseProgress('{"version":99}')).toEqual(freshProgress());
    expect(
      parseProgress('{"version":1,"viewed":[null,3,"margin"]}').viewed,
    ).toEqual(["margin"]);
  });
  it("wrong answers do not confer mastery and retries are recorded", () => {
    let p = recordAnswer(freshProgress(), "margin", false);
    expect(p.mastered).toEqual([]);
    expect(p.viewed).toEqual(["margin"]);
    p = recordAnswer(p, "margin", true);
    p = recordAnswer(p, "margin", true);
    expect(p.mastered).toEqual(["margin"]);
    expect(p.results.margin.attempts).toBe(3);
    expect(parseProgress(JSON.stringify(p))).toEqual(p);
  });
});
describe("curriculum integrity", () => {
  it("has 7 parts,22 chapters and 43 complete concepts", () => {
    expect(parts).toHaveLength(7);
    expect(chapters).toHaveLength(22);
    expect(concepts).toHaveLength(43);
    expect(chapters.filter((c) => c.available).map((c) => c.id)).toEqual([
      1, 4, 5, 6,
    ]);
    expect(new Set(concepts.map((c) => c.id)).size).toBe(concepts.length);
    concepts.forEach((c) => {
      expect(c.options[c.answer]).toBeTruthy();
      expect(c.definition).toBeTruthy();
      expect(c.misconception).toBeTruthy();
    });
  });
  it("relationships reference existing distinct concepts", () => {
    const ids = concepts.map((c) => c.id);
    relationships.forEach((r) => {
      expect(ids).toContain(r.source);
      expect(ids).toContain(r.target);
      expect(r.source).not.toBe(r.target);
    });
  });
});
