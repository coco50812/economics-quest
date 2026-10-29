import type { Concept, Relationship } from "./types";
const make = (c: Omit<Concept, "chapter" | "provenance">): Concept => ({
  ...c,
  chapter: 5,
  provenance:
    "本章包含项目原创教学摘要、案例与简化模型，尚需结合中文版第7版教材逐项核对；本内容并非教材原文。主题分组为本项目学习路径。",
});
export const chapter5Concepts: Concept[] = [
  make({
    id: "price-elasticity-demand",
    group: "需求对价格有多敏感",
    name: "需求价格弹性",
    english: "Price Elasticity of Demand",
    intuition: "同样涨价10%，有的商品销量只少一点，有的却少很多。",
    definition:
      "在需求的其他决定因素不变时，需求量百分比变化相对于自身价格百分比变化的比率；通常取绝对值。",
    mechanism:
      "价格变动促使消费者寻找替代品或减少消费，弹性衡量这种反应的比例强弱。",
    example: "假设一种面包涨价1%，需求量约下降2%，其局部需求价格弹性约为2。",
    model:
      "Ed = |%ΔQd / %ΔP|；Ed为需求价格弹性，Qd为需求量，P为自身价格。微小变动时 Ed = |dQd/dP| × P/Qd。",
    misconception:
      "弹性衡量百分比反应，不是数量变化的绝对值；估计时要排除需求曲线移动。",
    question: "价格上涨1%，需求量约下降2%，需求价格弹性约为？",
    options: ["0.5", "2", "−2且不能取绝对值"],
    answer: 1,
    explanation: "按本项目约定取绝对值，2% ÷ 1% = 2。",
  }),
  make({
    id: "elasticity-determinants",
    group: "需求对价格有多敏感",
    name: "需求弹性的决定因素",
    english: "Determinants of Demand Elasticity",
    intuition: "越容易换一种选择，顾客通常越不愿意接受涨价。",
    definition:
      "替代品可获得性、必需程度、市场界定与调整时间等影响需求对价格的敏感程度。",
    mechanism:
      "更近的替代品、更窄的市场范围与更长的适应时间，往往让消费者有更多调整办法。",
    example:
      "某一品牌面包涨价，消费者可换品牌；所有食品一起涨价则较难完全避开。",
    model:
      "这是有条件的方向判断，不是固定弹性数值；同一物品在不同人群、价格区间和时期的弹性不同。",
    misconception:
      "“必需品”不代表完全无弹性；不能凭商品名字赋予永久不变的弹性。",
    question: "其他条件相同，哪种情况通常使需求更有弹性？",
    options: ["出现接近的替代品", "可调整时间更短", "更难找到替代品"],
    answer: 0,
    explanation: "替代品增加，使消费者更容易通过更换产品回应涨价。",
  }),
  make({
    id: "midpoint-method",
    group: "需求对价格有多敏感",
    name: "中点法计算弹性",
    english: "The Midpoint Method",
    intuition: "用两次价格和数量的平均值作基准，正着算和倒着算结果一样。",
    definition:
      "中点法用两个观测值的平均数作为百分比变动的分母，计算两点之间的弧弹性。",
    mechanism: "统一基准消除从不同起点计算百分比造成的不对称。",
    example: "价格4→6元、数量60→40个：价格变化40%，数量变化−40%，弹性为1。",
    model:
      "Ed = |[(Q2−Q1)/((Q1+Q2)/2)] / [(P2−P1)/((P1+P2)/2)]|。P1、Q1与P2、Q2为两个点，价格不变时此比值不可计算。",
    misconception:
      "两点弧弹性不一定等于任一点的局部弹性，也不能混用初始值法的分母。",
    question: "4元60个变为6元40个，中点法弹性是多少？",
    options: ["0.67", "1.5", "1"],
    answer: 2,
    explanation: "数量变化为−20/50，价格变化为2/5，二者绝对值相除等于1。",
  }),
  make({
    id: "elasticity-categories",
    group: "需求对价格有多敏感",
    name: "弹性的分类与极端情形",
    english: "Elastic, Inelastic and Unit Elastic",
    intuition: "比较的是数量变化的百分比，能否超过价格变化的百分比。",
    definition:
      "需求价格弹性大于1为富有弹性，小于1为缺乏弹性，等于1为单位弹性；0和趋于无穷大是两种极端情形。",
    mechanism:
      "完全无弹性的曲线竖直；完全有弹性是给定价格处的水平曲线理想化，不表示任意价格都能无限销售。",
    example: "Ed=0.5时，价格小幅涨1%对应需求量约少0.5%；Ed=2时约少2%。",
    model:
      "0≤Ed<1：缺乏弹性；Ed=1：单位弹性；Ed>1：富有弹性。前提是其他需求因素不变。",
    misconception: "不能脱离坐标尺度，仅凭图看起来“陡”或“平”判断弹性。",
    question: "Ed=0.5应归为哪一类？",
    options: ["缺乏弹性", "单位弹性", "富有弹性"],
    answer: 0,
    explanation: "数量的百分比反应小于价格的百分比变化。",
  }),
  make({
    id: "elasticity-total-revenue",
    group: "弹性如何影响收益",
    name: "弹性与总收益",
    english: "Elasticity and Total Revenue",
    intuition: "降价后卖得更多，但新增销量够不够弥补单价下降？",
    definition:
      "总收益是卖者收到的销售收入 P×Q；沿需求曲线调价时，其变动方向取决于需求价格弹性。",
    mechanism:
      "降价有单价损失与销量增加两种效应；富有弹性时数量效应更强，缺乏弹性时价格效应更强。",
    example:
      "实验中 Q=60(P/4)^−2，价格4→3元，需求60→约106.7个，收入240→320元。",
    model:
      "TR=P×Q；微小价格变化时 dTR/dP=Q(1−Ed)。TR是总收益，不扣除成本；有限变动需计算两点收入或弧弹性。",
    misconception:
      "收入提高不等于利润提高；竞争市场单个商家通常不能自由选择市场价格，实验是固定需求关系的比较练习。",
    question: "沿富有弹性的需求区间小幅降价，总收益通常怎样变化？",
    options: ["减少", "不变", "增加"],
    answer: 2,
    explanation: "销量增加的比例超过降价比例，数量效应占优。",
  }),
  make({
    id: "linear-demand-elasticity",
    group: "弹性如何影响收益",
    name: "线性需求曲线上的弹性",
    english: "Elasticity Along a Linear Demand Curve",
    intuition: "一条直线斜率一样，走到不同位置，百分比反应却不同。",
    definition:
      "线性需求具有恒定的数量对价格变化率，但需求价格弹性随价格与数量之比变化。",
    mechanism:
      "在高价低量位置，相同数量变化占原数量比例更大；低价高量位置则相反。",
    example: "第4章 Q=100−10P：P=4、Q=60时Ed=2/3；P=8、Q=20时Ed=4。",
    model:
      "Q=A−dP，Ed=dP/Q，其中A为截距、d为价格系数；P>0且Q>0。TR=AP−dP²，在P=A/(2d)处达到最大值。",
    misconception: "“线性”不意味着“常弹性”；总收益最大化也不等于利润最大化。",
    question: "同一条线性需求曲线上，哪个说法正确？",
    options: ["每一点弹性都相同", "斜率不变但弹性可变", "弹性必定等于1"],
    answer: 1,
    explanation: "弹性不仅由斜率决定，还包含P/Q。",
  }),
  make({
    id: "income-elasticity",
    group: "收入、相关商品与供给",
    name: "需求收入弹性",
    english: "Income Elasticity of Demand",
    intuition: "收入增加后，你对一种商品买得更多还是更少？",
    definition:
      "其他条件不变时，需求量百分比变化与收入百分比变化之比，保留正负号。",
    mechanism:
      "正值对应正常品，负值对应低档品；对正常品而言大于1表示需求增速超过收入增速。",
    example:
      "某类商品在收入上升10%后需求增加5%，按同一百分比基准计算，收入弹性为0.5。",
    model:
      "EY = %ΔQd / %ΔY；Y为收入。EY>0为正常品，EY<0为低档品；分类依具体收入范围与人群。",
    misconception: "低档品是需求随收入变化的分类，不是在评价质量或人的品位。",
    question: "收入上涨而需求量下降，对应的收入弹性是？",
    options: ["负值", "正值", "一定为1"],
    answer: 0,
    explanation: "数量与收入反向变动，比值为负。",
  }),
  make({
    id: "cross-price-elasticity",
    group: "收入、相关商品与供给",
    name: "需求交叉价格弹性",
    english: "Cross-Price Elasticity of Demand",
    intuition: "咖啡涨价，你会多买茶，还是少买咖啡伴侣？",
    definition:
      "其他条件不变时，一种商品需求量百分比变化与另一种商品价格百分比变化之比，保留正负号。",
    mechanism: "替代品涨价往往提高本品需求，互补品涨价往往降低本品需求。",
    example: "假设茶和咖啡是替代品，咖啡涨价使茶的需求增加，交叉价格弹性为正。",
    model:
      "EXY = %ΔQX / %ΔPY；QX为商品X需求量，PY为商品Y价格。正值通常表示替代，负值表示互补。",
    misconception:
      "自身价格变化是沿需求曲线移动，相关商品价格变化可使本品需求曲线移动。",
    question: "两种商品互补时，交叉价格弹性通常为？",
    options: ["正", "负", "永远为零"],
    answer: 1,
    explanation: "一种涨价使另一种的需求减少，方向相反。",
  }),
  make({
    id: "price-elasticity-supply",
    group: "收入、相关商品与供给",
    name: "供给价格弹性",
    english: "Price Elasticity of Supply",
    intuition: "售价上涨时，生产者能多快、多大程度地增加供应？",
    definition:
      "其他供给决定因素不变时，供给量百分比变化与自身价格百分比变化之比。",
    mechanism:
      "生产者通过调整工时、投入与产能回应价格；约束越容易调整，供给往往越有弹性。",
    example:
      "若价格上涨10%带来供给量增加20%，按同一百分比基准计算，供给弹性为2。",
    model: "Es = %ΔQs/%ΔP；Qs为供给量，P为价格。局部线性Qs=C+sP时，Es=sP/Qs。",
    misconception: "供给弹性不等于供给曲线移动；技术进步改变的是供给条件。",
    question: "价格增加10%，供给量增加20%，Es为？",
    options: ["0.5", "1", "2"],
    answer: 2,
    explanation: "20%/10%=2，供给富有弹性。",
  }),
  make({
    id: "supply-elasticity-horizon",
    group: "收入、相关商品与供给",
    name: "供给弹性与调整期限",
    english: "Time Horizon and Supply Elasticity",
    intuition: "今天烤箱已经满负荷，半年后却可以扩建厨房。",
    definition:
      "生产调整的可行性与所考察的期限影响供给弹性，长期通常比短期更能调整产量。",
    mechanism:
      "闲置产能、库存与可进入的生产要素提供调整空间；扩厂和新企业进入需要时间。",
    example: "演出开始前座位数量几乎固定；未来可以增加场次或建设场馆。",
    model:
      "完全无弹性Es=0；普通向上倾斜供给Es>0。期限效应是通常趋势，不是无条件定律。",
    misconception: "长期不等于无限供给；土地、原料和制度约束仍可能限制扩张。",
    question: "其他条件相同，能够扩厂和新进入的长期供给通常？",
    options: ["更有弹性", "必然完全无弹性", "完全不受价格影响"],
    answer: 0,
    explanation: "更长时间提供更多调整产能的机会。",
  }),
  make({
    id: "agriculture-elasticity",
    group: "将弹性带回真实问题",
    name: "丰收与农民总收益",
    english: "Harvests and Farm Revenue",
    intuition: "收成更多不一定让全行业收入更多，因为价格也可能下降。",
    definition:
      "在需求缺乏弹性的区间，供给增加引起的价格下降可能使销售总收益减少。",
    mechanism:
      "供给右移使均衡价格下降、数量增加；若数量增长比例不足以抵消降价，P×Q减少。",
    example:
      "假设农产品需求缺乏弹性，一次普遍丰收压低市场价格，农民全行业销售收入可能下降。",
    model: "比较TR0=P0Q0和TR1=P1Q1；需假设需求未移动、处于缺乏弹性区间。",
    misconception:
      "全行业收入下降不等于每家农户都应少生产；个体激励与市场整体结果不同。",
    question: "丰收后数量增加但行业收入下降，可能因为？",
    options: [
      "需求缺乏弹性，价格降幅较大",
      "供给没有变化",
      "销量增加保证利润增加",
    ],
    answer: 0,
    explanation: "价格效应可超过销量效应；还不能由收入直接判断利润。",
  }),
  make({
    id: "oil-elasticity",
    group: "将弹性带回真实问题",
    name: "石油减产与长短期反应",
    english: "Oil Supply and the Time Horizon",
    intuition: "今天出行方式难改变，几年后可以换车、换能源或增加产能。",
    definition:
      "供求的调整弹性决定给定供给收缩对价格和交易量的影响，短期与长期结果可能不同。",
    mechanism:
      "短期需求与供给都较难调整，减产可能造成较强涨价；长期替代与扩产削弱价格压力。",
    example: "一次外生供应减少后，节能设备、替代能源与新产地需要时间回应。",
    model:
      "供给收缩的幅度相同，并假设其他条件可比；价格影响需同时考虑需求与供给弹性。",
    misconception:
      "不能仅凭短期涨价推断长期价格，也不能忽略非减产方的供给反应。",
    question: "为什么减产的长期价格影响可能小于短期？",
    options: ["长期没有需求", "消费者和其他生产者能更多调整", "价格永远固定"],
    answer: 1,
    explanation: "需求替代与其他供给扩张增加了调整空间。",
  }),
  make({
    id: "drug-policy-elasticity",
    group: "将弹性带回真实问题",
    name: "减少有害品消费的政策比较",
    english: "Supply Restrictions versus Demand Reduction",
    intuition: "让一种有害品更难生产，和让人更少想买，不一定产生相同价格结果。",
    definition:
      "对需求缺乏弹性的商品，供给收缩与需求减少对均衡价格及支出可能产生不同影响。",
    mechanism:
      "供给左移倾向于涨价、减量；需求左移倾向于降价、减量。缺乏弹性时供给收缩可能提高总支出。",
    example:
      "用虚构有害品说明：供应受限可能推高单价；有效预防教育若降低需求，可使价格和数量同降。",
    model:
      "支出=P×Q；供给限制情景假设需求不变，教育情景假设供给不变。此为局部市场分析。",
    misconception:
      "不能仅从价格或总支出推断犯罪、健康或政策总体效果；这些需要额外证据。",
    question: "其他条件不变，有效降低需求通常导致？",
    options: ["价格升且数量升", "价格降且数量降", "数量必定不变"],
    answer: 1,
    explanation: "需求左移与不变的供给相交于更低价格和数量。",
  }),
];
export const chapter5Relationships: Relationship[] = [
  {
    source: "demand-law",
    target: "price-elasticity-demand",
    type: "prerequisite",
  },
  {
    source: "demand-curve",
    target: "linear-demand-elasticity",
    type: "prerequisite",
  },
  {
    source: "price-elasticity-demand",
    target: "elasticity-determinants",
    type: "related",
  },
  ...[
    "midpoint-method",
    "elasticity-categories",
    "elasticity-total-revenue",
    "linear-demand-elasticity",
    "income-elasticity",
    "cross-price-elasticity",
  ].map((target) => ({
    source: "price-elasticity-demand",
    target,
    type: "prerequisite" as const,
  })),
  { source: "demand-shift", target: "income-elasticity", type: "related" },
  { source: "demand-shift", target: "cross-price-elasticity", type: "related" },
  {
    source: "supply-law",
    target: "price-elasticity-supply",
    type: "prerequisite",
  },
  {
    source: "midpoint-method",
    target: "price-elasticity-supply",
    type: "applies_to",
  },
  {
    source: "price-elasticity-supply",
    target: "supply-elasticity-horizon",
    type: "related",
  },
  { source: "shocks", target: "agriculture-elasticity", type: "prerequisite" },
  ...["agriculture-elasticity", "drug-policy-elasticity"].map((target) => ({
    source: "elasticity-total-revenue",
    target,
    type: "applies_to" as const,
  })),
  {
    source: "supply-elasticity-horizon",
    target: "oil-elasticity",
    type: "applies_to",
  },
  {
    source: "elasticity-determinants",
    target: "oil-elasticity",
    type: "applies_to",
  },
];
