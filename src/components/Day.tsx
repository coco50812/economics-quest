import { useState } from "react";
import { allocate } from "../lib/economy";
export function Day({ onComplete }: { onComplete: () => void }) {
  const [study, setStudy] = useState(4),
    [work, setWork] = useState(4),
    [answer, setAnswer] = useState<number | null>(null);
  const d = allocate(study, work);
  return (
    <section className="card">
      <span className="eyebrow">CHAPTER 01 · 小小的选择，大大的学问</span>
      <h2>如何分配有限的一天？</h2>
      <p>
        睡眠与必要活动占12小时，剩下12小时由你决定。兼职时薪30元；这里不为学习与休闲强行定价。
      </p>
      <label>
        学习 {d.study} 小时
        <input
          aria-label="学习时间"
          type="range"
          min="0"
          max="12"
          value={d.study}
          onChange={(e) => {
            const s = +e.target.value;
            setStudy(s);
            setWork(Math.min(work, 12 - s));
          }}
        />
      </label>
      <label>
        工作 {d.work} 小时
        <input
          aria-label="工作时间"
          type="range"
          min="0"
          max={12 - d.study}
          value={d.work}
          onChange={(e) => setWork(+e.target.value)}
        />
      </label>
      <div className="time-bar">
        <span style={{ flex: d.study, background: "#779bb4" }}>
          {d.study > 0 && `学习 ${d.study}h`}
        </span>
        <span style={{ flex: d.work, background: "#d8ae65" }}>
          {d.work > 0 && `工作 ${d.work}h`}
        </span>
        <span style={{ flex: d.leisure, background: "#85aa93" }}>
          {d.leisure > 0 && `休闲 ${d.leisure}h`}
        </span>
      </div>
      <p>
        休闲 <b>{d.leisure}小时</b> · 兼职收入 <b>¥{d.income}</b> · 总时间{" "}
        <b>12/12小时</b>
      </p>
      <div className="insight">
        如果下一小时学习替代了工作，你将放弃30元收入；如果替代了休闲，机会成本是那一小时休闲的价值。最佳替代项取决于你。
      </div>
      <h3>假设工作是最佳替代选项，多学一小时的机会成本是？</h3>
      {["放弃的30元收入", "所有12小时的收入"].map((o, i) => (
        <button
          key={o}
          className="answer"
          onClick={() => {
            setAnswer(i);
            if (i === 0) onComplete();
          }}
        >
          {o}
        </button>
      ))}
      {answer !== null && (
        <p role="status">
          {answer === 0
            ? "✓ 正确。你已完成「有限的一天」任务。"
            : "再想想：我们比较的是新增这一小时放弃的最佳机会。"}
        </p>
      )}
    </section>
  );
}
