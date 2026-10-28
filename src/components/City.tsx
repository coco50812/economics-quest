import { useState } from "react";
import { MarketLab } from "./MarketLab";
import { quests } from "../data/activities";
export function CityArt({ busy = false }: { busy?: boolean }) {
  return (
    <svg
      className="city-art"
      viewBox="0 0 680 300"
      aria-label="面包城手绘地图"
      role="img"
    >
      <defs>
        <pattern
          id="tiles"
          width="18"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 12L18 0" stroke="#b0c2a3" strokeWidth=".5" />
        </pattern>
      </defs>
      <ellipse cx="350" cy="228" rx="280" ry="66" fill="#dce4ce" />
      <path
        d="M95 230Q240 150 345 230T610 210"
        fill="none"
        stroke="#f5edda"
        strokeWidth="33"
      />
      <path
        d="M330 85Q280 165 350 260"
        fill="none"
        stroke="#f5edda"
        strokeWidth="25"
      />
      {[
        [130, 130],
        [490, 105],
        [535, 175],
        [95, 193],
        [430, 225],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0V40" stroke="#9d8565" strokeWidth="6" />
          <ellipse
            cy="-5"
            rx="24"
            ry="30"
            fill={i % 2 ? "#91af8b" : "#b0c493"}
          />
          <path d="M-9 3L0 12L12-6" stroke="#7f9c77" fill="none" />
        </g>
      ))}
      <g transform="translate(220 85)">
        <path d="M0 55L85 15L167 58L82 102Z" fill="#b7c6ad" />
        <path d="M0 55V133L82 180V102Z" fill="#e8d9b9" />
        <path d="M82 102L167 58V137L82 180Z" fill="#cdbf9e" />
        <path d="M-12 57L55-2L108 27L82 108Z" fill="#d59b75" />
        <path d="M55-2L122 1L180 62L82 108L108 27Z" fill="#bd815f" />
        <path d="M90 120L157 84V103L90 140Z" fill="#f1e6c8" />
        <path
          d="M98 117L108 112V131L98 136M124 103L134 98V117L124 122M148 90L157 85V104L148 109"
          fill="#70928b"
        />
        <path d="M22 91L48 106V143L22 128Z" fill="#75969a" />
        <path d="M103 143L127 130V166L103 179Z" fill="#746850" />
        <text
          transform="translate(14 76) skewY(29)"
          fontSize="14"
          fill="#705d42"
        >
          BAKERY
        </text>
        <path d="M104 8V-26L121-19V15" fill="#c4ab8b" />
        <path
          d="M110-32q-12-17 1-27t-2-21"
          stroke="#d2dbd0"
          strokeWidth="8"
          fill="none"
          opacity=".65"
        />
      </g>
      <g transform="translate(440 155)">
        <path d="M0 20L45 0L80 20L35 40Z" fill="#dfb96c" />
        <path d="M0 20V65M80 20V65M35 40V85" stroke="#a18961" strokeWidth="4" />
        <path d="M-8 18L38-5L88 17L36 45Z" fill="#91a998" />
        <path d="M0 59L45 37L80 58L35 80Z" fill="#b9a075" />
        <ellipse cx="35" cy="53" rx="12" ry="6" fill="#e9c58b" />
      </g>
      {(busy
        ? [
            [370, 250],
            [390, 260],
            [410, 244],
            [420, 268],
          ]
        : [
            [370, 250],
            [410, 244],
          ]
      ).map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <ellipse cy="12" rx="9" ry="3" fill="#b4bca5" />
          <path d="M-4 2L-5 11M4 2L5 11" stroke="#796e5e" strokeWidth="3" />
          <rect
            x="-6"
            y="-12"
            width="12"
            height="17"
            rx="4"
            fill={i % 2 ? "#718f9c" : "#c8936e"}
          />
          <circle cy="-17" r="6" fill="#e6c8a0" />
        </g>
      ))}
      <text x="75" y="282" fill="#86947d" fontSize="11" letterSpacing="4">
        BREAD TOWN · EST. 2026
      </text>
    </svg>
  );
}
export function City({
  onComplete,
  onConcept,
  completed,
}: {
  onComplete: () => void;
  onConcept: (id: string) => void;
  completed: boolean;
}) {
  const [step, setStep] = useState(0),
    [clues, setClues] = useState<string[]>([]),
    [feedback, setFeedback] = useState(""),
    [verified, setVerified] = useState(false);
  const quest = quests[0];
  return (
    <div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">FIELD QUEST / 001</span>
          <h1>面包城的清晨</h1>
          <p>一次涨价背后，藏着怎样的市场故事？</p>
        </div>
        <button
          className="secondary"
          onClick={() => {
            setStep(0);
            setClues([]);
            setFeedback("");
            setVerified(false);
          }}
        >
          ↺ 重新挑战
        </button>
      </div>
      <div className="city-scene">
        <CityArt busy={step === 0} />
        <div className="scene-label">
          {step === 3
            ? "☀ 调查完成 · 城市恢复了理解与秩序"
            : "☁ 今日事件 · 面包价格上涨"}
        </div>
      </div>
      <div className="quest-steps">
        {["观察与调查", "判断原因", "实验验证", "完成解释"].map((s, i) => (
          <span key={s} className={step >= i ? "active" : ""}>
            {i + 1}　{s}
          </span>
        ))}
      </div>
      {step === 0 && (
        <section className="card">
          <h2>「昨天4元的面包，今天要5元了！」</h2>
          <p>
            居民小禾请你调查涨价的原因。先观察：市场日交易量也从60个降到了50个。
          </p>
          <div className="choices">
            <button
              className="answer"
              onClick={() => {
                setClues([...new Set([...clues, "baker"])]);
                setFeedback(
                  "面包师阿麦：面粉运输受阻，进货变贵了。同样售价下，我们愿意烤的面包变少了。",
                );
              }}
            >
              ♙ 询问面包师 · 生产发生了什么？
            </button>
            <button
              className="answer"
              onClick={() => {
                setClues([...new Set([...clues, "resident"])]);
                setFeedback(
                  "居民小禾：最近人口和收入没变化，也没有节庆。大家在每个价格下的购买意愿与之前相同。",
                );
              }}
            >
              ♙ 询问居民 · 需求发生了什么？
            </button>
          </div>
          <p className="insight" role="status">
            {feedback || "点击角色收集两条线索。价格变化本身不足以确定原因。"}
          </p>
          <button
            className="primary"
            disabled={clues.length < 2}
            onClick={() => {
              setStep(1);
              setFeedback("");
            }}
          >
            线索 {clues.length}/2 · 作出判断 →
          </button>
        </section>
      )}
      {step === 1 && (
        <section className="card">
          <h2>是什么推高了面包价格？</h2>
          <button
            className="answer"
            onClick={() =>
              setFeedback(
                "这个判断会预测价格和数量一起上升，但调查发现数量下降、购买意愿未变。重新看看面包师的线索。",
              )
            }
          >
            游客增加，需求曲线右移
          </button>
          <button
            className="answer"
            onClick={() => {
              setStep(2);
              setFeedback("");
            }}
          >
            面粉成本上升，供给曲线左移
          </button>
          {feedback && (
            <p role="status" className="insight">
              {feedback}
            </p>
          )}
        </section>
      )}
      {step === 2 && (
        <>
          <div className="insight">
            实验任务：保持需求 a = 0，把供给 b 调整到
            −20，复现价格5元、数量50个的市场。
            <button
              className="text-button"
              onClick={() => onConcept("supply-shift")}
            >
              复习：供给变化 ↗
            </button>
          </div>
          <MarketLab
            onVerified={(a, b) => {
              if (a === quest.shock.a && b === quest.shock.b) {
                setVerified(true);
                setFeedback("✓ 实验与线索一致：均衡价格5元、数量50个。");
              } else {
                setVerified(false);
                setFeedback(
                  "还没有复现调查结果：需求应保持不变，供给在每个价格下减少20个。",
                );
              }
            }}
          />
          {feedback && (
            <p role="status" className="insight">
              {feedback}
            </p>
          )}
          {verified && (
            <section className="card">
              <h3>最后一步：选择完整的经济学解释</h3>
              <button
                className="answer"
                onClick={() =>
                  setFeedback(
                    "价格上升是结果。请从面粉成本这一外生变化开始解释。",
                  )
                }
              >
                价格上涨让需求曲线左移，所以成交量下降。
              </button>
              <button
                className="answer"
                onClick={() => {
                  onComplete();
                  setStep(3);
                }}
              >
                成本上升 → 供给左移；需求不变 → 均衡价格升、数量降。
              </button>
            </section>
          )}
        </>
      )}
      {step === 3 && (
        <section className="card success">
          <span className="medal">✦</span>
          <h2>获得徽章：{quest.reward}</h2>
          <p>
            你完成了收集证据、识别冲击、实验验证和经济学解释。任务已记录到学习档案。
          </p>
          <button
            className="primary"
            onClick={() => onConcept("analysis-steps")}
          >
            把经验连回知识图谱 →
          </button>
        </section>
      )}
      {completed && step !== 3 && (
        <p className="muted">✓ 此任务已有完成记录。重新挑战不会清除记录。</p>
      )}
    </div>
  );
}
