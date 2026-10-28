# 第5、6章扩展记录

本次沿用原项目与界面，开放第5章「弹性及其应用」、第6章「供给、需求与政府政策」。目录仍是曼昆第10版13篇37章。新增正文、例子、主题分组与练习为原创教学内容，不宣称复现教材原文、小节措辞或授权译本。

## 知识结构

第5章新增13个知识点：

| 项目学习主题 | 知识点及稳定ID |
| --- | --- |
| 需求对价格有多敏感 | 需求价格弹性 `price-elasticity-demand`；决定因素 `elasticity-determinants`；中点法 `midpoint-method`；分类与极端情形 `elasticity-categories` |
| 弹性如何影响收益 | 弹性与总收益 `elasticity-total-revenue`；线性需求上的弹性 `linear-demand-elasticity` |
| 收入、相关商品与供给 | 收入弹性 `income-elasticity`；交叉价格弹性 `cross-price-elasticity`；供给价格弹性 `price-elasticity-supply`；供给调整期限 `supply-elasticity-horizon` |
| 将弹性带回真实问题 | 丰收与收入 `agriculture-elasticity`；石油与长短期 `oil-elasticity`；有害品政策比较 `drug-policy-elasticity` |

第6章新增9个知识点：

| 项目学习主题 | 知识点及稳定ID |
| --- | --- |
| 价格管制的后果 | 上限 `price-ceiling`；下限 `price-floor`；非价格配给 `nonprice-rationing` |
| 从商品到住房与劳动 | 租金管制 `rent-control`；竞争市场最低工资分析 `minimum-wage` |
| 税收由谁承担 | 单位税与楔子 `unit-tax`；卖者税 `seller-tax`；买者税 `buyer-tax`；弹性与税负归宿 `tax-incidence` |

每个新增概念都有双语名、直觉、定义、核心机制、公式/条件、案例、误区、独立练习和关系。`mechanism`、`provenance`是Concept的可选扩展字段，旧内容不需要迁移。

## 新增38条关系

各新章节数据文件分别提供19条关系，追加到原有关系集合。旧节点及旧关系均保留。典型路径：

- 需求定律 → 需求价格弹性 → 中点法/总收益。
- 供给定律 → 供给价格弹性 → 调整期限 → 石油反应。
- 需求变化 ↔ 收入弹性/交叉价格弹性。
- 均衡 → 上限/下限/单位税。
- 上限/下限 → 短缺与过剩的应用。
- 上限 → 租金管制；下限 → 最低工资。
- 需求价格弹性、供给价格弹性 → 税负归宿。
- 单位税 → 买者税/卖者税，二者形成对比。

图谱默认只显示当前章节，可勾选「显示跨章节关联」显示与第1、4、5、6章的直接关联节点。虚线边框区分外章节点；知识卡继续提供先修与后续链接。

## 互动及模型

### 第5章：调价实验与收益观察员任务

`Q=60(P/4)^(-Ed)`，价格2—8元，常数点弹性Ed可选0.5、1、2。绘制需求曲线与总收益矩形，显示计算所得销量、收入及中点法弧弹性。区分点弹性和有限区间弧弹性，价格未变时弧弹性显示未定义。

任务要求Ed=2、价格3元，再判断收入与利润：计算得到Q≈106.67、TR=320，相对初始收入240增加80。不能从收入推断利润。本模型是固定需求关系的比较，不是对完全竞争单个商家自由定价的假设。

### 第6章：政策议事厅

价格管制沿用第4章 `Qd=100−10P`、`Qs=20+10P`。实际价格在限制无约束时仍保持均衡4元；有约束时按限制价计算。分别展示短缺/过剩、需求量、供给量及无政府收购假设下的成交上界。

单位税采用共享原均衡(4,60)的线性供求：

```text
Qd = 60 − d(Pb − 4)
Qs = 60 + s(Ps − 4)
Pb − Ps = t
Pb = 4 + ts/(d+s)
Ps = 4 − td/(d+s)
Qt = 60 − tds/(d+s)
```

d、s取5/10/20，t取0—3，保持内点正价格、正数量。改变d、s以比较同一基准下的相对弹性；切换汇缴者只改变汇缴流程及商品款，不改变买者总支付、卖者净得或交易量。图中金色面积表示税收收入，不是社会净福利。

任务包含上限3元（短缺20、成交上界50）、下限5元（过剩20、成交上界50）、税额2元且d=5/s=20时两种汇缴比较（买价5.6、净价3.6、数量52）。完成三项并正确解释，获得政策推理员徽章。

## 进度兼容与限制

- 保留 `economics-quest:v1` 和 version=1；不清理任何用户存储。
- 原来的已浏览、已掌握、任务、答题记录原样可读。新增知识自动参与分母：从21变成43，因此总百分比可能下降，已掌握数量没有减少。
- 新任务ID为 `elasticity-revenue`、`policy-council`。互动题成绩存于 `results` 的 `quest:*` ID，不把任务ID写进概念掌握集合。
- 仅追加新页面到最近位置白名单。新增Concept字段可选，无破坏性模式变更。
- 游戏/实验进行中的滑块与步骤仍不跨刷新保存；完成徽章、练习结果与页面位置保存。旧关卡流程不改动。
- 无福利面积计算、政策实证估计、政府收购、黑市、逃税或复杂市场势力模型；租金和最低工资结论明确标注竞争模型边界。

## 修改与新增文件

新增：`src/data/chapter5.ts`、`chapter6.ts`；`src/lib/extendedEconomy.ts`及其测试；`src/components/ExperimentChart.tsx`、`ElasticityLab.tsx`、`PolicyLab.tsx`；`tests/expansion.spec.ts`；本说明。

修改：`src/data/types.ts`、`chapters.ts`、`concepts.ts`、`activities.ts`；`src/lib/progress.ts`；`src/components/Lesson.tsx`、`KnowledgeMap.tsx`；`src/App.tsx`、`src/styles.css`；原课程完整性及浏览器测试；`scripts/capture.mjs`；`README.md`。未新增运行时依赖。原 `City.tsx`、`Day.tsx`、`MarketLab.tsx`与原经济计算模块未改动。

## 验证

26项单元测试、9条Edge端到端测试。覆盖经济恒等式、参数范围、边界状态、旧ID保留、旧进度兼容、新概念掌握、新任务完成/错误分支/刷新保存、跨章关系与手机布局，以及原面包城和原图谱回归。另运行TypeScript与Vite生产构建，并检查桌面/手机截图及控制台。

## 教学参考

章节名称与版本依据 [Cengage官方目录](https://prod.cengageasia.com/title/default/detail?isbn=9780357722718)。标准概念及模型机制交叉核对：

- [OpenStax：需求与供给价格弹性](https://openstax.org/books/principles-economics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)
- [OpenStax：弹性、定价与税负归宿](https://openstax.org/books/principles-economics-3e/pages/5-3-elasticity-and-pricing)
- [OpenStax：收入与交叉价格弹性](https://openstax.org/books/principles-economics-3e/pages/5-4-elasticity-in-areas-other-than-price)
- [OpenStax：价格上限与下限](https://openstax.org/books/principles-economics-3e/pages/3-4-price-ceilings-and-price-floors)

这些参考用于核对概念，没有以其目录冒充曼昆的小节结构，也未使用未经授权的教材全文。用户若提供所持版本的章节材料，后续可逐项对齐译名和学习顺序。
