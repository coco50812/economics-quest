import type { Concept, Relationship } from "./types";

const make = (c: Omit<Concept, "chapter">): Concept => ({
  ...c, chapter: 3,
  provenance: "依据第7版微观第3章编写的原创教学摘要与练习，非教材原文；Frank、Rose案例主要数据已本地核对。",
});

export const chapter3Concepts: Concept[] = [
  make({
    id: "ch3-interdependence",
    group: "相互依存与专业化",
    name: "相互依存与贸易的好处",
    english: "Interdependence and the Gains from Trade",
    intuition:
      "一个人不可能也不必要亲自生产自己需要的一切。把时间投入不同活动，再通过交换获得所需，往往比事事亲力亲为更划算。",
    definition:
      "经济相互依存是指个人、家庭、企业和国家的生产与消费彼此依赖；专业化与贸易让人们集中从事自己相对擅长的活动，再通过交换获得更丰富的消费组合，从而产生贸易收益。",
    mechanism:
      "生产者的生产能力与机会成本不同 → 各自专业化生产 → 通过交换互通有无 → 消费选择扩大。这是本章后续推理的主线。",
    example:
      "一个人做饭、种菜、修房子各占时间，效率难免参差；多人分工再交换，往往各得所需。教材以两位生产者——农场主 Frank 与牧场主 Rose——都能生产牛肉和土豆为例，引出本章核心问题：当一方生产两种产品都更快时，双方还能从贸易中获益吗？",
    model:
      "推理主线：生产者能力与机会成本不同 → 专业化 → 交换 → 消费选择扩大。判断贸易收益要比较机会成本与交换比例，而非只看谁更高效。",
    misconception:
      "贸易不要求一方样样都比另一方强，也不等于一方获利、另一方必然受损。互利空间来自机会成本差异，而不是简单的效率高低之争。",
    question: "两人分工并交换后都变得更好，最根本的来源是？",
    options: [
      "一方在所有产品上都更高效",
      "两人的机会成本不同，专业化后可通过交换扩大消费",
      "交易中总有价格差让其中一人占便宜",
    ],
    answer: 1,
    explanation:
      "互利来自机会成本差异带来的专业化方向不同，交换条件合适时双方消费组合都能扩大，而非必须一方处处更强或一方吃亏。",
  }),
  make({
    id: "ch3-production-possibilities",
    group: "相互依存与专业化",
    name: "生产可能性与自给自足",
    english: "Production Possibilities and Self-Sufficiency",
    intuition:
      "每个人一天可用于生产的时间有限，把时间投入一种产品，就少了生产另一种产品的时间；没有贸易时，能生产多少，才能消费多少。",
    definition:
      "生产可能性边界表示在给定资源和时间下，两种产品各种可能产量组合的边界；自给自足时，消费组合等于自己的生产组合，受到个人生产能力的约束。",
    mechanism:
      "有限时间在两种产品间分配 → 多产一种就要少产另一种 → 无贸易时消费被生产限制；交换则可能让消费组合超出个人单独生产的边界。",
    example:
      "教材中 Frank 和 Rose 每天工作8小时（单位：盎司）。Frank 产1单位牛肉需60分钟、土豆需15分钟，故最多产8单位牛肉或32单位土豆；Rose 产牛肉需20分钟、土豆需10分钟，故最多产24单位牛肉或48单位土豆。无贸易时，Frank 生产并消费4单位牛肉、16单位土豆，Rose 生产并消费12单位牛肉、24单位土豆，两人时间均恰好用满，消费点都落在各自的生产可能性边界上。",
    model:
      "Frank：8小时=480分钟，最多牛肉=480÷60=8，最多土豆=480÷15=32。Rose：最多牛肉=480÷20=24，最多土豆=480÷10=48。无贸易消费点：Frank 4×60+16×15=480分钟；Rose 12×20+24×10=480分钟，均用满8小时，位于各自边界上。",
    misconception:
      "生产可能性边界上的点表示时间用满的可行组合，不一定是同样合意的组合；无贸易时消费不能超出自己的边界，但贸易后可通过交换突破这一限制。",
    question: "Frank 无贸易时消费4单位牛肉、16单位土豆，这说明什么？",
    options: [
      "他的时间没有用满",
      "自给自足时他的消费组合受个人生产能力限制",
      "他还能再多消费牛肉而不减少土豆",
    ],
    answer: 1,
    explanation:
      "该组合耗时恰好8小时，位于他的生产可能性边界上；无贸易时能消费的就是能生产的，无法同时再多得两种产品。",
  }),
  make({
    id: "ch3-specialization-trade",
    group: "相互依存与专业化",
    name: "专业化与贸易扩大消费机会",
    english: "Specialization and Trade Expand Consumption Possibilities",
    intuition:
      "各自生产自己相对擅长的产品，再交换，双方可能都比自给自足时消费得更多。",
    definition:
      "专业化指生产者把时间集中用于生产某种产品，通过贸易用多余产量交换所需产品，从而让最终消费组合超出各自独立生产的限制。",
    mechanism:
      "先确定生产能力 → 再确定各自适合专业化的产品 → 计算专业化后产量 → 交换 → 计算贸易后消费量 → 与无贸易时比较。关键不是总产量凭空增加，而是分工让双方都能得到更合意的消费组合。",
    example:
      "无贸易时 Frank 消费4牛肉+16土豆，Rose 消费12牛肉+24土豆。专业化后 Frank 8小时全产土豆得32单位，Rose 用6小时产牛肉、2小时产土豆得18牛肉+12土豆。Rose 给 Frank 5牛肉，Frank 给 Rose 15土豆。贸易后：Frank 5牛肉+17土豆（牛肉+1、土豆+1）；Rose 13牛肉+27土豆（牛肉+1、土豆+3），双方都比无贸易时消费更多。",
    model:
      "专业化产量：Frank 土豆32；Rose 牛肉18、土豆12。交换：Rose→Frank 5牛肉，Frank→Rose 15土豆。贸易后消费：Frank 牛肉0+5=5、土豆32−15=17；Rose 牛肉18−5=13、土豆12+15=27。均严格优于无贸易的 (4,16) 和 (12,24)。",
    misconception:
      "不能只看总产量增加就断言双方受益；要展示交换后的消费组合并逐个比较。Rose 并非把全部时间用于牛肉，而是6小时牛肉、2小时土豆。",
    question: "贸易后 Frank 的消费组合是？",
    options: ["5牛肉、17土豆", "4牛肉、16土豆", "8牛肉、32土豆"],
    answer: 0,
    explanation:
      "Frank 生产0牛肉、32土豆，用15土豆换5牛肉，故消费5牛肉、17土豆。",
  }),
  make({
    id: "ch3-absolute-advantage",
    group: "比较优势的逻辑",
    name: "绝对优势",
    english: "Absolute Advantage",
    intuition:
      "谁用更少投入生产同样多的东西，谁就有绝对优势。但绝对优势并不能说明所有东西都该由他来生产。",
    definition:
      "绝对优势指一个生产者用比另一个生产者更少的投入（如时间）生产同样数量的产品，或用相同投入生产更多产品的比较结果。",
    mechanism:
      "比较的是单位产品的投入量或相同投入的产出量；它是效率指标，不直接决定专业化方向。",
    example:
      "教材中，产1单位牛肉 Frank 需60分钟、Rose 需20分钟；产1单位土豆 Frank 需15分钟、Rose 需10分钟。Rose 在牛肉和土豆上用时都更少，因此 Rose 在两种产品上都有绝对优势。",
    model:
      "投入比较：牛肉 60>20，土豆 15>10，Rose 两项都更快。由此引出问题：既然 Rose 两种产品都更高效，Frank 还能从专业化与贸易中获益吗？——关键在于机会成本（下一张卡片）。",
    misconception:
      "绝对优势衡量生产效率或投入差异，不能因此断定所有产品都应由绝对优势方生产；一方处处更高效，也不意味着另一方没有贸易价值。",
    question: "Rose 生产两种产品都比 Frank 快，据此能否断定 Frank 无法从贸易中获益？",
    options: [
      "能，因为 Rose 拥有全部绝对优势",
      "不能，还要比较双方的机会成本",
      "能，因为绝对优势决定生产方向",
    ],
    answer: 1,
    explanation:
      "绝对优势只反映投入效率；比较优势由机会成本决定，Frank 可能在土豆上有比较优势并从中获益。",
  }),
  make({
    id: "ch3-opportunity-cost",
    group: "比较优势的逻辑",
    name: "生产中的机会成本",
    english: "Opportunity Cost in Production",
    intuition:
      "生产一种东西的时间，本来可以用来生产另一种东西；所以它的机会成本，就是放弃的另一种产品的数量。",
    definition:
      "生产某种产品的机会成本，是为了生产它而放弃的另一种产品的数量。在两种产品、单位生产时间固定且时间可自由转用的模型中，两种产品的单位机会成本互为倒数。",
    mechanism:
      "用生产一种产品所需的时间，除以生产一单位另一种产品所需的时间，得到以另一种产品计量的机会成本；结果是数量，不是时间或货币价格。",
    example:
      "Frank 产1牛肉需60分钟，产1土豆需15分钟，故1牛肉的机会成本=60÷15=4土豆，1土豆的机会成本=15÷60=1/4牛肉。Rose 产1牛肉需20分钟，产1土豆需10分钟，故1牛肉的机会成本=20÷10=2土豆，1土豆的机会成本=10÷20=1/2牛肉。",
    model:
      "Frank：1牛肉=4土豆，1土豆=1/4牛肉。Rose：1牛肉=2土豆，1土豆=1/2牛肉。牛肉机会成本（以土豆计）与土豆机会成本（以牛肉计）互为倒数。单位转换：Frank 的60分钟全部改产土豆可得60÷15=4单位土豆。",
    misconception:
      "本例用放弃的另一种产品数量计量机会成本，不能直接拿60分钟代替4单位土豆。机会成本也可用放弃的收入等价值表示，取决于最佳替代用途；它不等于实际支付的货币价格。",
    question: "Rose 生产1单位牛肉的机会成本是多少？",
    options: ["1/2单位土豆", "2单位土豆", "20分钟"],
    answer: 1,
    explanation:
      "Rose 产1牛肉需20分钟，可改产20÷10=2单位土豆，故机会成本为2单位土豆，单位是土豆而非时间。",
  }),
  make({
    id: "ch3-comparative-advantage",
    group: "比较优势的逻辑",
    name: "比较优势",
    english: "Comparative Advantage",
    intuition: "比较优势不是看谁做得更快，而是看谁为了做这件事放弃得更少。",
    definition:
      "如果一个生产者生产某种产品的机会成本低于另一个生产者，他就具有生产该产品的比较优势。",
    mechanism:
      "机会成本不同 → 比较优势不同 → 专业化方向不同 → 总产量和消费机会可能增加 → 通过交换实现互利。",
    example:
      "Frank 产1土豆的机会成本为1/4牛肉，低于 Rose 的1/2牛肉，故 Frank 在土豆上有比较优势；Rose 产1牛肉的机会成本为2土豆，低于 Frank 的4土豆，故 Rose 在牛肉上有比较优势。",
    model:
      "比较 Frank 与 Rose 的牛肉机会成本（4 vs 2土豆）和土豆机会成本（1/4 vs 1/2牛肉）。机会成本更低的一方具有比较优势。两产品、两生产者且机会成本不同时，可据此确定专业化方向；绝对优势可以集中在同一人身上，比较优势则分别落在不同产品上。",
    misconception:
      "比较优势是比较放弃的另一种产品多少，不是比生产速度；一方在某产品上有比较优势，不代表他在其他活动中毫无价值。",
    question:
      "Rose 生产牛肉的机会成本为2土豆、Frank 为4土豆。谁有牛肉的比较优势？",
    options: ["Frank", "Rose", "两人相同"],
    answer: 1,
    explanation:
      "机会成本更低（2<4）的一方具有比较优势，故 Rose 在牛肉上有比较优势。",
  }),
  make({
    id: "ch3-terms-of-trade",
    group: "比较优势的逻辑",
    name: "贸易的价格",
    english: "The Price of Trade",
    intuition:
      "即使双方都愿意贸易，交换比例仍要落在双方机会成本之间，才可能让双方都受益。",
    definition:
      "贸易价格（这里是用土豆表示的牛肉相对价格）是交换比例；只有当它处于双方机会成本之间时，双方才都能从贸易中获益。",
    mechanism:
      "Rose 产1牛肉的机会成本是2土豆，Frank 是4土豆，故互利区间在2到4土豆之间。低于2，Rose 不愿卖牛肉；高于4，Frank 不愿买牛肉。",
    example:
      "以1牛肉换3土豆为例：Rose 自己产1牛肉要放弃2土豆，换得3土豆，比自产更合算；Frank 自产1牛肉要放弃4土豆，用3土豆换1牛肉，比自己生产更省。3落在2和4之间，双方都获益。",
    model:
      "互利条件：Rose 的机会成本（2土豆）≤ 牛肉交换价格 ≤ Frank 的机会成本（4土豆）。边界处一方仅无差异；严格互利要求交换比例严格位于两者之间。价格是用土豆表示的牛肉相对价格，不一定是货币价格。",
    misconception:
      "交换比例落在区间之外会使至少一方不愿交易；不要把这里的“价格”误解为必须用货币支付的市场价。",
    question: "牛肉换土豆的价格为5土豆时，谁会不愿交易？",
    options: [
      "Rose，因为低于她的机会成本",
      "Frank，因为高于他自产牛肉的成本",
      "双方都受益",
    ],
    answer: 1,
    explanation:
      "Frank 自产1牛肉只需放弃4土豆，却要用5土豆去换，不划算；价格高于4已超出他的机会成本，Frank 不愿买。",
  }),
  make({
    id: "ch3-brady-application",
    group: "比较优势的应用",
    name: "Tom Brady 应该自己修剪草坪吗？",
    english: "Should Tom Brady Mow His Own Lawn?",
    intuition:
      "即使某人在每件事上都做得更快，也不意味着他应该每件事都自己做；要看放弃的机会成本。",
    definition:
      "把比较优势应用到时间分配：谁做某件事的机会成本更低，谁就具有该活动的比较优势，专业化与交换可使双方都获益。",
    mechanism:
      "比较的是各自放弃的替代用途价值：修剪草坪的机会成本不是速度，而是为此放弃的其他收入。",
    example:
      "Tom Brady 修剪草坪需2小时，邻居 Forrest Gump 需4小时。Brady 2小时可拍广告赚20,000美元，Forrest 4小时可在麦当劳赚40美元。Brady 修草坪更快（绝对优势），但其机会成本是20,000美元；Forrest 的机会成本是40美元，更低，故 Forrest 在修剪草坪上有比较优势，Brady 在拍广告上有比较优势。",
    model:
      "机会成本：Brady 20,000美元 vs Forrest 40美元。只要协商的报酬严格落在40美元与20,000美元之间，Brady 拍广告、Forrest 修草坪就能让双方都比各自亲为更划算。",
    misconception:
      "拥有绝对优势的人不一定有该项活动的比较优势；结论不能概括为“做得慢的人就该外包”，而要回到机会成本的比较。",
    question: "Brady 修剪草坪比 Forrest 更快，但更该由 Forrest 修剪，原因是什么？",
    options: [
      "Brady 修剪草坪的机会成本更高",
      "Forrest 修剪得更快",
      "Brady 不会修剪",
    ],
    answer: 0,
    explanation:
      "Brady 修草坪要放弃拍广告的20,000美元，机会成本远高于 Forrest 的40美元，故 Forrest 在修草坪上有比较优势。",
  }),
  make({
    id: "ch3-international-trade",
    group: "比较优势的应用",
    name: "美国应该与其他国家进行贸易吗？",
    english: "Should a Country Trade with Other Countries?",
    intuition:
      "国家之间也能通过专业化和交换扩大各自的消费机会，其基础同样是机会成本与比较优势。",
    definition:
      "国际贸易的基础是比较优势：即使一国在多种产品上都有绝对优势，它也不应独自生产所有产品，而应按机会成本较低的方向专业化并与他国交换。",
    mechanism:
      "机会成本差异决定各国专业化方向 → 进口与出口实现交换 → 各方获得比封闭经济更丰富的消费组合；贸易不是零和博弈。",
    example:
      "把 Frank 和 Rose 换成两个国家即可：一国生产牛肉的机会成本更低、另一国生产土豆的机会成本更低，各自专业化再交换，双方消费组合都能超出各自闭关自守时的边界。项目自设教学示例：甲国生产1单位小麦的机会成本为2单位布，乙国为1/2单位布，则乙国在小麦上有比较优势、甲国在布上有比较优势，按介于两者机会成本之间的比例交换，双方都可获益。",
    model:
      "本简化模型假设资源可转用、单位机会成本固定、忽略运输与交易成本。机会成本差异 → 各国专业化方向 → 进口与出口 → 消费组合扩大。国家总体可获益不表示国内每个人都受益，转业成本与收益分配仍需另行分析。即使一国在多种产品上都有绝对优势，也不能据此主张它应自产一切；互利来自比较优势，贸易不是零和博弈。",
    misconception:
      "不能仅凭绝对生产能力就断定一国应闭关自守或必然受损；关税、配额、贸易政策中的赢家与输家将在第9章进一步分析，不属于本章范围。",
    question: "一国在多种产品上都有绝对优势，是否应独自生产所有产品？",
    options: [
      "是，因为绝对优势决定一切",
      "不一定，专业化方向由比较优势决定",
      "是，贸易会让他国受损",
    ],
    answer: 1,
    explanation:
      "绝对优势不决定专业化方向；只要机会成本不同，按比较优势分工并交换仍可使各国获益。",
  }),
];

export const chapter3Relationships: Relationship[] = [
  {
    source: "ch3-interdependence",
    target: "ch3-production-possibilities",
    type: "prerequisite",
  },
  {
    source: "ch3-production-possibilities",
    target: "ch3-specialization-trade",
    type: "prerequisite",
  },
  {
    source: "ch3-specialization-trade",
    target: "ch3-absolute-advantage",
    type: "related",
  },
  {
    source: "ch3-absolute-advantage",
    target: "ch3-opportunity-cost",
    type: "related",
  },
  {
    source: "ch3-opportunity-cost",
    target: "ch3-comparative-advantage",
    type: "prerequisite",
  },
  {
    source: "ch3-comparative-advantage",
    target: "ch3-terms-of-trade",
    type: "prerequisite",
  },
  {
    source: "ch3-comparative-advantage",
    target: "ch3-brady-application",
    type: "applies_to",
  },
  {
    source: "ch3-comparative-advantage",
    target: "ch3-international-trade",
    type: "applies_to",
  },
  { source: "trade", target: "ch3-interdependence", type: "prerequisite" },
  {
    source: "opportunity-cost",
    target: "ch3-opportunity-cost",
    type: "prerequisite",
  },
  {
    source: "opportunity-cost",
    target: "ch3-comparative-advantage",
    type: "applies_to",
  },
];
