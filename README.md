# Economics Quest · 经济学探索世界

面向中文学习者的本地经济学学习 MVP。React + TypeScript + Vite，无后端、账户或外部数据 API。插图为项目内自绘 SVG，界面不依赖在线字体或图片。

## GitHub 与在线部署

- 源码仓库：https://github.com/coco50812/economics-quest
- GitHub Pages：https://coco50812.github.io/economics-quest/
- 部署工作流：`.github/workflows/deploy-pages.yml`，推送到 `master` 后自动安装锁定依赖、运行单元测试、构建和部署。也支持在 Actions 页面手动运行。
- 云端使用 Node.js 24、pnpm 11.25.0；构建时传入 `--base /economics-quest/`，本地启动仍使用根路径，无需更改业务代码。
- `.env`、依赖、构建产物、截图、ZIP、私钥和PDF不进入版本库；仓库不包含完整版权教材。
- 在线站点与本地站点属于不同浏览器来源，localStorage学习进度各自保存，不会自动同步。

## 第5、6章扩展（已完成）

新增22个知识点、38条关系、调价与总收益实验、价格管制/税负归宿实验，以及两项有完成徽章的任务。旧节点ID与localStorage版本保持不变。新增教学内容明确标注原创；详情、模型、来源、修改文件及兼容说明见 [扩展记录](docs/chapters-5-6.md)。新增章节分别放在 src/data/chapter5.ts 和 chapter6.ts，通过 concepts.ts 追加接入；可选互动通过 activities.ts 的 chapterActivities 注册。

## 本机运行

依赖已安装。Windows 直接双击 **start.cmd**，或在 PowerShell 中执行：

```powershell
.\start.ps1
```

终端会输出本地网址，默认 http://127.0.0.1:5173；端口被占用时 Vite 自动选择下一端口。关闭终端或按 Ctrl+C 停止服务。`start.ps1` 优先使用系统 Node，也支持当前 Codex 配套的 Node。脚本不修改系统环境设置。

在其他电脑上安装 Node.js 22.12+ 后：

```sh
npm install
npm run dev
```

也可使用 `pnpm install` / `pnpm dev`，仓库提供 pnpm 锁文件；推荐 pnpm 11 以复现当前依赖。当前机器没有独立 npm 命令，开发时使用 Codex 自带 pnpm。`.npmrc` 使用 hoisted 布局，避免 Windows 创建符号链接所需的权限。网络配置未写入项目；本次下载使用系统已有本地代理的命令行参数。

## 已实现

- 7篇、22章微观经济学目录，教材版本与 ISBN 独立记录。第1章10个原理、第4章11个概念、第5章13个概念、第6章9个概念开放，其余18章有明确待开发入口。
- 43张中文知识卡：英文名、直觉、定义、例子、模型与假设、误区、关系链接、测试、浏览/掌握状态。
- React Flow 分层图谱：篇 → 章 → 概念、面包屑收起、拖动、缩放、概念搜索定位、语义关系箭头、详情入口。
- 一天12小时的资源分配任务：学习、工作、休闲相互约束，展示收入与机会成本。
- 供求实验：需求/供给冲击、数学计算的曲线和均衡、变化量、重置、固定售价下的短缺/过剩观察。
- 面包城完整流程：调查两名角色 → 正误分支 → 调参复现 → 解释 → 徽章；可重新挑战，与知识点连接。
- localStorage 保存浏览记录、掌握集合、任务、答题次数和最近一次结果、最近学习页面；支持 JSON 导出及二次确认清除。
- 桌面三栏、移动端底部导航、大字号知识卡、键盘焦点样式与减少动态效果支持。

## 经济模型

```text
Qd = 100 + a − 10P
Qs = 20 + b + 10P
P* = (80 + a − b) / 20
Q* = 60 + (a + b) / 2
```

P为元/个，Q为个/日，a、b为在给定价格下的数量冲击。滑块范围均为 [-30, 30]，步长10，在该范围内均衡价格和数量均为正。图表横轴 Q、纵轴 P，虚线为初始曲线。固定售价观察将负数量截为0；图中只绘制非负价格和数量范围。

模型假设竞争市场、同质产品、其他条件不变，斜率固定。它比较静态均衡，不模拟价格调整速度，也不代表福利或公平判断。面包城使用 a=0、b=-20，推得 P*=5、Q*=50。第6章现已实现价格上限、下限和单位税实验，模型与任务说明见 docs/chapters-5-6.md。

## 主要结构

```text
src/
  data/
    types.ts             通用概念、关系与进度类型
    chapters.ts          教材版本、7篇22章微观目录
    concepts.ts          正式知识内容与语义关系
    activities.ts        课程活动、实验与任务元数据
  lib/
    economy.ts           可独立测试的经济模型与时间约束
    progress.ts          版本化进度读取、容错与答题记录
    economy.test.ts      模型、进度与数据完整性测试
  components/
    KnowledgeMap.tsx     分层交互图谱
    Lesson.tsx           通用知识卡及测试
    MarketLab.tsx        SVG 曲线与参数控制
    City.tsx             自绘小镇及任务流程
    Day.tsx              时间分配互动
  App.tsx                导航、课程入口、档案和设置
  styles.css             响应式界面
tests/app.spec.ts        浏览器端到端测试
scripts/capture.mjs      桌面、实验室、图谱和手机截图
artifacts/              实际页面截图
start.ps1 / start.cmd    Windows 启动入口
```

## 增加下一批1—3章

1. 在 `chapters.ts` 将目标章的 `available` 改为 `true`；更换教材时新增版本 ID，不复用不同版本的章节含义。
2. 在 `concepts.ts` 添加符合 `Concept` 的知识数据：稳定且不含序号的语义 ID、所属 chapter、group、双语名、所有教学字段、测试选项及答案。所有开放章节都会自动出现在通用章节页、档案、图谱和搜索中；无需重写知识卡。
3. 添加 `relationships`，其两端必须引用存在的知识 ID，使用 `prerequisite / causes / related / applies_to / contrasts_with`。不要修改已有 ID，否则旧进度无法对应。跨章节关系在知识卡中可直接访问，图谱按章仅显示当前章内部关系，避免堆积。
4. 可选互动先在 `activities.ts` 定义元数据。标准知识卡测试无需新增组件；新型实验或剧情则增加独立组件和纯计算函数，在 App 的任务入口注册，使用 `done(taskId)` 写入任务完成记录。这一版未实现通用可视化剧情编辑器。
5. 增加经济模型及浏览器关键路径测试，运行类型检查、单元测试和生产构建。课程规模改变时同步更新数据完整性测试中的预期数量。

进度 key 为 `economics-quest:v1`，包含 `version / viewed / mastered / quests / results / last`。点击概念仅记浏览，答对测试才进入掌握集合；重复作答累计次数，错误不会抹去历史掌握。任务完成不会自动掌握整章。后续可引入复习时间、置信度、题目级记录和显式版本迁移。

## 测试与构建

```sh
npm test
npm run build
npm run test:e2e
```

无 npm 的当前环境可直接使用：

```sh
node node_modules/vitest/vitest.mjs run
node node_modules/typescript/bin/tsc -b
node node_modules/vite/bin/vite.js build
node node_modules/@playwright/test/cli.js test
```

浏览器测试使用本机 Microsoft Edge，自动启动或复用5173端口的 Vite。其他系统可在 `playwright.config.ts` 去掉 `channel: 'msedge'` 并安装 Playwright Chromium。截图脚本连接5173端口，仅用于当前开发预览，可自行修改。

本次验证：26项单元测试、9条浏览器端到端流程、TypeScript检查、Vite生产构建；截图见 `artifacts/`。详细端到端覆盖目录与分层图谱、搜索、浏览与掌握区别、刷新恢复、未开放章节、游戏正误分支与完成记录、实验重置、时间约束、手机布局和设置。

## 内容来源与边界

目录依据用户提供的《经济学原理（第7版）：微观经济学分册》PDF核对（PDF第9—20页的学习指南图和目录）。项目仅覆盖微观经济学第1—22章、7篇；学习指南图中的宏观部分不纳入本项目。第一篇采用原书措辞“导言”，第三篇为“市场和福利”。

PDF第4页版权页确认：N. Gregory Mankiw著，梁小民、梁砾译，北京大学出版社，2015年5月，ISBN 978-7-301-25690-9。PDF仅用于本地核对，不随项目分发。

第一章十大原理对照原书第4—16页（PDF第24—36页）完善；解释、练习与标明“项目自设”的案例为原创教学摘要，并非教材原文。卡片中补充的机会成本判断步骤、比较优势简例、模型条件与反例用于辅助理解，不冒充教材原有案例或数据。其余已开放章节尚未逐项完成中文版第7版审校；第5、6章保留项目原创教学摘要、案例与简化模型，来源说明不代表已完成教材内容核验。

已知限制：只开放四章；每概念仅一题，掌握判断较粗；没有云同步和备份导入；进度绑定浏览器及端口（不同端口是不同 origin）；清理浏览器会丢失记录。当前关卡的中途步骤及实验参数不会跨刷新保存，已完成任务与学习位置会保存。大字号设置只作用于当前会话知识卡。实验未包含完整福利分析、宏观模拟或政策实证估计。完整无障碍审计与跨浏览器测试留待后续。

建议下一阶段：开发第7章消费者、生产者与市场效率，再接入第8章赋税代价；加入多题掌握评估、复习队列与进度导入。


