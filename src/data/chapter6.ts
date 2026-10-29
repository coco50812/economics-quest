import type { Concept, Relationship } from "./types";
const make = (c: Omit<Concept, "chapter" | "provenance">): Concept => ({
  ...c,
  chapter: 6,
  provenance:
    "本章包含项目原创教学摘要、案例与简化模型，尚需结合中文版第7版教材逐项核对；本内容并非教材原文。主题分组为本项目学习路径。",
});
export const chapter6Concepts: Concept[] = [
  make({
    id: "price-ceiling",
    group: "价格管制的后果",
    name: "价格上限",
    english: "Price Ceiling",
    intuition: "规定“最多卖多少钱”，不代表每个人都能按这个价格买到。",
    definition:
      "价格上限是法定最高交易价格。低于无管制均衡价格时具有约束力；高于均衡时通常不改变均衡。",
    mechanism:
      "有约束力的上限使需求量高于供给量，形成短缺；买卖意愿不能靠继续涨价协调。",
    example: "基础面包市场均衡4元60个。限价3元时需求70个、供给50个，短缺20个。",
    model:
      "有约束力需Pc<P*；短缺=Qd(Pc)−Qs(Pc)。Pc为上限，P*为原均衡价。假设合规、供求不变、没有额外补贴或黑市。",
    misconception: "最高限价不是“价格下限”；无约束上限不是强迫市场涨到上限。",
    question: "均衡价格4元时，3元的价格上限将怎样？",
    options: ["有约束力，产生短缺", "无约束力", "造成供给过剩"],
    answer: 0,
    explanation: "价格被压在均衡以下，需求量大于供给量。",
  }),
  make({
    id: "price-floor",
    group: "价格管制的后果",
    name: "价格下限",
    english: "Price Floor",
    intuition: "规定“至少卖多少钱”，也不能保证愿意卖出的商品都有人买。",
    definition: "价格下限是法定最低交易价格。高于无管制均衡价格时具有约束力。",
    mechanism:
      "有约束力的下限使供给量高于需求量，形成过剩；在没有政府收购时成交受需求一侧限制。",
    example: "面包最低价5元时，需求50个、供给70个，过剩20个。",
    model:
      "有约束力需Pf>P*；过剩=Qs(Pf)−Qd(Pf)。Pf为下限，P*为均衡价。无政府收购且完全合规时，最多成交min(Qd,Qs)。",
    misconception:
      "过剩不是政府必定买走的数量；没有收购安排时，供给意愿不等于实际售出。",
    question: "均衡4元，最低价3元会怎样？",
    options: ["必然涨到5元", "通常不改变4元均衡", "产生20个短缺"],
    answer: 1,
    explanation: "市场原均衡已高于最低价，下限无约束力。",
  }),
  make({
    id: "nonprice-rationing",
    group: "价格管制的后果",
    name: "非价格配给与政策评价",
    english: "Non-price Rationing",
    intuition: "标价低了，购买可能却需要更长排队时间或更多运气。",
    definition:
      "当价格无法使供需相等时，通过排队、抽签、资格等非价格机制分配稀缺供给。",
    mechanism:
      "短缺使部分愿意按管制价购买的人无法成交；时间成本、质量变化和分配规则影响政策实际收益。",
    example:
      "限价面包每天仅供应50个，70个购买意愿中有20个无法满足，排队也消耗时间。",
    model:
      "实验显示min(Qd,Qs)作为无摩擦配给的成交上界，不预测谁得到商品或排队成本。",
    misconception:
      "短缺模型本身不能说明所有买者都受益或都受损；政策需要同时评价效率与分配。",
    question: "较低的标价是否保证每名消费者都受益？",
    options: ["保证", "不保证，还要考虑买不到与配给成本", "只需看标签价格"],
    answer: 1,
    explanation: "能否买到、时间成本与质量都影响实际处境。",
  }),
  make({
    id: "rent-control",
    group: "从商品到住房与劳动",
    name: "租金管制与时间期限",
    english: "Rent Control in the Short and Long Run",
    intuition: "短期住房难增加；长期房东和租户有更多调整空间。",
    definition:
      "租金上限是租赁住房市场的价格上限；在竞争供求模型中，低于均衡租金的限制可能造成住房短缺。",
    mechanism:
      "长期建设、维护和用途转换改变供给反应，居住安排调整改变需求反应；相同租金压低幅度可能产生更大长期缺口。",
    example:
      "某虚构城市冻结低于均衡的租金，新进入租户可能更难找房，已有租户的收益则取决于合约和配给。",
    model:
      "比较短期与长期的Qd(Rc)−Qs(Rc)；Rc为上限租金。此结论依赖供求、合规和政策设计，不是对所有住房政策的绝对评价。",
    misconception:
      "不能把模型里的市场总量变化直接套用到每一位租户或每一种管制制度。",
    question: "长期短缺可能扩大，原因之一是？",
    options: ["租金不再是价格", "供需双方有更多时间调整", "房屋数量永远不变"],
    answer: 1,
    explanation: "长期反应较有弹性时，对受限租金的数量调整可以更大。",
  }),
  make({
    id: "minimum-wage",
    group: "从商品到住房与劳动",
    name: "最低工资的竞争市场分析",
    english: "Minimum Wage in a Competitive Labor Market",
    intuition: "工资是劳动价格，企业需求劳动，劳动者供给劳动。",
    definition:
      "最低工资是法定最低劳动报酬；在简单竞争劳动市场中，高于均衡的最低工资构成有约束力的价格下限。",
    mechanism:
      "该模型预测劳动供给增加、劳动需求减少，出现劳动供给超过需求的缺口；就业通常受劳动需求约束。",
    example:
      "在虚构竞争市场里，工资下限超过均衡后，求职意愿人数可能超过岗位需求。",
    model:
      "劳动过剩=Ls(wmin)−Ld(wmin)，其中wmin为最低工资，Ls、Ld为劳动供给和需求。结论依赖竞争与合规假设。",
    misconception:
      "现实存在买方势力、搜索摩擦、工时和生产率调整，不能把简单模型预测当作所有实证情境的结论。",
    question: "在这里的竞争模型中，谁是劳动需求方？",
    options: ["雇佣劳动的企业", "寻找工作的劳动者", "所有消费者都是"],
    answer: 0,
    explanation: "企业购买劳动服务，劳动者提供劳动服务。",
  }),
  make({
    id: "unit-tax",
    group: "税收由谁承担",
    name: "单位税与税收楔子",
    english: "Per-unit Tax and the Tax Wedge",
    intuition: "消费者付的钱与卖者留下的钱，中间多了一段税。",
    definition:
      "单位税按每一单位交易征收固定金额，使买者支付价格与卖者税后收入价格之间产生差额。",
    mechanism:
      "征税后必须同时满足买卖数量相等和买价减卖价等于单位税；通常成交量减少。",
    example:
      "基础市场每个面包征2元税，买价5元、卖者净得3元、交易50个，税收100元。",
    model:
      "Pb−Ps=t；Qd(Pb)=Qs(Ps)；税收收入=t×Qt。Pb是买方总支付，Ps是卖方净得，t为单位税，Qt为税后交易量。",
    misconception:
      "税收收入不是社会净收益；税负分析也不是完整福利分析，后者将在后续章节展开。",
    question: "买者付5元、卖者净得3元，单位税为？",
    options: ["8元", "2元", "15元"],
    answer: 1,
    explanation: "税收楔子是两种价格之差，5−3=2。",
  }),
  make({
    id: "seller-tax",
    group: "税收由谁承担",
    name: "向卖者征税",
    english: "Taxes Collected from Sellers",
    intuition: "商家负责汇缴税款，不代表税都由商家承担。",
    definition:
      "向卖者征单位税是由卖者依法向政府汇缴每单位税款的安排，与经济税负归宿不同。",
    mechanism:
      "在买方支付价格坐标中，供给曲线上移t；卖者依据扣税后的净价决定供给。",
    example:
      "每个面包税2元，商家收5元、汇缴2元、净得3元；相对原价4元，买卖双方各承担1元。",
    model:
      "Qs=60+s(Pb−t−4)；s为供给数量对净价的斜率参数。本实验无税基准P0=4、Q0=60。",
    misconception:
      "供应曲线的税收移动是用同一价格口径作图；不能同时把买价和净价当成同一个P。",
    question: "卖者汇缴2元税，就表示卖者承担全部2元经济负担吗？",
    options: ["是", "不一定，价格会调整", "买者必然承担全部"],
    answer: 1,
    explanation: "价格调整将税负在双方之间分配，比例取决于相对弹性。",
  }),
  make({
    id: "buyer-tax",
    group: "税收由谁承担",
    name: "向买者征税",
    english: "Taxes Collected from Buyers",
    intuition: "换成顾客汇缴，仍然要比较买者总支付与卖者净收入。",
    definition:
      "向买者征单位税是由买者依法汇缴税款的安排；在标准竞争模型中，与同额卖者税产生相同经济归宿。",
    mechanism:
      "在卖者净得价格坐标中，需求曲线下移t；买者依据商品款加税的总价决定需求。",
    example:
      "基础模型中，买者付给卖者3元，再汇缴2元税，总支付仍为5元，交易仍为50个。",
    model:
      "Qd=60−d(Ps+t−4)；d为需求数量对总价的敏感系数。须假设同额单位税、相同覆盖、完全合规且征管成本相同。",
    misconception:
      "实际世界征管、避税或价格显著性不同可能改变结果；此处的等价性有明确前提。",
    question: "仅将同额税的汇缴方从卖者换成买者，标准模型预测？",
    options: [
      "税负全部转给买者",
      "成交量恢复原值",
      "买方总价、卖方净价与交易量不变",
    ],
    answer: 2,
    explanation: "税收楔子和供需约束不变，因此经济结果不变。",
  }),
  make({
    id: "tax-incidence",
    group: "税收由谁承担",
    name: "弹性与税负归宿",
    english: "Elasticity and Tax Incidence",
    intuition: "更难退出或减少交易的一方，通常更难避开税的负担。",
    definition:
      "税负归宿描述税收的经济负担在买者和卖者之间如何分配，主要由相对供求弹性决定。",
    mechanism:
      "较缺乏弹性的一方调整交易数量的能力较弱，通常承担更大的单位税负份额。",
    example:
      "实验保持基准P=4、Q=60，需求系数d=5、供给系数s=20时，2元税中买者承担1.6元、卖者承担0.4元。",
    model:
      "以共同基准为中心的线性模型：Pb=4+t·s/(d+s)，Ps=4−t·d/(d+s)，Qt=60−t·ds/(d+s)。d、s>0，且Qt>0。买方份额=s/(d+s)，也等于基准Es/(Ed+Es)。",
    misconception:
      "不能在不同坐标尺度或不同基准下仅凭斜率判断相对弹性；法定纳税人不等于最终负担者。",
    question: "需求比供给更缺乏弹性时，通常谁承担更多税负？",
    options: ["买者", "卖者", "法定汇缴方一定承担全部"],
    answer: 0,
    explanation: "需求方更难调整购买数量，因此承担较大的税负份额。",
  }),
];
export const chapter6Relationships: Relationship[] = [
  ...["price-ceiling", "price-floor", "unit-tax"].map((target) => ({
    source: "equilibrium",
    target,
    type: "prerequisite" as const,
  })),
  { source: "government", target: "price-ceiling", type: "related" },
  { source: "price-ceiling", target: "price-floor", type: "contrasts_with" },
  { source: "price-ceiling", target: "imbalance", type: "applies_to" },
  { source: "price-floor", target: "imbalance", type: "applies_to" },
  { source: "price-ceiling", target: "nonprice-rationing", type: "related" },
  { source: "price-ceiling", target: "rent-control", type: "applies_to" },
  { source: "price-floor", target: "minimum-wage", type: "applies_to" },
  {
    source: "supply-elasticity-horizon",
    target: "rent-control",
    type: "prerequisite",
  },
  ...["seller-tax", "buyer-tax", "tax-incidence"].map((target) => ({
    source: "unit-tax",
    target,
    type: "prerequisite" as const,
  })),
  { source: "seller-tax", target: "buyer-tax", type: "contrasts_with" },
  {
    source: "price-elasticity-demand",
    target: "tax-incidence",
    type: "prerequisite",
  },
  {
    source: "price-elasticity-supply",
    target: "tax-incidence",
    type: "prerequisite",
  },
  { source: "tax-incidence", target: "seller-tax", type: "applies_to" },
  { source: "tax-incidence", target: "buyer-tax", type: "applies_to" },
];
