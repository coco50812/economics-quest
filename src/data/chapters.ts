export const textbook = {
  id: "mankiw-principles-7-micro",
  edition: "第7版",
  title: "经济学原理：微观经济学分册",
  publisher: "北京大学出版社",
  published: "2015-05",
  author: "N. Gregory Mankiw",
  isbn: "9787301256909",
  source:
    "https://github.com/coco50812/economics-quest/blob/master/README.md#内容来源与边界",
};
const titles = [
  "经济学十大原理",
  "像经济学家一样思考",
  "相互依存性与贸易的好处",
  "供给与需求的市场力量",
  "弹性及其应用",
  "供给、需求与政府政策",
  "消费者、生产者与市场效率",
  "应用：赋税的代价",
  "应用：国际贸易",
  "外部性",
  "公共物品和公共资源",
  "税制的设计",
  "生产成本",
  "竞争市场上的企业",
  "垄断",
  "垄断竞争",
  "寡头",
  "生产要素市场",
  "收入与歧视",
  "收入不平等与贫困",
  "消费者选择理论",
  "微观经济学前沿",
];
export const parts = [
  "导言",
  "市场如何运行",
  "市场和福利",
  "公共部门经济学",
  "企业行为与产业组织",
  "劳动市场经济学",
  "深入研究的论题",
].map((title, i) => ({ id: i + 1, title }));
const boundaries = [3, 6, 9, 12, 17, 20, 22];
export const chapters = titles.map((title, i) => ({
  id: i + 1,
  title,
  part: boundaries.findIndex((n) => i + 1 <= n) + 1,
  available: [1, 4, 5, 6].includes(i + 1),
  textbookId: textbook.id,
}));
