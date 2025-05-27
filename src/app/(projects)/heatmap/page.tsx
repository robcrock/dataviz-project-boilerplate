"use client";

import * as d3 from "d3";
import { scaleBand } from "d3-scale";
import { useState, useRef } from "react";

export const COLOR_LEGEND_HEIGHT = 60;

const COLORS = [
  "#e7f0fa",
  "#c9e2f6",
  "#95cbee",
  "#0099dc",
  "#4ab04a",
  "#ffd73e",
  "#eec73a",
  "#e29421",
  "#e29421",
  "#f05336",
  "#ce472e",
];

const THRESHOLDS = [0, 0.01, 0.02, 0.03, 0.09, 0.1, 0.15, 0.25, 0.4, 0.5, 1];

// 1. load data
import { data, Dataset } from "./data";
import { ColorLegend } from "@/components/color-legend";

type TTooltipInfo = {
  xPos: number;
  yPos: number;
  year: number;
  value: number | null;
  name: string;
};

export default function HeatMapPage() {
  const [tooltipInfo, setTooltipInfo] = useState<TTooltipInfo | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();

  // 2. define dims
  const dims = {
    width: 650,
    height: 490,
    margin: {
      top: 20,
      right: 20,
      bottom: 40,
      left: 100,
    },
  };

  const boundedWidth = dims.width - dims.margin.right - dims.margin.left;
  const boundedHeight = dims.height - dims.margin.top - dims.margin.bottom;

  // 3. Draw canvas

  // 4. Accessor and scale
  const xAccessor = (d: Dataset[number]) => d.x;
  const years = Array.from(new Set(data.map(xAccessor))).filter(
    (d) => d < 2003
  );
  const xScale = scaleBand<number>()
    .domain(years)
    .range([0, boundedWidth])
    .paddingInner(0.1);

  const yAccessor = (d: Dataset[number]) => d.y;
  const states = Array.from(new Set(data.map(yAccessor)));
  const yScale = scaleBand()
    .domain(states)
    .range([0, boundedHeight])
    .paddingInner(0.1);

  const values = data
    .map((d) => d.value)
    .filter((d): d is number => d !== null);
  const max = d3.max(values) || 0;

  const colorAccessor = (d: Dataset[number]) => d.value;
  const colorScale = d3
    .scaleLinear<string, string>()
    .domain(THRESHOLDS.map((t) => t * max))
    .range(COLORS)
    .unknown("transparent") as d3.ScaleLinear<string, string, never>;

  // 5. Draw data
  const filteredData = data.filter((d) => d.x < 2003);

  // 6. Draw peripherals

  const handleMouseEnter = (d: Dataset[number]) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setTooltipInfo({
      xPos: xScale(xAccessor(d))! + dims.margin.left,
      yPos: yScale(yAccessor(d))! + dims.margin.top,
      year: d.x,
      value: d.value,
      name: d.y,
    });
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setTooltipInfo(null);
    }, 300);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "min-content",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      <svg width={dims.width} height={dims.height}>
        {/* Rects */}
        <g
          style={{
            transform: `translate(${dims.margin.left}px, ${dims.margin.top}px)`,
          }}
        >
          {filteredData.map((d, i) => {
            return (
              <rect
                key={i}
                x={xScale(xAccessor(d))}
                y={yScale(yAccessor(d))}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                fill={colorScale(colorAccessor(d) ?? 0) || "transparent"}
                onMouseEnter={() => handleMouseEnter(d)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
          {/* Y-Axis */}
          {states.map((d, i) => {
            if (i % 2 === 0) {
              return (
                <text
                  key={i}
                  x={-8}
                  y={(yScale(d) ?? 0) + (yScale.bandwidth() ?? 0) / 2}
                  fontSize={10}
                  textAnchor="end"
                  alignmentBaseline="central"
                >
                  {d}
                </text>
              );
            }
          })}
          {/* X-Axis */}
          {years.map((d, i) => {
            if (d % 10 === 0) {
              return (
                <text
                  key={i}
                  x={xScale(d) ?? 0}
                  y={boundedHeight + 12}
                  fontSize={10}
                >
                  {d}
                </text>
              );
            }
          })}
        </g>
      </svg>
      {tooltipInfo && (
        <div
          style={{
            left: `${tooltipInfo.xPos}px`,
            top: `${tooltipInfo.yPos}px`,
            pointerEvents: "none",
            transform: `translate(16px, -50%)`,
            opacity: tooltipInfo ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
          className="absolute text-sm text-slate-500 border border-slate-100 bg-slate-50/90 py-0.5 px-2 rounded-sm flex flex-col gap-0"
        >
          <p>{tooltipInfo.name}</p>
          <div>
            <span>{tooltipInfo.year}: </span>
            <span>
              {tooltipInfo.value !== null
                ? Math.floor(tooltipInfo.value)
                : "N/A"}
            </span>
          </div>
        </div>
      )}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ColorLegend
          height={COLOR_LEGEND_HEIGHT}
          width={200}
          colorScale={colorScale}
          interactionData={tooltipInfo}
        />
      </div>
    </div>
  );
}
