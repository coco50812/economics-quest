import { useState } from "react";
import {
  priceControl,
  taxMarket,
  type ControlKind,
} from "../lib/extendedEconomy";
import { ExperimentChart } from "./ExperimentChart";
import type { ActivityProps } from "./ElasticityLab";
type Mode = ControlKind | "tax";
export function PolicyLab({
  completed,
  onComplete,
  onAttempt,
  onConcept,
}: ActivityProps) {
  const [mode, setMode] = useState<Mode>("ceiling"),
    [limit, setLimit] = useState(3),
    [tax, setTax] = useState(2),
    [d, setD] = useState(10),
    [s, setS] = useState(10),
    [collector, setCollector] = useState<"buyer" | "seller">("seller"),
    [seen, setSeen] = useState<string[]>([]),
    [checks, setChecks] = useState<string[]>([]),
    [feedback, setFeedback] = useState("");
  const c = priceControl(mode === "floor" ? "floor" : "ceiling", limit),
    t = taxMarket(tax, d, s, collector);
  const isTax = mode === "tax";
  const reset = () => {
    setMode("ceiling");
    setLimit(3);
    setTax(2);
    setD(10);
    setS(10);
    setCollector("seller");
    setSeen([]);
    setChecks([]);
    setFeedback("");
  };
  function record(key: string, correct: boolean, message: string) {
    onAttempt(`quest:policy-${key}`, correct);
    setFeedback(message);
    if (correct) setChecks((v) => [...new Set([...v, key])]);
  }
  function observe() {
    if (tax === 2 && d === 5 && s === 20) {
      setSeen((v) => [...new Set([...v, collector])]);
      setFeedback(
        `已记录${collector === "buyer" ? "买方" : "卖方"}汇缴：买方总支付${t.buyerPrice.toFixed(2)}元、卖方净得${t.sellerPrice.toFixed(2)}元、成交${t.quantity.toFixed(1)}个。`,
      );
    } else
      setFeedback(
        "先设置单位税2元、需求敏感系数d=5、供给敏感系数s=20，再记录两种汇缴安排。",
      );
  }
  const changeTax = () => {
    setSeen([]);
    setFeedback("");
  };
  function finalAnswer(correct: boolean) {
    const ready =
      checks.includes("ceiling") &&
      checks.includes("floor") &&
      seen.length === 2;
    onAttempt("quest:policy-incidence", correct && ready);
    if (correct && ready) {
      onComplete();
      setFeedback(
        "✓ 政策分析完成。你区分了短缺与过剩，也验证了“汇缴者”与“负担者”的差别。获得「政策推理员」徽章。",
      );
    } else
      setFeedback(
        !ready
          ? "请先完成上限和下限判断，并在指定税收情景记录两种汇缴安排。"
          : "较缺乏弹性的一方更难调整交易，通常承担更多税负；改变汇缴方不改变本模型的税收楔子。",
      );
  }
  return (
    <div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">CHAPTER 06 / 面包城政策危机</span>
          <h1>面包城的政策议事厅</h1>
        </div>
        <button className="secondary" onClick={reset}>
          ↺ 重新调查政策
        </button>
      </div>
      <p>
        你是面包城的临时经济政策顾问。市长交来三桩紧急事件：房租上涨、工资争议、面包征税。
        先用面包市场实验理解价格管制与税负，再把机制用于讨论房租与工资。
      </p>
      <section className="card">
        <span className="eyebrow">三桩政策事件 · 先预测，再实验，后解释</span>
        <p>
          <b>① 房租危机</b>：房租飞涨，市长考虑价格上限。判断限价是否有约束力，预测短缺与非价格配给；短期与长期的区别可结合租金管制知识卡讨论。
        </p>
        <p>
          <b>② 工资争议</b>：工人要求提高最低工资。把价格下限映射到劳动市场，识别劳动供给与需求，判断有约束力的最低工资。
        </p>
        <p>
          <b>③ 税收风波</b>：市政府对面包征单位税。比较买者与卖者汇缴，观察买方总支付、卖方净得与税负分配。
        </p>
        <p className="muted">下方图表均为面包市场，单位是元/个、个/日；房租与工资是迁移思考情景，实验不计算住房套数、就业人数或长短期变化。</p>
      </section>
      <div className="experiment-tabs" aria-label="政策实验类型">
        {(
          [
            ["ceiling", "价格上限"],
            ["floor", "价格下限"],
            ["tax", "单位税"],
          ] as const
        ).map(([key, title]) => (
          <button
            key={key}
            aria-pressed={mode === key}
            className={mode === key ? "primary" : "secondary"}
            onClick={() => {
              setMode(key);
              setFeedback("");
            }}
          >
            {title}
            {checks.includes(key) ? " ✓" : ""}
          </button>
        ))}
      </div>
      <section className="card">
        <span className="chapter-tag">
          {isTax
            ? "相同税额，改变谁负责汇缴"
            : "无税情景 · 价格管制与单位税分开实验"}
        </span>
        <div className="lab-grid">
          <ExperimentChart
            title={
              isTax
                ? `税后买价${t.buyerPrice.toFixed(2)}，卖价${t.sellerPrice.toFixed(2)}，数量${t.quantity}`
                : `${mode === "ceiling" ? "价格上限" : "价格下限"}${limit}元，${c.binding ? "有约束力" : "无约束力"}`
            }
            curves={
              isTax
                ? [
                    {
                      label: "需求 D（买价）",
                      color: "#528eb3",
                      q: (p) => 60 - d * (p - 4),
                    },
                    {
                      label: "供给 S（净价）",
                      color: "#549779",
                      q: (p) => 60 + s * (p - 4),
                    },
                  ]
                : [
                    {
                      label: "需求 D",
                      color: "#528eb3",
                      q: (p) => 100 - 10 * p,
                    },
                    {
                      label: "供给 S",
                      color: "#549779",
                      q: (p) => 20 + 10 * p,
                    },
                  ]
            }
            points={
              isTax
                ? [
                    {
                      quantity: t.quantity,
                      price: t.buyerPrice,
                      label: `Pb ${t.buyerPrice.toFixed(2)}`,
                      color: "#528eb3",
                    },
                    {
                      quantity: t.quantity,
                      price: t.sellerPrice,
                      label: `Ps ${t.sellerPrice.toFixed(2)}`,
                      color: "#549779",
                    },
                  ]
                : [
                    {
                      quantity: c.qd,
                      price: c.price,
                      label: `Qd ${c.qd}`,
                      color: "#528eb3",
                    },
                    {
                      quantity: c.qs,
                      price: c.price,
                      label: `Qs ${c.qs}`,
                      color: "#549779",
                    },
                  ]
            }
            priceLine={
              isTax
                ? undefined
                : {
                    price: limit,
                    label: `法定${mode === "ceiling" ? "上限" : "下限"} ${limit}元`,
                  }
            }
            area={
              isTax
                ? {
                    quantity: t.quantity,
                    low: t.sellerPrice,
                    high: t.buyerPrice,
                    color: "#d4ad5c",
                  }
                : undefined
            }
          />
          <div className="controls">
            {!isTax ? (
              <label>
                法定{mode === "ceiling" ? "最高" : "最低"}价格{" "}
                <strong>¥{limit.toFixed(1)}</strong>
                <input
                  aria-label="管制价格"
                  type="range"
                  min="1"
                  max="7"
                  step=".5"
                  value={limit}
                  onChange={(e) => {
                    setLimit(+e.target.value);
                    setFeedback("");
                  }}
                />
              </label>
            ) : (
              <>
                <label>
                  单位税 t <strong>¥{tax.toFixed(1)}</strong>
                  <input
                    aria-label="单位税"
                    type="range"
                    min="0"
                    max="3"
                    step=".5"
                    value={tax}
                    onChange={(e) => {
                      setTax(+e.target.value);
                      changeTax();
                    }}
                  />
                </label>
                <label>
                  需求敏感系数 d
                  <select
                    aria-label="需求敏感系数"
                    value={d}
                    onChange={(e) => {
                      setD(+e.target.value);
                      changeTax();
                    }}
                  >
                    {[5, 10, 20].map((v) => (
                      <option key={v} value={v}>
                        {v} · 基准Ed={(v / 15).toFixed(2)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  供给敏感系数 s
                  <select
                    aria-label="供给敏感系数"
                    value={s}
                    onChange={(e) => {
                      setS(+e.target.value);
                      changeTax();
                    }}
                  >
                    {[5, 10, 20].map((v) => (
                      <option key={v} value={v}>
                        {v} · 基准Es={(v / 15).toFixed(2)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  法定汇缴方
                  <select
                    aria-label="法定汇缴方"
                    value={collector}
                    onChange={(e) => {
                      setCollector(e.target.value as "buyer" | "seller");
                      setFeedback("");
                    }}
                  >
                    <option value="seller">卖者汇缴</option>
                    <option value="buyer">买者汇缴</option>
                  </select>
                </label>
              </>
            )}
          </div>
        </div>
        {!isTax ? (
          <>
            <div className="policy-metrics">
              <div>
                <small>约束状态</small>
                <b data-testid="binding-state">
                  {c.binding ? "有约束力" : "无约束力"}
                </b>
                <span>实际价格 ¥{c.price}</span>
              </div>
              <div>
                <small>需求 / 供给</small>
                <b>
                  {c.qd} / {c.qs}
                </b>
                <span>个/日</span>
              </div>
              <div>
                <small>
                  {c.shortage ? "短缺" : c.surplus ? "过剩" : "供需缺口"}
                </small>
                <b data-testid="policy-gap">{c.shortage || c.surplus} 个</b>
              </div>
              <div>
                <small>成交上界</small>
                <b data-testid="control-traded">{c.quantity} 个</b>
              </div>
            </div>
            <p className="insight">
              {c.binding
                ? `法定${mode === "ceiling" ? "上限低于" : "下限高于"}均衡价4元；买卖意愿出现缺口。`
                : "该限制没有约束原均衡，实际价格仍为4元，不是自动变成管制价格。"}
              假定完全合规、无政府收购、无黑市，成交上界为min(Qd,Qs)。这不描述具体配给方式或谁受益。
            </p>
          </>
        ) : (
          <>
            <div className="policy-metrics">
              <div>
                <small>买方总支付 Pb</small>
                <b data-testid="buyer-price">¥{t.buyerPrice.toFixed(2)}</b>
              </div>
              <div>
                <small>卖方净得 Ps</small>
                <b data-testid="seller-price">¥{t.sellerPrice.toFixed(2)}</b>
              </div>
              <div>
                <small>税后成交量 Qt</small>
                <b data-testid="tax-quantity">{t.quantity.toFixed(1)}</b>
              </div>
              <div>
                <small>税收收入</small>
                <b>¥{t.revenue.toFixed(1)}</b>
              </div>
            </div>
            <div
              className="tax-bar"
              aria-label={`买方税负份额${(t.buyerShare * 100).toFixed(0)}%，卖方${(t.sellerShare * 100).toFixed(0)}%`}
            >
              <span style={{ flex: t.buyerShare }}>
                买方 {(t.buyerShare * 100).toFixed(0)}%
              </span>
              <span style={{ flex: t.sellerShare }}>
                卖方 {(t.sellerShare * 100).toFixed(0)}%
              </span>
            </div>
            <p className="insight">
              {tax === 0
                ? "税额为零，实际税负为零；上方比例表示正税额下的分担系数。"
                : `每单位买方承担${t.buyerBurden.toFixed(2)}元，卖方承担${t.sellerBurden.toFixed(2)}元。`}
              当前由{collector === "buyer" ? "买者" : "卖者"}
              汇缴，买卖双方之间商品款为{t.invoicePrice.toFixed(2)}元；
              {collector === "buyer"
                ? "买者另向政府支付税款。"
                : "卖者从商品款中汇缴税款。"}
              经济结果不因汇缴方改变。金色面积为t×Qt，竖向价差为税收楔子。
            </p>
          </>
        )}
        <details>
          <summary>模型、变量与条件</summary>
          {isTax ? (
            <p>
              Qd=60−d(Pb−4)，Qs=60+s(Ps−4)，Pb−Ps=t。所有情景共享无税均衡P0=4、Q0=60，基准Ed=d×4/60、Es=s×4/60。Pb=4+ts/(d+s)，Ps=4−td/(d+s)，Qt=60−tds/(d+s)。相同数量和价格尺度下比较弹性。假设竞争市场、同额单位税、完全合规、相同征管成本；t≤3且d,s≤20保证正价与正量。
            </p>
          ) : (
            <p>
              沿用第4章
              Qd=100−10P、Qs=20+10P。上限低于4元才有约束，下限高于4元才有约束；等于4元时不改变原均衡。模型不计算配给成本、质量变化、政府收购或完整社会福利。
            </p>
          )}
        </details>
        <button
          className="text-button"
          onClick={() =>
            onConcept(
              isTax
                ? "tax-incidence"
                : mode === "ceiling"
                  ? "price-ceiling"
                  : "price-floor",
            )
          }
        >
          查看相关知识卡 →
        </button>
      </section>
      <section className="card">
        <span className="eyebrow">QUEST 06 · 政策推理员</span>
        <h2>交给议会一份有证据的判断</h2>
        <p>
          进度：上限判断 {checks.includes("ceiling") ? "✓" : "○"} · 下限判断{" "}
          {checks.includes("floor") ? "✓" : "○"} · 汇缴比较 {seen.length}
          /2。请切换上方实验逐项完成。
        </p>
        {mode === "ceiling" && (
          <>
            <p>把最高价格设为3元，判断结果。</p>
            <button
              className="answer"
              onClick={() =>
                record(
                  "ceiling",
                  false,
                  "限价不会自动增加生产，先比较需求量和供给量。",
                )
              }
            >
              每个人都能买到，成交70个。
            </button>
            <button
              className="answer"
              onClick={() =>
                record(
                  "ceiling",
                  limit === 3,
                  limit === 3
                    ? "✓ 上限判断完成：短缺20个，成交上界50个。"
                    : "请先把最高价格设置为3元再观察。",
                )
              }
            >
              短缺20个，成交上界50个，不保证每人受益。
            </button>
          </>
        )}
        {mode === "floor" && (
          <>
            <p>把最低价格设为5元，判断结果。</p>
            <button
              className="answer"
              onClick={() =>
                record(
                  "floor",
                  limit === 5,
                  limit === 5
                    ? "✓ 下限判断完成：过剩20个，无政府收购时成交上界50个。"
                    : "请先把最低价格设为5元再观察。",
                )
              }
            >
              过剩20个，无政府收购时成交上界50个。
            </button>
            <button
              className="answer"
              onClick={() =>
                record(
                  "floor",
                  false,
                  "最低价不能保证所有供给意愿都变成销售，需求量只有50个。",
                )
              }
            >
              70个供给全部自动售出。
            </button>
          </>
        )}
        {isTax && (
          <>
            <p>
              设置t=2、d=5、s=20，分别选择买者和卖者汇缴，各记录一次。然后解释结果。
            </p>
            <button className="secondary" onClick={observe}>
              记录当前汇缴结果（{seen.includes(collector) ? "已记录" : "未记录"}
              ）
            </button>
            <button className="answer" onClick={() => finalAnswer(false)}>
              谁负责汇缴，谁就承担全部税负。
            </button>
            <button className="answer" onClick={() => finalAnswer(true)}>
              买方承担80%：需求更缺乏弹性；改变汇缴方不改变经济归宿。
            </button>
          </>
        )}
        {feedback && (
          <p className="insight" role="status">
            {feedback}
          </p>
        )}
        {completed && (
          <p className="correct">
            ✦ 政策推理员 · 已完成，记录已保存。重新调查不会删除徽章。
          </p>
        )}
      </section>
    </div>
  );
}
