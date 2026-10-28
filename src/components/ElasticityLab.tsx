import { useState } from "react";
import { revenueExperiment, elasticDemand } from "../lib/extendedEconomy";
import { ExperimentChart } from "./ExperimentChart";
export interface ActivityProps {
  completed: boolean;
  onComplete: () => void;
  onAttempt: (id: string, correct: boolean) => void;
  onConcept: (id: string) => void;
}
export function ElasticityLab({
  completed,
  onComplete,
  onAttempt,
  onConcept,
}: ActivityProps) {
  const [price, setPrice] = useState(4),
    [elasticity, setElasticity] = useState(1),
    [feedback, setFeedback] = useState("");
  const result = revenueExperiment(price, elasticity);
  const reset = () => {
    setPrice(4);
    setElasticity(1);
    setFeedback("");
  };
  function answer(choice: number) {
    const correct = choice === 1 && elasticity === 2 && price === 3;
    onAttempt("quest:elasticity-revenue", correct);
    if (correct) {
      onComplete();
      setFeedback(
        "✓ 调价分析完成：收入从240元增至320元，但没有成本信息，不能推断利润。已获得「收益观察员」徽章。",
      );
    } else
      setFeedback(
        choice !== 1
          ? "收入与利润不是同一件事。比较P×Q后，还需要成本信息才能判断利润。"
          : "请先将弹性设为2、价格调到3元，复现任务指定情境，再提交解释。",
      );
  }
  return (
    <div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">CHAPTER 05 / FIELD LAB</span>
          <h1>降价，就能赚得更多吗？</h1>
        </div>
        <button className="secondary" onClick={reset}>
          ↺ 重置调价实验
        </button>
      </div>
      <p>阿麦准备研究一种新面包的需求。先观察销量和收入，再判断该如何解释。</p>
      <section className="card">
        <span className="chapter-tag">原创互动 · 固定需求关系的调价比较</span>
        <div className="lab-grid">
          <ExperimentChart
            title={`需求弹性${elasticity}，价格${price}元，数量${result.quantity.toFixed(1)}，总收益${result.revenue.toFixed(1)}元`}
            qMax={260}
            pMax={8}
            curves={[
              {
                label: "需求 D",
                color: "#528eb3",
                q: (p) => elasticDemand(Math.max(0.01, p), elasticity),
              },
            ]}
            points={[
              {
                quantity: 60,
                price: 4,
                label: "初始 (60, 4)",
                color: "#a5b09a",
              },
              {
                quantity: result.quantity,
                price,
                label: `当前 (${result.quantity.toFixed(1)}, ${price})`,
              },
            ]}
            area={{
              quantity: result.quantity,
              low: 0,
              high: price,
              color: "#d6b363",
            }}
          />
          <div className="controls">
            <label>
              需求弹性 Ed <strong>{elasticity}</strong>
              <select
                aria-label="需求弹性"
                value={elasticity}
                onChange={(e) => {
                  setElasticity(+e.target.value);
                  setFeedback("");
                }}
              >
                <option value="0.5">0.5 · 缺乏弹性</option>
                <option value="1">1 · 单位弹性</option>
                <option value="2">2 · 富有弹性</option>
              </select>
            </label>
            <label>
              价格 P <strong>¥{price.toFixed(1)}</strong>
              <input
                aria-label="调价价格"
                type="range"
                min="2"
                max="8"
                step=".5"
                value={price}
                onChange={(e) => {
                  setPrice(+e.target.value);
                  setFeedback("");
                }}
              />
            </label>
            <div className="metrics">
              <div>
                <small>需求量</small>
                <b data-testid="elastic-quantity">
                  {result.quantity.toFixed(1)}
                </b>
                <span>初始 60 个</span>
              </div>
              <div>
                <small>总收益 TR</small>
                <b data-testid="elastic-revenue">
                  ¥{result.revenue.toFixed(0)}
                </b>
                <span>初始 ¥240</span>
              </div>
            </div>
          </div>
        </div>
        <div className="insight">
          <b>矩形面积，就是 P × Q</b>
          <p>
            当前总收益比初始
            {result.revenue > 240.00001
              ? "增加"
              : result.revenue < 239.99999
                ? "减少"
                : "不变"}{" "}
            {Math.abs(result.revenue - 240).toFixed(1)} 元。
            {elasticity === 1
              ? "在本单位弹性模型中，价格效应和数量效应恰好抵消。"
              : elasticity > 1
                ? "在本模型中，数量的百分比反应较强。"
                : "在本模型中，数量的百分比反应较弱。"}
          </p>
        </div>
        <details>
          <summary>公式、弧弹性与实验边界</summary>
          <p>
            Q = 60 × (P/4)<sup>−Ed</sup>
            。P为元/个，Q为个/日；Ed是常数点弹性。初始P=4、Q=60。金色矩形为总收益，未扣成本。切换Ed是在比较不同需求情景；同一情景内改价是沿曲线移动。
          </p>
          <p>
            两点中点法弧弹性：
            <b data-testid="arc-elasticity">
              {result.arcElasticity === null
                ? "未定义（价格未变化）"
                : result.arcElasticity.toFixed(3)}
            </b>
            。有限区间的弧弹性可与常数点弹性不同，不能混为一谈。本模型不是完全竞争中单个企业的自由定价建议。
          </p>
        </details>
        <button
          className="text-button"
          onClick={() => onConcept("elasticity-total-revenue")}
        >
          复习：弹性与总收益 →
        </button>
      </section>
      <section className="card">
        <span className="eyebrow">QUEST 05 · 收益观察员</span>
        <h2>为阿麦写一份调价结论</h2>
        <p>把Ed设为2，价格从4元降至3元。观察结果后，选择证据支持的解释。</p>
        <button className="answer" onClick={() => answer(0)}>
          降价后销量增加，因此利润必然增加。
        </button>
        <button className="answer" onClick={() => answer(1)}>
          需求富有弹性，降价使总收益增加；利润还要看成本。
        </button>
        <button className="answer" onClick={() => answer(2)}>
          只要降价，无论需求弹性如何，总收益都会增加。
        </button>
        {feedback && (
          <p className="insight" role="status">
            {feedback}
          </p>
        )}
        {completed && (
          <p className="correct">
            ✦ 收益观察员 · 已完成，记录已保存。可重置实验再次探索。
          </p>
        )}
      </section>
    </div>
  );
}
