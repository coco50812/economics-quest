import { useId } from "react";
type Point = { quantity: number; price: number; label: string; color?: string };
export function ExperimentChart({
  title,
  curves,
  points = [],
  qMax = 140,
  pMax = 8,
  priceLine,
  area,
}: {
  title: string;
  curves: { label: string; color: string; q: (p: number) => number }[];
  points?: Point[];
  qMax?: number;
  pMax?: number;
  priceLine?: { price: number; label: string };
  area?: { quantity: number; low: number; high: number; color: string };
}) {
  const clipId = useId().replace(/:/g, "");
  const plottedPoints = points
    .filter((p, i) => points.findIndex(q => q.quantity === p.quantity && q.price === p.price) === i)
    .map(p => points.filter(q => q.quantity === p.quantity && q.price === p.price).length > 1
      ? {...p, label: `重合点 (${p.quantity.toFixed(1)}, ${p.price.toFixed(1)})`}
      : p);
  const x = (q: number) => 50 + (q / qMax) * 460,
    y = (p: number) => 300 - (p / pMax) * 250;
  return (
    <div className="chart-panel">
      <svg viewBox="0 0 570 360" role="img" aria-label={title}>
        <defs>
          <clipPath id={clipId}>
            <rect x="50" y="50" width="460" height="250" />
          </clipPath>
        </defs>
        <text x="12" y="23">
          价格 P（元）
        </text>
        <text x="408" y="350">
          数量 Q（个/日）
        </text>
        {Array.from({ length: 5 }, (_, i) => i).map((i) => (
          <g key={i}>
            <path
              d={`M50 ${y((i * pMax) / 4)}H510 M${x((i * qMax) / 4)} 50V300`}
              stroke="#e4eade"
              strokeWidth="1"
            />
            <text x="25" y={y((i * pMax) / 4) + 4}>
              {((i * pMax) / 4).toFixed(0)}
            </text>
            <text x={x((i * qMax) / 4) - 8} y="322">
              {((i * qMax) / 4).toFixed(0)}
            </text>
          </g>
        ))}
        <path d="M50 40V300H520" stroke="#819781" fill="none" />
        <g clipPath={`url(#${clipId})`}>
          {area && (
            <rect
              x="50"
              y={y(area.high)}
              width={x(area.quantity) - 50}
              height={y(area.low) - y(area.high)}
              fill={area.color}
              opacity=".16"
            />
          )}
          {curves.map((c) => (
            <polyline
              key={c.label}
              points={Array.from({ length: 401 }, (_, i) => {
                const p = (i * pMax) / 400;
                return `${x(c.q(p))},${y(p)}`;
              }).join(" ")}
              fill="none"
              stroke={c.color}
              strokeWidth="3"
            />
          ))}
          {priceLine && (
            <path
              d={`M50 ${y(priceLine.price)}H510`}
              fill="none"
              stroke="#bc9653"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          )}
          {plottedPoints.map((point, i) => (
            <g key={i}>
              <path
                d={`M50 ${y(point.price)}H${x(point.quantity)}V300`}
                fill="none"
                stroke={point.color || "#b89553"}
                strokeDasharray="3 4"
              />
              <circle
                cx={x(point.quantity)}
                cy={y(point.price)}
                r="5"
                fill={point.color || "#b89553"}
                stroke="#fffef6"
                strokeWidth="2"
              />
            </g>
          ))}
        </g>
        {plottedPoints.map((point, i) => (
          <text
            key={i}
            x={Math.min(440, x(point.quantity) + 9)}
            y={Math.max(45, y(point.price) - 9)}
            fill={point.color || "#957544"}
          >
            {point.label}
          </text>
        ))}
        {priceLine && (
          <text x="350" y={y(priceLine.price) - 8} fill="#957544">
            {priceLine.label}
          </text>
        )}
      </svg>
      <div className="chart-legend">
        {curves.map((c) => (
          <span key={c.label} style={{ color: c.color }}>
            ● {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
