"use client";

import * as d3 from "d3";
import { scaleOrdinal } from "d3-scale";
import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";
import { useDimensions } from "@/app/hooks/use-dimensions";

type Datum = {
  name: string;
  value: number;
};

const data: Datum[] = [
  { name: "Mark", value: 90 },
  { name: "Robert", value: 12 },
  { name: "Emily", value: 34 },
  { name: "Marion", value: 53 },
  { name: "Nicolas", value: 98 },
];

export default function PieChartPage() {
  const ref = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null)
  const chartSize = useDimensions(wrapperRef)
  console.log('chartSize', chartSize)
  
  // 6 step approach to creating a chart in D3
  // 1. [x] access data
  // 2. [x] establish dims
  // 3. [x] create accessors & scales
  // 4. [x] draw data
  // 5. draw peripheral
  // 6. interactions

  interface Dimensions {
    height: number;
    width: number;
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    boundedHeight?: number;
    boundedWidth?: number;
  }

  // const size = Math.min(O)
  let dims: Dimensions = {
    width: chartSize.width,
    height: chartSize.height,
    margin: {
      top: 20,
      right: 120,
      bottom: 20,
      left: 120,
    },
  };

  dims.boundedHeight = dims.height - dims.margin.top - dims.margin.bottom;
  dims.boundedWidth = dims.width - dims.margin.left - dims.margin.right;

  const RADIUS =
    Math.min(dims.boundedHeight, dims.boundedWidth) / 2 - dims.margin.top;
  const INFLECTION_PADDING = 5;

  const valueAccessor = (d: Datum) => d.value;

  const colors = [
    "#98abc5",
    "#8a89a6",
    "#7b6888",
    "#6b486b",
    "#a05d56",
  ].reverse();

  // Generators
  const pieGenerator = d3.pie<Datum>().value(valueAccessor);
  const sortedData = data.sort((a, b) => a.value - b.value);
  const pie = pieGenerator(sortedData);

  const arcPathGenerator = d3.arc();
  const shapes = pie.map((arc, i) => {
    console.log("arc", arc);
    // Pie Shapes
    const arcInfo = {
      innerRadius: 0,
      outerRadius: RADIUS,
      startAngle: arc.startAngle,
      endAngle: arc.endAngle,
    };

    const arcPath = arcPathGenerator(arcInfo);

    const arcInfo1 = {
      innerRadius: RADIUS - 10 + INFLECTION_PADDING,
      outerRadius: RADIUS - 10 + INFLECTION_PADDING,
      startAngle: arc.startAngle,
      endAngle: arc.endAngle,
    };
    const centroid = arcPathGenerator.centroid(arcInfo1);

    // Peripherals
    const arcInfo3 = {
      innerRadius: RADIUS + INFLECTION_PADDING,
      outerRadius: RADIUS + INFLECTION_PADDING,
      startAngle: arc.startAngle,
      endAngle: arc.endAngle,
    };
    const inflectionPoint = arcPathGenerator.centroid(arcInfo3);
    const isLabelOnRight = inflectionPoint[0] > 0;
    const labelPosX = inflectionPoint[0] + 50 * (isLabelOnRight ? 1 : -1);
    const textAnchor = isLabelOnRight ? "start" : "end";
    const label = `${arc.data.name} (${arc.value})`;

    return (
      <g
        key={i}
        className={styles.slice}
        onMouseEnter={() => {
          if (ref.current) {
            ref.current.classList.add(styles.hasHighlight);
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.classList.remove(styles.hasHighlight);
          }
        }}
      >
        <path d={arcPath || ""} fill={colors[i] || "black"} />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} />
        <line
          x1={centroid[0]}
          y1={centroid[1]}
          x2={inflectionPoint[0]}
          y2={inflectionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <line
          x1={inflectionPoint[0]}
          y1={inflectionPoint[1]}
          x2={labelPosX}
          y2={inflectionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <text
          x={labelPosX + (isLabelOnRight ? 2 : -2)}
          y={inflectionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
        >
          {label}
        </text>
      </g>
    );
  });

  return (
    <div ref={wrapperRef} className='h-screen'>
      <svg width={dims.width} height={dims.height}>
        <g
          style={{
            transform: `translate(${dims.width / 2}px, ${dims.height / 2}px)`,
          }}
          className={styles.container}
          ref={ref}
        >
          {shapes}
        </g>
      </svg>
    </div>
  );
}
