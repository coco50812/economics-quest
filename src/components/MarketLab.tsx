import { useState } from "react";
import { equilibrium, marketAt } from "../lib/economy";
export function MarketLab({
  initialA = 0,
  initialB = 0,
  onVerified,
}: {
  initialA?: number;
  initialB?: number;
  onVerified?: (a: number, b: number) => void;
}) {
  const [a, setA] = useState(initialA),
    [b, setB] = useState(initialB),
    [price, setPrice] = useState(4);
  const e = equilibrium(a, b),
    m = marketAt(price, a, b);
  const x = (q: number) => 55 + q * 3.5,
    y = (p: number) => 315 - p * 26;
  const line = (kind: "d" | "s", shift: number) => {
    const points = [];
    for (let p = 0; p <= 10; p += 0.1) {
      const q = kind === "d" ? 100 + shift - 10 * p : 20 + shift + 10 * p;
      if (q >= 0 && q <= 140) points.push(`${x(q)},${y(p)}`);
    }
    return points.join(" ");
  };
  return (
    <div className="lab">
      <div className="section-heading">
        <div>
          <span className="eyebrow">LIVE EXPERIMENT / 04</span>
          <h2>让市场，动起来</h2>
        </div>
        <button
          className="secondary"
          onClick={() => {
            setA(0);
            setB(0);
            setPrice(4);
          }}
        >
          ↺ 重置实验
        </button>
      </div>
      <p>固定其他条件，改变需求或供给。看看新的交点会去哪里。</p>
      <div className="lab-grid">
        <div className="chart-panel">
          <svg
            viewBox="0 0 590 370"
            role="img"
            aria-label={`供求曲线，均衡价格${e.price}元，数量${e.quantity}个`}
          >
            <defs>
              <pattern
                id="grid"
                width="35"
                height="26"
                patternUnits="userSpaceOnUse"
                x="55"
                y="55"
              >
                <path d="M 35 0 L 0 0 0 26" fill="none" stroke="#e8ece7" />
              </pattern>
            </defs>
            <rect x="55" y="55" width="490" height="260" fill="url(#grid)" />
            <path
              d="M55 45V315H555"
              fill="none"
              stroke="#7d8b89"
              strokeWidth="1.5"
            />
            <text x="14" y="28">
              价格 P（元）
            </text>
            <text x="456" y="357">
              数量 Q（个 / 日）
            </text>
            {[0, 2, 4, 6, 8, 10].map((p) => (
              <text key={p} x="28" y={y(p) + 4}>
                {p}
              </text>
            ))}
            {[0, 20, 40, 60, 80, 100, 120, 140].map((q) => (
              <text key={q} x={x(q) - 8} y="336">
                {q}
              </text>
            ))}
            <polyline
              points={line("d", 0)}
              fill="none"
              stroke="#8aaec0"
              strokeDasharray="5 5"
              opacity=".45"
            />
            <polyline
              points={line("s", 0)}
              fill="none"
              stroke="#8cb39b"
              strokeDasharray="5 5"
              opacity=".45"
            />
            <polyline
              points={line("d", a)}
              fill="none"
              stroke="#528eb3"
              strokeWidth="3"
            />
            <polyline
              points={line("s", b)}
              fill="none"
              stroke="#549779"
              strokeWidth="3"
            />
            <path
              d={`M55 ${y(e.price)}H${x(e.quantity)}V315`}
              fill="none"
              stroke="#b78b47"
              strokeDasharray="4 4"
            />
            <circle
              cx={x(e.quantity)}
              cy={y(e.price)}
              r="7"
              fill="#dca84e"
              stroke="white"
              strokeWidth="3"
            />
            <text x={x(e.quantity) + 12} y={y(e.price) - 13} fill="#96702f">
              E ({e.quantity}, {e.price.toFixed(1)})
            </text>
            <text x="450" y="72" fill="#549779">
              S 供给
            </text>
            <text x="68" y="72" fill="#528eb3">
              D 需求
            </text>
          </svg>
          <div className="chart-legend">
            <span>● 需求</span>
            <span>● 供给</span>
            <span>◌ 虚线：初始市场</span>
          </div>
        </div>
        <div className="controls">
          <label>
            需求冲击 a{" "}
            <strong>
              {a > 0 ? "+" : ""}
              {a}
            </strong>
            <input
              aria-label="需求冲击"
              type="range"
              min="-30"
              max="30"
              step="10"
              value={a}
              onChange={(e) => setA(+e.target.value)}
            />
            <small>← 需求减少　　需求增加 →</small>
          </label>
          <label>
            供给冲击 b{" "}
            <strong>
              {b > 0 ? "+" : ""}
              {b}
            </strong>
            <input
              aria-label="供给冲击"
              type="range"
              min="-30"
              max="30"
              step="10"
              value={b}
              onChange={(e) => setB(+e.target.value)}
            />
            <small>← 成本上升　　技术改善 →</small>
          </label>
          <div className="metrics">
            <div>
              <small>均衡价格 P*</small>
              <b data-testid="equilibrium-price">¥{e.price.toFixed(1)}</b>
              <span>
                较初始 {e.price - 4 >= 0 ? "+" : ""}
                {(e.price - 4).toFixed(1)} 元
              </span>
            </div>
            <div>
              <small>均衡数量 Q*</small>
              <b>{e.quantity}</b>
              <span>
                较初始 {e.quantity - 60 >= 0 ? "+" : ""}
                {e.quantity - 60} 个
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="insight">
        <b>观察笔记</b>
        <p>
          {a === 0 && b === 0
            ? "市场处于初始均衡：每天60个面包，以4元成交。"
            : `需求${a === 0 ? "不变" : a > 0 ? "右移" : "左移"}，供给${b === 0 ? "不变" : b > 0 ? "右移" : "左移"}。新均衡价格${e.price > 4 ? "上升" : e.price < 4 ? "下降" : "不变"}，数量${e.quantity > 60 ? "增加" : e.quantity < 60 ? "减少" : "不变"}。这是两条曲线共同决定的结果。`}
        </p>
      </div>
      <details>
        <summary>查看模型、假设与非均衡市场</summary>
        <p>
          Qd = 100 + a − 10P；Qs = 20 + b +
          10P。P为元/个，Q为个/日；a、b改变每个给定价格下的数量。假定竞争市场、同质商品、斜率不变、其他条件固定。实验比较新旧均衡，不模拟调整速度。
        </p>
        <label>
          假设当前售价：{price}元
          <input
            aria-label="当前售价"
            type="range"
            min="0"
            max="10"
            step=".5"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </label>
        <p>
          需求量 {m.qd} · 供给量 {m.qs} ·{" "}
          {m.shortage
            ? `短缺 ${m.shortage}`
            : m.surplus
              ? `过剩 ${m.surplus}`
              : "供需平衡"}{" "}
          个。此价格用于观察市场状态，并非价格管制。
        </p>
      </details>
      {onVerified && (
        <button className="primary" onClick={() => onVerified(a, b)}>
          提交当前实验，验证调查 →
        </button>
      )}
    </div>
  );
}
