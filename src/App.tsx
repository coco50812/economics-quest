import { useState, useEffect, lazy, Suspense } from "react";
import {
  Compass,
  Network,
  Store,
  FlaskConical,
  Flag,
  BookOpen,
  Settings,
  ArrowUpRight,
  ChevronRight,
  Map,
  GraduationCap,
  Sun,
  Check,
} from "lucide-react";
import { chapters, parts, textbook } from "./data/chapters";
import { concepts } from "./data/concepts";
import type { Progress } from "./data/types";
import {
  freshProgress,
  parseProgress,
  recordAnswer,
  recordActivityAnswer,
  STORAGE_KEY,
} from "./lib/progress";
import { KnowledgeMap } from "./components/KnowledgeMap";
import { Lesson } from "./components/Lesson";
import { MarketLab } from "./components/MarketLab";
import { Day } from "./components/Day";
import { City, CityArt } from "./components/City";
import { chapterActivities, taskCount } from "./data/activities";
const ElasticityLab = lazy(() =>
  import("./components/ElasticityLab").then((m) => ({
    default: m.ElasticityLab,
  })),
);
const PolicyLab = lazy(() =>
  import("./components/PolicyLab").then((m) => ({ default: m.PolicyLab })),
);
const nav = [
  ["world", "经济学世界", Compass],
  ["map", "知识图谱", Network],
  ["city", "我的城市", Store],
  ["lab", "经济实验室", FlaskConical],
  ["quests", "任务中心", Flag],
  ["profile", "学习档案", BookOpen],
] as const;
export default function App() {
  const [progress, setProgress] = useState<Progress>(() => {
    try {
      return parseProgress(localStorage.getItem(STORAGE_KEY));
    } catch {
      return freshProgress();
    }
  });
  const [page, setPage] = useState(progress.last.page),
    [selected, setSelected] = useState(progress.last.concept),
    [chapter, setChapter] = useState(() => {
      const saved = Number(progress.last.concept.replace("chapter-", ""));
      return chapters.some((c) => c.id === saved) ? saved : 4;
    }),
    [notice, setNotice] = useState(""),
    [settings, setSettings] = useState(false),
    [large, setLarge] = useState(false),
    [confirmReset, setConfirmReset] = useState(false);
  const concept = concepts.find((c) => c.id === selected) || concepts[0];
  const mastered = progress.mastered.filter((id) =>
    concepts.some((c) => c.id === id),
  ).length;
  const pct = Math.round((mastered / concepts.length) * 100);
  const currentActivity = chapterActivities.find((a) => a.page === page);
  const activityCards = (chapterId?: number) =>
    chapterActivities
      .filter((a) => !chapterId || a.chapter === chapterId)
      .map((a) => (
        <button key={a.id} className="concept-tile" onClick={() => go(a.page)}>
          <span className="chapter-tag">第{a.chapter}章 · 交互任务</span>
          <h2>{a.title}</h2>
          <p>{a.description}</p>
          <span>
            {progress.quests.includes(a.id)
              ? `✓ ${a.reward} · 已完成`
              : "进入实验与挑战 →"}
          </span>
        </button>
      ));
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      setNotice(
        "无法写入浏览器存储，请检查隐私设置或存储空间。当前会话仍可学习。",
      );
    }
  }, [progress]);
  function go(p: string) {
    setPage(p);
    setProgress((v) => ({ ...v, last: { page: p, concept: selected } }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function open(id: string, stay = false) {
    if (id.startsWith("chapter-")) {
      chapterPage(+id.slice(8));
      return;
    }
    setSelected(id);
    setProgress((v) => ({
      ...v,
      viewed: [...new Set([...v.viewed, id])],
      last: { page: stay ? page : "lesson", concept: id },
    }));
    if (!stay) {
      setPage("lesson");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  function done(id: string) {
    setProgress((v) => ({ ...v, quests: [...new Set([...v.quests, id])] }));
  }
  const state = (id: string) =>
    progress.mastered.includes(id)
      ? "已掌握"
      : progress.viewed.includes(id)
        ? "已浏览"
        : "未探索";
  function chapterPage(id: number) {
    setChapter(id);
    setSelected(`chapter-${id}`);
    setPage("chapter");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setProgress((v) => ({
      ...v,
      last: { page: "chapter", concept: `chapter-${id}` },
    }));
  }
  const exportData = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(progress, null, 2)], {
        type: "application/json",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "economics-quest-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className={`app ${large ? "large-text" : ""}`}>
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("world");
          }}
        >
          <div className="brand-icon">
            <Compass size={27} />
          </div>
          <div>
            ECONOMICS
            <span>
              QUEST <i>探索世界</i>
            </span>
          </div>
        </a>
        <div className="workspace-label">你的经济学冒险</div>
        <nav aria-label="主导航">
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              aria-label={label}
              className={page === id ? "nav-item active" : "nav-item"}
              onClick={() => go(id)}
            >
              <Icon size={19} />
              {label}
              {id === "quests" && (
                <span className="nav-count">{taskCount}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-course">
          <span className="eyebrow">当前探索</span>
          <div className="course-icon">
            <GraduationCap size={25} />
          </div>
          <b>从日常，看懂经济</b>
          <p>
            曼昆《经济学原理》
            <br />
            {textbook.edition} · 微观经济学学习地图
          </p>
          <div className="progress-track">
            <span style={{ width: `${pct}%` }} />
          </div>
          <small>
            {mastered} / {concepts.length} 个开放知识点已掌握
          </small>
          <button className="text-button" onClick={() => go("profile")}>
            查看学习旅程 <ChevronRight size={14} />
          </button>
        </div>
        <div className="sidebar-bottom">
          <span className="avatar">E</span>
          <div>
            <b>经济学探索者</b>
            <small>本地学习档案</small>
          </div>
          <span className="online-dot" />
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <span>探索世界</span>
            <ChevronRight size={14} />
            <b>
              {currentActivity?.title ||
                nav.find((n) => n[0] === page)?.[1] ||
                `第${page === "chapter" ? chapter : concept.chapter}章`}
            </b>
          </div>
          <div className="top-actions">
            <span className="current-chapter">
              当前章节 · 第
              {currentActivity
                ? currentActivity.chapter
                : page === "lesson" || page === "map"
                  ? concept.chapter
                  : page === "city" || page === "lab"
                    ? 4
                    : page === "day"
                      ? 1
                      : chapter}
              章
            </span>
            <span className="progress-pill">
              <span>✦</span> {pct}% 已掌握
            </span>
            <button
              className="icon-button"
              aria-label="设置"
              onClick={() => setSettings(true)}
            >
              <Settings size={19} />
            </button>
          </div>
        </header>
        <div className="content-layout">
          <main id="main-content">
            {notice && (
              <div role="alert" className="insight">
                {notice}
                <button onClick={() => setNotice("")}>关闭</button>
              </div>
            )}
            {page === "world" && (
              <>
                <div className="page-intro">
                  <span className="eyebrow">
                    A LITTLE CURIOSITY. A BIGGER WORLD.
                  </span>
                  <h1>世界很大，从一个「为什么」开始。</h1>
                  <p>做一次选择，观察一座城市，发现日常生活背后的经济学。</p>
                </div>
                <section className="hero">
                  <div className="hero-copy">
                    <span className="chapter-tag">✦　第一站 · 市场小镇</span>
                    <h2>
                      一块面包，
                      <br />
                      藏着整个市场的秘密。
                    </h2>
                    <p>
                      面包为什么涨价？走进小镇，
                      <br />
                      让供给与需求的故事，在你的选择中发生。
                    </p>
                    <button className="primary" onClick={() => go("city")}>
                      进入面包城 <ArrowUpRight size={17} />
                    </button>
                    <small>第4章 · 供给与需求　/　约8分钟</small>
                  </div>
                  <div className="hero-art">
                    <div className="floating-note note-one">
                      🥖 今日面包价格{" "}
                      <b>
                        ¥5.0 <span>↑</span>
                      </b>
                    </div>
                    <CityArt />
                    <div className="floating-note note-two">
                      <span className="online-dot" /> 小镇里有新的故事
                    </div>
                  </div>
                </section>
                <div className="section-heading world-title">
                  <div>
                    <span className="eyebrow">YOUR EXPLORATION MAP</span>
                    <h2>经济学世界</h2>
                  </div>
                  <button className="text-button" onClick={() => go("map")}>
                    打开知识图谱 <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="world-tabs">
                  <span className="selected">
                    微观旅程 <b>{chapters.length}</b>
                  </span>
                  <span>
                    {parts.length}篇 · {chapters.filter((c) => c.available).length}章已开放
                  </span>
                  <span className="legend-dot">
                    ● 已开放　<span>● 即将开放</span>
                  </span>
                </div>
                <div className="regions">
                  {parts.map((part, i) => (
                    <section
                      className={`region ${i > 1 ? "locked" : ""}`}
                      key={part.id}
                    >
                      <div className="region-head">
                        <span className={`region-symbol symbol-${i % 4}`}>
                          {["⌁", "⚖", "◇", "⌂"][i % 4]}
                        </span>
                        <div>
                          <small>PART {String(part.id).padStart(2, "0")}</small>
                          <h3>{part.title}</h3>
                        </div>
                        <span className="region-count">
                          {chapters.filter((c) => c.part === part.id).length}章
                        </span>
                      </div>
                      <div>
                        {chapters
                          .filter((c) => c.part === part.id)
                          .map((c) => (
                            <button
                              key={c.id}
                              className="chapter-row"
                              onClick={() => chapterPage(c.id)}
                            >
                              <span className="chapter-number">
                                {String(c.id).padStart(2, "0")}
                              </span>
                              <span>
                                {c.title}
                                {c.available && (
                                  <small>
                                    {
                                      concepts.filter((n) => n.chapter === c.id)
                                        .length
                                    }
                                    个知识点 · 可探索
                                  </small>
                                )}
                              </span>
                              {c.available ? (
                                <ChevronRight size={16} />
                              ) : (
                                <small className="soon">待开发</small>
                              )}
                            </button>
                          ))}
                      </div>
                    </section>
                  ))}
                </div>
              </>
            )}
            {page === "map" && (
              <>
                <div className="page-intro">
                  <span className="eyebrow">CONNECT THE IDEAS</span>
                  <h1>知识不是孤岛。</h1>
                  <p>从{parts.length}篇的鸟瞰图出发，走进章节，发现概念之间的联系。</p>
                </div>
                <section className="card map-card">
                  <KnowledgeMap
                    mastered={progress.mastered}
                    selected={selected}
                    onSelect={(id) => open(id, true)}
                  />
                </section>
                <section className="card map-detail">
                  <span className="eyebrow">
                    当前知识点 · 第{concept.chapter}章
                  </span>
                  <h2>{concept.name}</h2>
                  <p>{concept.intuition}</p>
                  <button className="primary" onClick={() => open(concept.id)}>
                    阅读知识卡与测试 →
                  </button>
                </section>
              </>
            )}
            {page === "chapter" &&
              (() => {
                const c = chapters.find((c) => c.id === chapter) || chapters[0];
                return (
                  <>
                    <span className="eyebrow">
                      {textbook.edition} · 第{c.part}篇
                    </span>
                    <h1>
                      第{c.id}章 · {c.title}
                    </h1>
                    {!c.available ? (
                      <section className="card empty-state">
                        <Map size={48} />
                        <h2>这片土地，正在绘制中</h2>
                        <p>章节入口已保留，正式知识内容和任务尚未开发。</p>
                        <button className="primary" onClick={() => go("world")}>
                          返回世界，探索已开放章节
                        </button>
                      </section>
                    ) : (
                      <>
                        {[
                          ...new Set(
                            concepts
                              .filter((n) => n.chapter === chapter)
                              .map((n) => n.group),
                          ),
                        ].map((group) => (
                          <section key={group}>
                            <h3>{group}</h3>
                            <div className="concept-grid">
                              {concepts
                                .filter(
                                  (n) =>
                                    n.chapter === chapter && n.group === group,
                                )
                                .map((n) => (
                                  <button
                                    key={n.id}
                                    className="concept-tile"
                                    onClick={() => open(n.id)}
                                  >
                                    <small>{n.english}</small>
                                    <h3>{n.name}</h3>
                                    <p>{n.intuition}</p>
                                    <span>
                                      {state(n.id)} <ChevronRight size={14} />
                                    </span>
                                  </button>
                                ))}
                            </div>
                          </section>
                        ))}
                        {chapterActivities.some(
                          (a) => a.chapter === chapter,
                        ) && (
                          <div className="two-cards">
                            {activityCards(chapter)}
                          </div>
                        )}
                        {chapter === 1 ? (
                          <Day onComplete={() => done("day")} />
                        ) : chapter === 4 ? (
                          <button className="primary" onClick={() => go("lab")}>
                            用供求实验验证理解 →
                          </button>
                        ) : null}
                      </>
                    )}
                  </>
                );
              })()}
            {page === "lesson" && (
              <Lesson
                key={concept.id}
                concept={concept}
                progress={progress}
                onSelect={open}
                onAnswer={(id, correct) =>
                  setProgress((v) => recordAnswer(v, id, correct))
                }
              />
            )}
            {page === "lesson" &&
              chapterActivities.some(
                (a) =>
                  a.concepts.includes(concept.id) ||
                  a.chapter === concept.chapter,
              ) && (
                <div className="two-cards">
                  {activityCards(concept.chapter)}
                </div>
              )}
            {page === "elasticity" && (
              <Suspense fallback={<p role="status">正在准备调价实验…</p>}>
                <ElasticityLab
                  completed={progress.quests.includes("elasticity-revenue")}
                  onComplete={() => done("elasticity-revenue")}
                  onAttempt={(id, correct) =>
                    setProgress((p) => recordActivityAnswer(p, id, correct))
                  }
                  onConcept={(id) => open(id)}
                />
              </Suspense>
            )}
            {page === "policy" && (
              <Suspense fallback={<p role="status">正在准备政策实验…</p>}>
                <PolicyLab
                  completed={progress.quests.includes("policy-council")}
                  onComplete={() => done("policy-council")}
                  onAttempt={(id, correct) =>
                    setProgress((p) => recordActivityAnswer(p, id, correct))
                  }
                  onConcept={(id) => open(id)}
                />
              </Suspense>
            )}
            {page === "lab" && (
              <>
                <div className="page-intro">
                  <span className="eyebrow">THE ECONOMIC PLAYGROUND</span>
                  <h1>经济实验室</h1>
                  <p>把「如果」变成看得见的结果。</p>
                </div>
                <div className="two-cards">{activityCards()}</div>
                <section className="card">
                  <MarketLab />
                </section>
                <div className="two-cards">
                  <button
                    className="concept-tile"
                    onClick={() => open("demand-shift")}
                  >
                    <h3>沿曲线移动，还是整条曲线移动？</h3>
                    <p>回到概念，分清价格变化与需求变化。</p>
                    <span>阅读知识卡 →</span>
                  </button>
                  <button className="concept-tile" onClick={() => go("city")}>
                    <h3>把模型带回面包城</h3>
                    <p>用一场市场调查检验你的判断。</p>
                    <span>开始任务 →</span>
                  </button>
                </div>
              </>
            )}
            {page === "city" && (
              <City
                completed={progress.quests.includes("bread-city")}
                onComplete={() => done("bread-city")}
                onConcept={(id) => open(id)}
              />
            )}
            {page === "quests" && (
              <>
                <span className="eyebrow">LEARN BY DOING</span>
                <h1>任务中心</h1>
                <div className="two-cards">
                  <button className="concept-tile" onClick={() => go("day")}>
                    <span className="chapter-tag">第1章 · 生活实验</span>
                    <h2>有限的一天</h2>
                    <p>在学习、工作和休闲之间找到你的选择。</p>
                    <span>
                      {progress.quests.includes("day")
                        ? "✓ 已完成 · 再试一次"
                        : "接受任务 →"}
                    </span>
                  </button>
                  <button className="concept-tile" onClick={() => go("city")}>
                    <span className="chapter-tag">第4章 · 城市调查</span>
                    <h2>面包为什么涨价了？</h2>
                    <p>用真实的线索，找到价格变化的原因。</p>
                    <span>
                      {progress.quests.includes("bread-city")
                        ? "✓ 已完成 · 再次挑战"
                        : "接受任务 →"}
                    </span>
                  </button>
                  {activityCards()}
                </div>
                <section className="card">
                  <h3>下一站 · 市场与福利</h3>
                  <p>
                    第7章尚未开发。先用已开放实验建立供求、弹性与政策的联系。
                  </p>
                  <button className="secondary" onClick={() => chapterPage(7)}>
                    查看第7章入口
                  </button>
                </section>
              </>
            )}
            {page === "day" && <Day onComplete={() => done("day")} />}
            {page === "profile" && (
              <>
                <span className="eyebrow">SMALL STEPS, REAL UNDERSTANDING</span>
                <h1>你的学习旅程</h1>
                <div className="profile-stats">
                  <div>
                    <b>
                      {
                        progress.viewed.filter((id) =>
                          concepts.some((c) => c.id === id),
                        ).length
                      }
                    </b>
                    <span>已浏览知识点</span>
                  </div>
                  <div>
                    <b>{mastered}</b>
                    <span>已掌握 / {concepts.length}</span>
                  </div>
                  <div>
                    <b>{progress.quests.length}</b>
                    <span>已完成任务 / {taskCount}</span>
                  </div>
                </div>
                <section className="card">
                  <h2>成长记录</h2>
                  <p>
                    浏览只记录足迹；答对知识点测试才记为掌握。任务徽章独立记录。
                  </p>
                  {progress.quests.length > 0 && (
                    <p className="insight">
                      {progress.quests.includes("bread-city")
                        ? "✦ 市场调查员　"
                        : ""}
                      {progress.quests.includes("day") ? "✦ 时间规划师" : ""}
                      {chapterActivities
                        .filter((a) => progress.quests.includes(a.id))
                        .map((a) => (
                          <span key={a.id}>　✦ {a.reward}</span>
                        ))}
                    </p>
                  )}
                  <div className="record-list">
                    {concepts.map((c) => (
                      <button key={c.id} onClick={() => open(c.id)}>
                        <span>{c.name}</span>
                        <small>
                          测试 {progress.results[c.id]?.attempts || 0} 次
                        </small>
                        <span
                          className={
                            progress.mastered.includes(c.id) ? "correct" : ""
                          }
                        >
                          {state(c.id)}{" "}
                          {progress.mastered.includes(c.id) && (
                            <Check size={13} />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                  <h3>新增互动练习记录</h3>
                  <p>任务练习独立于知识点掌握，答错也保留尝试次数。</p>
                  <div className="activity-records">
                    {[
                      ["quest:elasticity-revenue", "调价结论"],
                      ["quest:policy-ceiling", "上限判断"],
                      ["quest:policy-floor", "下限判断"],
                      ["quest:policy-incidence", "税负归宿解释"],
                    ].map(([id, title]) => (
                      <div key={id}>
                        <span>{title}</span>
                        <small>
                          作答 {progress.results[id]?.attempts || 0} 次 ·{" "}
                          {progress.results[id]
                            ? progress.results[id].correct
                              ? "最近答对"
                              : "最近答错"
                            : "未作答"}
                        </small>
                      </div>
                    ))}
                  </div>
                  <button className="secondary" onClick={exportData}>
                    导出学习记录 JSON
                  </button>
                </section>
              </>
            )}
          </main>
          <aside className="context-panel">
            <div className="context-heading">
              <Sun size={17} />
              <span>探索者手记</span>
            </div>
            <section className="daily-card">
              <span className="eyebrow">TODAY'S IDEA</span>
              <span className="quote-mark">“</span>
              <h3>
                {page === "lesson" || page === "map"
                  ? concept.name
                  : "每一次选择，都是一次权衡。"}
              </h3>
              <p>
                {page === "lesson" || page === "map"
                  ? concept.intuition
                  : "经济学不只关乎金钱，更关乎我们如何使用有限的时间与资源。"}
              </p>
              <button
                className="text-button"
                onClick={() =>
                  open(
                    page === "lesson" || page === "map"
                      ? concept.id
                      : "tradeoffs",
                  )
                }
              >
                探索这个原理 <ArrowUpRight size={15} />
              </button>
            </section>
            <section className="journey-card">
              <h3>
                <Flag size={16} /> 下一步，去发现
              </h3>
              <button onClick={() => open("opportunity-cost")}>
                <span className="step-circle">1</span>
                <div>
                  <b>认识机会成本</b>
                  <small>第1章 · 知识探索</small>
                </div>
                <ChevronRight size={14} />
              </button>
              <button onClick={() => go("lab")}>
                <span className="step-circle">2</span>
                <div>
                  <b>移动一条需求曲线</b>
                  <small>第4章 · 交互实验</small>
                </div>
                <ChevronRight size={14} />
              </button>
              <button onClick={() => go("city")}>
                <span className="step-circle">3</span>
                <div>
                  <b>解开面包城的谜题</b>
                  <small>第4章 · 城市任务</small>
                </div>
                <ChevronRight size={14} />
              </button>
            </section>
            <section className="achievement">
              <div className="medal">✦</div>
              <small>你的下一枚徽章</small>
              <h3>
                {progress.quests.includes("bread-city")
                  ? "市场调查员 · 已获得"
                  : "市场调查员"}
              </h3>
              <p>
                在面包城，完成你的
                <br />
                第一次市场调查。
              </p>
              <button className="secondary" onClick={() => go("city")}>
                {progress.quests.includes("bread-city")
                  ? "再访面包城"
                  : "前往挑战"}
              </button>
            </section>
            <p className="local-note">
              <span className="online-dot" /> 进度保存在此浏览器
              <br />
              <small>无需账户，随时继续探索。</small>
            </p>
          </aside>
        </div>
        <footer>
          ECONOMICS QUEST <span>保持好奇，让理解发生。</span>
          <a href={textbook.source} target="_blank" rel="noreferrer">
            教材版本与来源说明 ↗
          </a>
        </footer>
      </div>
      {settings && (
        <div className="modal-overlay" onClick={() => setSettings(false)}>
          <section
            className="modal card"
            role="dialog"
            aria-modal="true"
            aria-label="学习设置"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="section-heading">
              <h2>学习设置</h2>
              <button
                className="icon-button"
                aria-label="关闭设置"
                onClick={() => setSettings(false)}
              >
                ×
              </button>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={large}
                onChange={(e) => setLarge(e.target.checked)}
              />{" "}
              大字号阅读
            </label>
            <p>数据仅保存在当前浏览器。导出备份可防止清理浏览器数据后丢失。</p>
            <button className="secondary" onClick={exportData}>
              导出学习记录
            </button>
            <hr />
            <button
              className="text-button danger"
              onClick={() => setConfirmReset(true)}
            >
              重置学习进度
            </button>
            {confirmReset && (
              <div>
                <p>这将清除当前浏览器中所有学习记录，无法撤销。</p>
                <button
                  className="primary"
                  onClick={() => {
                    setProgress(freshProgress());
                    setPage("world");
                    setSelected("tradeoffs");
                    setConfirmReset(false);
                    setSettings(false);
                  }}
                >
                  确认清除
                </button>
                <button
                  className="secondary"
                  onClick={() => setConfirmReset(false)}
                >
                  取消
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
