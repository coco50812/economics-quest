export interface Concept {
  id: string;
  chapter: number;
  group: string;
  name: string;
  english: string;
  intuition: string;
  definition: string;
  mechanism?: string;
  provenance?: string;
  example: string;
  model: string;
  misconception: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}
export type RelationType =
  | "prerequisite"
  | "causes"
  | "related"
  | "applies_to"
  | "contrasts_with";
export interface Relationship {
  source: string;
  target: string;
  type: RelationType;
}
export interface Progress {
  version: 1;
  viewed: string[];
  mastered: string[];
  quests: string[];
  results: Record<string, { attempts: number; correct: boolean }>;
  last: { page: string; concept: string };
}
