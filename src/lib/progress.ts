import type { Progress } from "../data/types";
export const STORAGE_KEY = "economics-quest:v1";
export const freshProgress = (): Progress => ({
  version: 1,
  viewed: [],
  mastered: [],
  quests: [],
  results: {},
  last: { page: "world", concept: "tradeoffs" },
});
export function parseProgress(raw: string | null): Progress {
  try {
    const p = JSON.parse(raw || "null");
    if (p?.version !== 1) return freshProgress();
    const strings = (v: unknown) =>
      Array.isArray(v)
        ? v.filter((s): s is string => typeof s === "string")
        : [];
    const results: Progress["results"] = {};
    if (p.results && typeof p.results === "object")
      Object.entries(p.results).forEach(([k, v]) => {
        const r = v as { attempts: number; correct: boolean };
        if (
          r &&
          Number.isInteger(r.attempts) &&
          r.attempts >= 0 &&
          typeof r.correct === "boolean"
        )
          results[k] = r;
      });
    return {
      version: 1,
      viewed: strings(p.viewed),
      mastered: strings(p.mastered),
      quests: strings(p.quests),
      results,
      last: {
        page: [
          "world",
          "map",
          "city",
          "lab",
          "quests",
          "profile",
          "chapter",
          "lesson",
          "day",
          "elasticity",
          "policy",
        ].includes(p.last?.page)
          ? p.last.page
          : "world",
        concept:
          typeof p.last?.concept === "string" ? p.last.concept : "tradeoffs",
      },
    };
  } catch {
    return freshProgress();
  }
}
/** Activity answers are recorded without marking task IDs as mastered concepts. */
export function recordActivityAnswer(
  p: Progress,
  id: string,
  correct: boolean,
): Progress {
  return {
    ...p,
    results: {
      ...p.results,
      [id]: { attempts: (p.results[id]?.attempts || 0) + 1, correct },
    },
  };
}
export function recordAnswer(
  p: Progress,
  id: string,
  correct: boolean,
): Progress {
  return {
    ...p,
    viewed: [...new Set([...p.viewed, id])],
    mastered: correct ? [...new Set([...p.mastered, id])] : p.mastered,
    results: {
      ...p.results,
      [id]: { attempts: (p.results[id]?.attempts || 0) + 1, correct },
    },
  };
}
