import { useMemo, useState, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { parts, chapters } from "../data/chapters";
import { concepts, relationships, relationLabels } from "../data/concepts";
function MapInner({
  onSelect,
  mastered,
  selected,
}: {
  onSelect: (id: string) => void;
  mastered: string[];
  selected: string;
}) {
  const [part, setPart] = useState(0),
    [chapter, setChapter] = useState(0),
    [query, setQuery] = useState(""),
    [focus, setFocus] = useState(""),
    [crossChapter, setCrossChapter] = useState(false);
  const flow = useReactFlow();
  const data = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    if (part === 0) {
      parts.forEach((p, i) =>
        nodes.push({
          id: `part-${p.id}`,
          position: { x: (i % 4) * 250, y: Math.floor(i / 4) * 140 },
          data: {
            label: `第${p.id}篇 · ${p.title}\n${chapters.filter((c) => c.part === p.id).length}章 · 点击展开`,
          },
          style: {
            background: p.id <= 2 ? "#eef4ec" : "#f7f7f2",
            borderColor: p.id <= 2 ? "#8aac92" : "#d8ded7",
          },
        }),
      );
    } else if (chapter === 0) {
      chapters
        .filter((c) => c.part === part)
        .forEach((c, i) =>
          nodes.push({
            id: `chapter-${c.id}`,
            position: { x: (i % 2) * 300, y: Math.floor(i / 2) * 145 },
            data: {
              label: `第${c.id}章\n${c.title}\n${c.available ? "开放探索 →" : "待开发 · 查看入口"}`,
            },
            style: { background: c.available ? "#eef5ef" : "#f0f0ec" },
          }),
        );
    } else {
      concepts
        .filter((c) => c.chapter === chapter)
        .forEach((c, i) =>
          nodes.push({
            id: c.id,
            position: { x: (i % 3) * 260, y: Math.floor(i / 3) * 150 },
            data: {
              label: `${mastered.includes(c.id) ? "✓ " : ""}${c.name}\n${c.english}`,
            },
            style: {
              background: mastered.includes(c.id)
                ? "#e4f0e6"
                : c.id === selected
                  ? "#e6eef4"
                  : "#fffef9",
              borderColor: c.id === selected ? "#5383a3" : "#b6c9bc",
            },
          }),
        );
      if (crossChapter) {
        const currentIds = nodes.map((n) => n.id);
        const otherIds = [
          ...new Set(
            relationships.flatMap((r) =>
              currentIds.includes(r.source) && !currentIds.includes(r.target)
                ? [r.target]
                : currentIds.includes(r.target) &&
                    !currentIds.includes(r.source)
                  ? [r.source]
                  : [],
            ),
          ),
        ];
        otherIds.forEach((id, i) => {
          const concept = concepts.find((c) => c.id === id)!;
          nodes.push({
            id,
            position: {
              x: (i % 3) * 260,
              y: (Math.ceil(currentIds.length / 3) + Math.floor(i / 3)) * 150,
            },
            data: {
              label: `第${concept.chapter}章 · ${concept.name}\n跨章节关联`,
            },
            style: {
              background: "#eef1f7",
              borderColor: "#96acbc",
              borderStyle: "dashed",
            },
          });
        });
      }
      relationships
        .filter(
          (r) =>
            nodes.some((n) => n.id === r.source) &&
            nodes.some((n) => n.id === r.target),
        )
        .forEach((r, i) =>
          edges.push({
            id: `r-${i}`,
            source: r.source,
            target: r.target,
            markerEnd: { type: MarkerType.ArrowClosed, color: "#a4b7ad" },
            label: relationLabels[r.type],
            type: "smoothstep",
            style: { stroke: "#a4b7ad" },
            labelStyle: { fontSize: 10, fill: "#63776d" },
          }),
        );
    }
    return { nodes, edges };
  }, [part, chapter, mastered, selected, crossChapter]);
  useEffect(() => {
    const id = window.setTimeout(() => {
      const node = flow.getNode(focus);
      if (focus && node)
        flow.fitView({ nodes: [node], duration: 400, maxZoom: 1.15 });
      else flow.fitView({ padding: 0.2, duration: 300 });
    }, 80);
    return () => clearTimeout(id);
  }, [part, chapter, focus, flow, crossChapter]);
  const search = () => {
    const found = concepts.find(
      (c) =>
        c.name.includes(query) ||
        c.english.toLowerCase().includes(query.toLowerCase()),
    );
    if (found && query.trim()) {
      setPart(chapters.find((c) => c.id === found.chapter)!.part);
      setChapter(found.chapter);
      setFocus(found.id);
      onSelect(found.id);
    }
  };
  return (
    <>
      <div className="map-toolbar">
        <div>
          <button
            onClick={() => {
              setPart(0);
              setChapter(0);
              setFocus("");
            }}
          >
            全部13篇
          </button>
          {part > 0 && (
            <button
              onClick={() => {
                setChapter(0);
                setFocus("");
              }}
            >
              {" "}
              / {parts[part - 1].title}
            </button>
          )}
          {chapter > 0 && <span> / 第{chapter}章</span>}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        >
          <input
            aria-label="搜索知识点"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索知识点，如：机会成本"
          />
          <button type="submit">定位 ↗</button>
        </form>
      </div>
      {chapter > 0 && (
        <label className="map-cross-toggle">
          <input
            type="checkbox"
            checked={crossChapter}
            onChange={(e) => { setCrossChapter(e.target.checked); setFocus(""); }}
          />{" "}
          显示跨章节关联（虚线边框节点）
        </label>
      )}
      {query &&
        !concepts.some(
          (c) =>
            c.name.includes(query) ||
            c.english.toLowerCase().includes(query.toLowerCase()),
        ) && (
          <p role="status">
            未找到已开放的知识点，请尝试「需求」或「机会成本」。
          </p>
        )}
      <div className="flow-canvas">
        <ReactFlow
          nodes={data.nodes}
          edges={data.edges}
          onNodeClick={(_, n) => {
            if (n.id.startsWith("part-")) {
              setPart(+n.id.slice(5));
              setFocus("");
            } else if (n.id.startsWith("chapter-")) {
              const id = +n.id.slice(8);
              if (chapters[id - 1].available) {
                setChapter(id);
                setFocus("");
              } else onSelect(n.id);
            } else onSelect(n.id);
          }}
          fitView
          minZoom={0.25}
          maxZoom={1.8}
          nodesDraggable={false}
          nodesConnectable={false}
        >
          <Background gap={20} color="#dce3da" />
          <Controls showInteractive={false} />
          <MiniMap maskColor="#edf1eacc" nodeColor="#a4c2b4" />
        </ReactFlow>
      </div>
      <p className="muted">
        拖动空白处平移 · 滚轮或双指缩放 · 点击节点展开 ·
        点击上方面包屑收起。连线文字表示关系。
      </p>
    </>
  );
}
export function KnowledgeMap(props: Parameters<typeof MapInner>[0]) {
  return (
    <ReactFlowProvider>
      <MapInner {...props} />
    </ReactFlowProvider>
  );
}
