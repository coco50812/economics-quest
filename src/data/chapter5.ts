import type { Concept, Relationship } from "./types";
const make = (c: Omit<Concept, "chapter" | "provenance">): Concept => ({
  ...c,
  chapter: 5,
  provenance:
    "本章依据曼昆《经济学原理（第7版）：微观经济学分册》第5章编写，包含项目原创的教学解释、案例重述和简化模型；非教材原文。中点法案例与部分图表已本地抽核，不代表全章逐项审校完成。",
});
export const chapter5Concepts: Concept[] = [
  make({
    id: "price-elasticity-demand",
    group: "需求价格弹性",
    name: "需求价格弹性",
    english: "Price Elasticity of Demand",
    intuition:
      "同样涨价10%，有的商品销量只少一点，有的却少很多；弹性就是用来衡量这种反应有多强的尺度。",
    definition:
      "需求价格弹性衡量在其他需求决定因素不变时，需求量对自身价格变化的反应程度，等于需求量百分比变化与价格百分比变化的比率，通常取绝对值。",
    mechanism:
      "第4章的需求定律告诉我们价格上升会减少需求量，但没说减少多少；弹性用百分比比较不同商品，避免受计量单位影响。价格变动促使消费者寻找替代品或减少消费，弹性衡量这种反应的比例强弱。",
    example:
      "教材例子：某商品价格上涨10%，需求量下降20%，则 Ed = 20% ÷ 10% = 2。意思是价格每变化1%，需求量约变化2%；这不是需求量减少2个。",
    model:
      "Ed = |%ΔQd / %ΔP|；Qd为需求量、P为自身价格。需求定律使分子通常为负，项目按教材惯例取绝对值表示大小。百分比使不同商品、不同单位之间可比较。",
    misconception:
      "Ed=2 不表示需求量减少2个单位，而是需求量变化的百分比是价格变化百分比的2倍；只看数量变化的绝对数无法比较不同商品的敏感度。",
    question: "价格上涨10%，需求量下降20%，需求价格弹性是多少？",
    options: ["0.5", "2", "−2"],
    answer: 1,
    explanation: "需求价格弹性取绝对值：20% ÷ 10% = 2。",
  }),
  make({
    id: "elasticity-determinants",
    group: "需求价格弹性",
    name: "需求弹性的决定因素",
    english: "Determinants of Demand Elasticity",
    intuition: "越容易找到替代办法，顾客通常越不愿意接受涨价。",
    definition:
      "需求价格弹性的大小受四个因素影响：相近替代品的可获得性、必需品与奢侈品、市场定义的范围、以及调整时间的长短。",
    mechanism:
      "替代品越多、商品越偏奢侈品、市场界定越窄、可调整时间越长，消费者越容易对价格变化作出反应，需求越富有弹性；反之则越缺乏弹性。",
    example:
      "某一品牌冰淇淋涨价，消费者可换其他品牌（替代品多，富有弹性）；处方救命药涨价，短期难以替代（缺乏弹性）。能源需求：短期人们难改用车和用电习惯，需求缺乏弹性；长期可换节能设备、调整出行方式，需求更富有弹性。",
    model:
      "四个方向性判断：相近替代品可获得性↑、更偏奢侈品、市场范围窄、时间跨度长 → 需求更富有弹性。这些是趋势而非固定数值；同一商品在不同人群、价格区间和时期的弹性不同。",
    misconception:
      "“必需品”不代表完全无弹性，“奢侈品”也不代表弹性无穷大；不能凭商品名字赋予永久不变的弹性。",
    question: "以下哪种情况通常使需求更富有弹性？",
    options: ["时间跨度更长", "没有相近替代品", "市场范围更宽（如所有食品）"],
    answer: 0,
    explanation:
      "更长时间让消费者能调整消费方式，需求通常更富有弹性；没有替代品或市场范围宽则倾向缺乏弹性。",
  }),
  make({
    id: "midpoint-method",
    group: "需求价格弹性",
    name: "中点法计算弹性",
    english: "The Midpoint Method",
    intuition:
      "用初始值当分母，从4元涨到6元和从6元降到4元会算出不同结果；改用中点作基准，两个方向结果就一致了。",
    definition:
      "中点法用两个数值的平均数作为计算百分比变动的基准，从而得到与方向无关的弧弹性。",
    mechanism:
      "初始值法因分母不同产生不对称；中点法固定用两个数值的中点作分母，正向和反向计算得到相同弹性。",
    example:
      "教材例子：A点价格4美元、数量120，B点价格6美元、数量80。平均价格5美元、平均数量100；价格变化(6−4)/5=40%，数量变化(80−120)/100=−40%，Ed=|−40%/40%|=1。（项目面包城实验另用4→6元、60→40个的数据，属自设实验，勿混用。）",
    model:
      "Ed = |[(Q2−Q1)/((Q1+Q2)/2)] / [(P2−P1)/((P1+P2)/2)]|；P1、Q1与P2、Q2为两个点。点弹性是某一点的局部弹性，弧弹性概括两点间的反应，两者不同；中点法要求平均价格、平均数量非零，且两点价格不同。",
    misconception:
      "弧弹性（两点间平均）不等于点弹性（某点局部）；中点法不是唯一计算方式，但能消除初始值法带来的方向不对称。",
    question: "价格4美元→6美元、数量120→80（中点法），需求价格弹性是多少？",
    options: ["1", "1.5", "0.67"],
    answer: 0,
    explanation: "价格变化40%、数量变化−40%，绝对值相除等于1。",
  }),
  make({
    id: "elasticity-categories",
    group: "需求价格弹性",
    name: "各种需求曲线",
    english: "Types of Demand Curves",
    intuition:
      "弹性有从0到无穷大的范围；比较的是数量变化的百分比能否超过价格变化的百分比。",
    definition:
      "按需求价格弹性大小，需求曲线分为完全无弹性(Ed=0)、缺乏弹性(0<Ed<1)、单位弹性(Ed=1)、富有弹性(Ed>1)和完全有弹性(Ed→∞)五类。",
    mechanism:
      "完全无弹性表示需求量不随价格变化（竖直曲线）；完全有弹性表示在该价格下需求量可以任意多（水平曲线，理想化）；中间各类反映不同的反应强度。",
    example:
      "Ed=0.5 时价格涨1%需求量约少0.5%（缺乏弹性）；Ed=2 时约少2%（富有弹性）；Ed=1 时比例相等（单位弹性）。",
    model:
      "0≤Ed<1：缺乏弹性；Ed=1：单位弹性；Ed>1：富有弹性；Ed=0：完全无弹性；Ed→∞：完全有弹性。前提是其他需求因素不变。",
    misconception:
      "需求曲线的斜率不等于需求价格弹性；不能只凭图形看起来陡或平判断弹性，弹性是百分比变化的比值。",
    question: "Ed=0.5 应归为哪一类？",
    options: ["缺乏弹性", "单位弹性", "富有弹性"],
    answer: 0,
    explanation: "数量的百分比反应小于价格的百分比变化。",
  }),
  make({
    id: "elasticity-total-revenue",
    group: "弹性与总收益",
    name: "总收益与需求价格弹性",
    english: "Total Revenue and Price Elasticity of Demand",
    intuition:
      "降价后卖得更多，但新增销量够不够弥补单价下降？这决定了总收益是升还是降。",
    definition:
      "总收益 TR = P × Q，即卖者收到的销售收入；沿同一需求曲线调价时，总收益的变动方向取决于需求价格弹性。",
    mechanism:
      "降价有“单价损失”（价格效应）和“销量增加”（数量效应）两种作用：富有弹性时数量效应更强，降价使总收益增加；缺乏弹性时价格效应更强，降价使总收益减少；单位弹性时两者恰好抵消。",
    example:
      "项目实验（自设固定弹性模型 Q=60(P/4)^(−Ed)）：Ed=2、价格4→3元时，需求60→约106.7个，总收益240→320元（富有弹性，降价增收）。",
    model:
      "TR=P×Q。以下方向判断适用于沿同一需求曲线的小幅变价，或整个区间保持相应弹性类别的变价。Ed>1：降价→TR↑、涨价→TR↓；Ed<1：降价→TR↓、涨价→TR↑；整个区间Ed=1：TR不变；仅某点Ed=1不能保证大幅调价后收入不变。有限变动可直接比较两点P×Q，或使用中点法弧弹性。TR 是销售收入，未扣除成本；总收益增加不等于利润增加。",
    misconception:
      "总收益不是利润，也不是总成本；总收益增加不代表利润一定增加。竞争市场单个商家通常不能自由选择市场价格，实验是固定需求关系的比较练习。",
    question: "沿缺乏弹性的需求区间小幅降价，总收益通常怎样变化？",
    options: ["增加", "减少", "不变"],
    answer: 1,
    explanation: "销量增加的比例小于降价比例，价格效应占优，总收益减少。",
  }),
  make({
    id: "linear-demand-elasticity",
    group: "弹性与总收益",
    name: "沿着线性需求曲线的弹性和总收益",
    english: "Elasticity and Total Revenue Along a Linear Demand Curve",
    intuition: "一条直线斜率处处相同，走到不同位置，百分比反应却不一样。",
    definition:
      "线性需求曲线有恒定的数量对价格变化率，但需求价格弹性随价格与数量之比而变化，因此同一曲线上不同点的弹性不同。",
    mechanism:
      "在高价低量位置，相同数量变化占原数量的比例更大；在低价高量位置则更小。弹性 Ed=d×P/Q 同时包含数量对价格变化率的绝对值d与位置P/Q；在横轴Q、纵轴P的图中，曲线斜率是−1/d。",
    example:
      "第4章 Q=100−10P：P=4、Q=60时 Ed=10×4/60=2/3（缺乏弹性）；P=8、Q=20时 Ed=10×8/20=4（富有弹性）。在线性需求曲线的中点处 Ed=1，总收益在此达到最大。",
    model:
      "Q=A−dP，Ed=dP/Q，A为截距、d为价格系数（P>0、Q>0）。总收益 TR=AP−dP² 在 P=A/(2d)（即 Ed=1 的中点）处达到最大值。",
    misconception:
      "“线性”不等于“常弹性”；斜率相同不代表弹性相同。总收益最大化也不等于利润最大化。",
    question: "同一条线性需求曲线上，哪个说法正确？",
    options: ["每一点弹性都相同", "斜率不变但弹性可变", "弹性必定等于1"],
    answer: 1,
    explanation: "弹性由斜率与 P/Q 共同决定，同一曲线上不同位置弹性不同。",
  }),
  make({
    id: "income-elasticity",
    group: "其他需求弹性与供给弹性",
    name: "需求收入弹性",
    english: "Income Elasticity of Demand",
    intuition: "收入增加后，你会对一种商品买得更多还是更少？方向由收入弹性决定。",
    definition:
      "需求收入弹性衡量需求量对收入变化的反应程度，等于需求量百分比变化与收入百分比变化之比，保留正负号。",
    mechanism:
      "收入变化使需求曲线移动（属非自身价格因素），与自身价格变化引起的沿曲线移动不同。收入弹性为正表示正常品，为负表示低档品。",
    example:
      "收入上升10%后，某商品需求增加5%，收入弹性为0.5（正常品）；若需求反而下降，收入弹性为负（低档品）。",
    model:
      "EY = %ΔQd / %ΔY；Y为收入。EY>0：正常品；EY<0：低档品；正常品中 EY>1 表示需求增速超过收入增速。分类依具体收入范围与人群。",
    misconception:
      "低档品是“需求随收入反向变化”的分类，不是质量低劣的代名词；正常品也不一定都是奢侈品。",
    question: "收入上涨而需求量下降，对应的收入弹性是？",
    options: ["负值", "正值", "一定为1"],
    answer: 0,
    explanation: "数量与收入反向变动，比值为负，对应低档品。",
  }),
  make({
    id: "cross-price-elasticity",
    group: "其他需求弹性与供给弹性",
    name: "需求交叉价格弹性",
    english: "Cross-Price Elasticity of Demand",
    intuition: "咖啡涨价，你会多买茶，还是少买咖啡伴侣？这取决于两种商品的关系。",
    definition:
      "需求交叉价格弹性衡量一种商品需求量对另一种商品价格变化的反应程度，等于商品X需求量百分比变化与商品Y价格百分比变化之比，保留正负号。",
    mechanism:
      "商品Y价格变化可能使商品X的需求曲线移动（与X自身价格变化不同）。替代品之间交叉弹性为正，互补品之间为负。",
    example:
      "咖啡涨价使茶的替代需求增加，交叉弹性为正；汽油涨价使汽车需求减少，交叉弹性为负。",
    model:
      "EXY = %ΔQX / %ΔPY；QX为商品X需求量、PY为商品Y价格。正值通常表示替代，负值表示互补。",
    misconception:
      "交叉价格弹性涉及两种商品，与一种商品的自身价格弹性不是一回事；商品Y价格变化使商品X需求曲线移动。",
    question: "两种商品互补时，交叉价格弹性通常为？",
    options: ["正", "负", "永远为零"],
    answer: 1,
    explanation: "一种涨价使另一种需求减少，方向相反，交叉弹性为负。",
  }),
  make({
    id: "price-elasticity-supply",
    group: "其他需求弹性与供给弹性",
    name: "供给价格弹性",
    english: "Price Elasticity of Supply",
    intuition: "售价上涨时，生产者能多快、多大程度地增加供应？",
    definition:
      "供给价格弹性衡量其他供给决定因素不变时，供给量对自身价格变化的反应程度，等于供给量百分比变化与价格百分比变化之比。",
    mechanism:
      "价格上升使多生产更有利可图，生产者通过调整工时、投入与产能扩大供给；生产调整越灵活，供给越有弹性。",
    example: "价格上涨10%带来供给量增加20%，供给弹性 Es = 20% ÷ 10% = 2。",
    model:
      "Es = %ΔQs / %ΔP；Qs为供给量、P为价格。局部线性 Qs=C+sP 时 Es=sP/Qs。供给弹性衡量沿供给曲线的反应，不是供给曲线移动。",
    misconception:
      "供给弹性不是需求弹性；供给量增加（沿曲线移动）不等于整条供给曲线右移（供给条件变化）。",
    question: "价格增加10%，供给量增加20%，Es 为？",
    options: ["0.5", "1", "2"],
    answer: 2,
    explanation: "20% ÷ 10% = 2，供给富有弹性。",
  }),
  make({
    id: "supply-elasticity-horizon",
    group: "其他需求弹性与供给弹性",
    name: "供给弹性与调整期限",
    english: "Supply Elasticity and Time Horizon",
    intuition: "今天烤箱已经满负荷，半年后却可以扩建厨房。",
    definition:
      "生产调整的可行性与所考察的期限影响供给弹性：短期生产能力受现有设备、厂房和生产安排限制，长期可调整产能，供给通常更有弹性。",
    mechanism:
      "短期生产者难以立即大幅调整产量；长期可改变生产安排、扩大产能，甚至出现新的生产者进入，供给调整空间更大。",
    example:
      "演出开始前座位数量几乎固定（短期缺乏弹性）；未来可以增加场次或建设场馆（长期更有弹性）。",
    model:
      "完全无弹性 Es=0；普通向上倾斜供给 Es>0。期限效应是通常趋势，不是无条件定律；同一商品在不同时间范围内弹性不同。",
    misconception:
      "长期不等于无限供给，也不等于“长期必然完全有弹性”；土地、原料和制度约束仍可能限制扩张。",
    question: "其他条件相同，能够扩厂和新进入的长期供给通常？",
    options: ["更有弹性", "必然完全无弹性", "完全不受价格影响"],
    answer: 0,
    explanation: "更长时间提供更多调整产能的机会。",
  }),
  make({
    id: "supply-elasticity-calculation",
    group: "其他需求弹性与供给弹性",
    name: "供给价格弹性的计算",
    english: "Calculating the Price Elasticity of Supply",
    intuition:
      "计算两点间的供给弹性也可用中点法，避免从不同方向计算得到不同的结果。",
    definition:
      "两点间的供给弧弹性可用中点法计算：供给量百分比变化与价格百分比变化之比，二者都使用变化前后数值的平均值作基准。",
    mechanism:
      "中点法消除初始值作为分母带来的方向不对称，正向和反向计算得到相同结果；它同样适用于供给弹性。",
    example:
      "教材例子：价格从2.85美元升到3.15美元，供给量从9,000升到11,000。平均价格3.00美元、平均供给量10,000；价格变化(3.15−2.85)/3.00=10%，供给量变化(11,000−9,000)/10,000=20%，故 Es=20%÷10%=2。",
    model:
      "Es = [(Qs2−Qs1)/((Qs1+Qs2)/2)] / [(P2−P1)/((P1+P2)/2)]。Es=2 表示供给量变化的百分比是价格变化百分比的两倍。",
    misconception:
      "本题采用中点法，两个百分比都应使用中点作基准；初始值法也是一种约定，但正反向结果可能不同，不能混用基准；Es=2 表示百分比反应为2倍，不是供给量增加2个单位。",
    question:
      "价格2.85→3.15美元、供给量9,000→11,000（中点法），供给价格弹性是多少？",
    options: ["2", "0.5", "1"],
    answer: 0,
    explanation: "价格变化10%、供给量变化20%，Es = 20% ÷ 10% = 2。",
  }),
  make({
    id: "supply-elasticity-curves",
    group: "其他需求弹性与供给弹性",
    name: "各种供给曲线",
    english: "Types of Supply Curves",
    intuition: "供给曲线的形态反映供给对价格的反应强度：从完全无弹性到完全有弹性。",
    definition:
      "按供给价格弹性大小，供给曲线分为完全无弹性(Es=0)、缺乏弹性(0<Es<1)、单位弹性(Es=1)、富有弹性(Es>1)和完全有弹性(Es→∞)等类型。",
    mechanism:
      "完全无弹性是竖直曲线（供给量固定）；完全有弹性是水平曲线（在给定价格下可无限供给的理想化）。横轴Q、纵轴P时，斜率为价格对数量的变化率；弹性反映数量与价格百分比变化的比值，两者不是一回事。",
    example:
      "教材图5-5展示供给弹性的五种类型，图5-6说明接近产能上限时供给可能变得更缺乏弹性。项目自设类比：给定场次的座位容量固定时，可用竖直供给近似；水平供给是给定价格附近数量可充分调整的理想化，不由“库存充足”直接推出。",
    model:
      "Es=0：完全无弹性；0<Es<1：缺乏弹性；Es=1：单位弹性；Es>1：富有弹性；Es→∞：完全有弹性。供给曲线的斜率不等于供给弹性。",
    misconception:
      "不能只凭供给曲线看起来陡或平就判断弹性大小；供给弹性同样可能沿一条线性供给曲线随 P/Qs 变化。",
    question: "供给量完全不随价格变化时，供给曲线是？",
    options: ["竖直的完全无弹性曲线", "水平的完全有弹性曲线", "向右下方倾斜"],
    answer: 0,
    explanation: "Es=0 表示供给量固定，曲线为竖直形态。",
  }),
  make({
    id: "agriculture-elasticity",
    group: "弹性的现实应用",
    name: "农业的好消息可能对农民来说是坏消息吗？",
    english: "Can Good News for Farming Be Bad News for Farmers?",
    intuition: "收成更多不一定让全行业收入更多，因为价格也可能下降得更多。",
    definition:
      "当农产品需求相对缺乏弹性时，技术进步使供给增加、价格大幅下降，可能使整个农业行业的销售总收益下降。",
    mechanism:
      "技术进步 → 生产率提高 → 供给曲线右移 → 均衡价格下降、数量增加；需求缺乏弹性时，价格下降的百分比大于数量增加的百分比，P×Q 减少。",
    example:
      "教材图5-7：普遍丰收使农产品供给右移，需求缺乏弹性，行业整体销售收入下降。单个农户增产可能提高自身收入，但全行业普遍增产会压低价格。",
    model:
      "比较 TR0=P0Q0 与 TR1=P1Q1，需假设需求未移动且处于缺乏弹性区间。区分：单个农户增产（个体激励）与全行业普遍增产（市场整体结果）不同。",
    misconception:
      "不能概括为“生产越多越不好”，也不能由全行业收入下降推断每家农户都应减产；结果依赖需求弹性与市场均衡。",
    question: "丰收后数量增加但行业收入下降，可能因为？",
    options: ["需求缺乏弹性，价格降幅较大", "供给没有变化", "销量增加保证利润增加"],
    answer: 0,
    explanation: "价格效应可超过销量效应；还不能由收入直接判断利润。",
  }),
  make({
    id: "oil-elasticity",
    group: "弹性的现实应用",
    name: "为什么石油输出国组织不能保持石油的高价格？",
    english: "Why Has OPEC Failed to Keep the Price of Oil High?",
    intuition: "今天出行方式难改变，几年后可以换车、换能源或增加产能。",
    definition:
      "给定供给减少对价格和交易量的影响，取决于需求和供给在短期与长期的弹性差异；OPEC 难以长期维持高油价正是这一逻辑的体现。",
    mechanism:
      "OPEC 协调减产使供给左移；短期内需求与供给都较难调整，价格大幅上涨；长期内消费者改用替代能源、减少石油使用，非OPEC生产者扩大供给，削弱了维持高油价的能力。",
    example:
      "教材图5-8：同样的供给减少，短期曲线较陡（缺乏弹性）涨价明显，长期曲线较平（更有弹性）涨价缓和。",
    model:
      "供给收缩幅度相同、其他条件可比时，价格影响同时取决于需求弹性和供给弹性；短期缺乏弹性、长期更有弹性。",
    misconception:
      "不能仅凭短期涨价推断长期价格；也不能忽略非减产方的供给反应与消费者的长期替代。",
    question: "为什么减产的长期价格影响可能小于短期？",
    options: ["长期没有需求", "消费者和其他生产者能更多调整", "价格永远固定"],
    answer: 1,
    explanation: "需求替代与其他供给扩张增加了调整空间。",
  }),
  make({
    id: "drug-policy-elasticity",
    group: "弹性的现实应用",
    name: "禁毒增加还是减少了与毒品相关的犯罪？",
    english: "Does Drug Interdiction Increase or Decrease Drug-Related Crime?",
    intuition:
      "让一种有害品更难生产，和让人更少想买，不一定产生相同的价格与数量结果。",
    definition:
      "打击供应与减少需求两种禁毒政策，在需求缺乏弹性时会对价格和毒品相关犯罪产生不同影响；这是供求模型的应用。",
    mechanism:
      "执法打击使供给左移→价格升、数量降，但需求缺乏弹性时数量下降有限而价格上升较大，毒资总支出可能上升；教育减少需求使需求左移→价格降、数量降，支出通常下降。",
    example:
      "教材图5-9：供应受限推高单价，若部分使用者通过财产犯罪筹措毒资，支出增加可能加剧这类犯罪；有效降低需求可同时压低价格和数量。",
    model:
      "支出=P×Q。供给限制情景假设需求不变且缺乏弹性；教育情景假设供给不变。此为局部市场分析。",
    misconception:
      "不能从价格或总支出直接推断犯罪、健康或政策的总体效果；理论模型结果不是对现实犯罪的无条件实证结论。",
    question: "其他条件不变，有效降低毒品需求通常导致？",
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
  {
    source: "price-elasticity-supply",
    target: "supply-elasticity-calculation",
    type: "prerequisite",
  },
  {
    source: "midpoint-method",
    target: "supply-elasticity-calculation",
    type: "applies_to",
  },
  {
    source: "price-elasticity-supply",
    target: "supply-elasticity-curves",
    type: "prerequisite",
  },
  {
    source: "supply-elasticity-curves",
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
    source: "price-elasticity-demand",
    target: "agriculture-elasticity",
    type: "applies_to",
  },
  {
    source: "price-elasticity-demand",
    target: "drug-policy-elasticity",
    type: "applies_to",
  },
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
