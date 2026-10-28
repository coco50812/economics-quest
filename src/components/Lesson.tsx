import { useState } from "react";
import type { Concept, Progress } from "../data/types";
import { concepts, relationships, relationLabels } from "../data/concepts";
export function Lesson({
  concept: c,
  progress,
  onAnswer,
  onSelect,
}: {
  concept: Concept;
  progress: Progress;
  onAnswer: (id: string, correct: boolean) => void;
  onSelect: (id: string) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const related = relationships.filter(
    (r) => r.source === c.id || r.target === c.id,
  );
  return (
    <article className="lesson">
      <span className="eyebrow">
        CHAPTER {String(c.chapter).padStart(2, "0")} / {c.group}
      </span>
      <h1>{c.name}</h1>
      <p className="english">{c.english}</p>
      {c.provenance && <p className="content-provenance">{c.provenance}</p>}
      <span className="status-badge">
        {progress.mastered.includes(c.id)
          ? "✓ 已掌握"
          : progress.viewed.includes(c.id)
            ? "◉ 已浏览 · 完成测试可掌握"
            : "尚未学习"}
      </span>
      <div className="intuition">{c.intuition}</div>
      <h3>01 / 用经济学的语言说</h3>
      <p>{c.definition}</p>
      {c.mechanism && (
        <div className="insight">
          <b>核心机制</b>
          <p>{c.mechanism}</p>
        </div>
      )}
      <h3>02 / 生活里的经济学</h3>
      <p>{c.example}</p>
      <div className="formula">
        <small>模型与适用条件</small>
        <p>{c.model}</p>
      </div>
      <h3>03 / 避开这个误区</h3>
      <p>{c.misconception}</p>
      <section className="quiz">
        <span className="eyebrow">CHECK YOUR UNDERSTANDING</span>
        <h3>{c.question}</h3>
        {c.options.map((o, i) => (
          <button
            key={o}
            className={`answer ${picked === i ? "picked" : ""}`}
            onClick={() => {
              setPicked(i);
              onAnswer(c.id, i === c.answer);
            }}
          >
            <span>{String.fromCharCode(65 + i)}</span>
            {o}
          </button>
        ))}
        {picked !== null && (
          <p
            role="status"
            className={picked === c.answer ? "correct" : "incorrect"}
          >
            {picked === c.answer ? "✓ 理解正确，已记为掌握。" : "再试一次。"}{" "}
            {c.explanation}
          </p>
        )}
      </section>
      <h3>沿着知识继续探索</h3>
      <div className="related-links">
        {related.map((r) => {
          const id = r.source === c.id ? r.target : r.source;
          return (
            <button
              key={r.source + r.target}
              className="secondary"
              onClick={() => onSelect(id)}
            >
              <small>
                {r.type === "prerequisite"
                  ? r.target === c.id
                    ? "先修知识"
                    : "后续知识"
                  : relationLabels[r.type]}
              </small>
              {concepts.find((n) => n.id === id)?.name} →
            </button>
          );
        })}
      </div>
    </article>
  );
}
