"use client";

import * as d3 from "d3";
import style from "./styles.module.css";
import { Dispatch, SetStateAction, useRef } from "react";

export type DataItem = {
  name: string;
  value: number;
};

// 1. access data
export const data: DataItem[] = [
  { name: "Mark", value: 90 },
  { name: "Robert", value: 12 },
  { name: "Emily", value: 34 },
  { name: "Marion", value: 53 },
  { name: "Nicolas", value: 98 },
];

export const colors = [
  "#98abc5",
  "#8a89a6",
  "#7b6888",
  "#6b486b",
  "#a05d56",
].reverse();

type DonutChartProps = {
  height: number
  width: number
  hoveredGroup: null | string
  handleHovered: Dispatch<SetStateAction<null>>
}

export default function DonutChartPage(props: DonutChartProps) {
  const sliceRef = useRef<SVGSVGElement>(null);

  // 2. define dimensions
  const dims = {
    height: props.height,
    width: props.width,
    margin: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    },
  };

  const boundedWidth = dims.width - dims.margin.right - dims.margin.left;
  const boundedHeight = dims.height - dims.margin.top - dims.margin.bottom;

  const radius = Math.min(dims.height, dims.width) / 2 - dims.margin.top;

  // 3. define accessors, scales, and generators
  const valueAccessor = (d: DataItem) => d.value;

  // 3.a. creates our data
  const pieGenerator = d3.pie<DataItem>().value(valueAccessor);
  const pieData = pieGenerator(data).sort((a, b) =>
    d3.descending(a.value, b.value)
  );

  const arcGenerator = d3.arc().cornerRadius(8);
  const shapes = pieData.map((segment, i) => {
    const shapeInfo = {
      innerRadius: 100,
      outerRadius: radius,
      startAngle: segment.startAngle,
      endAngle: segment.endAngle,
    };

    return arcGenerator(shapeInfo);
  });

  return (
    <svg width={dims.width} height={dims.height}>
      <g
        ref={sliceRef}
        className={style.container}
        style={{
          transform: `translate(
              ${(boundedWidth + dims.margin.left) / 2}px, 
              ${(boundedHeight + dims.margin.top) / 2}px
            )`,
        }}
      >
        {shapes.map((d, i) => {
          console.log('data', data[i])
          return (
            <g
              key={i}
              onMouseEnter={() => props.handleHovered(data[i].name)}
              onMouseLeave={() => props.handleHovered(null)}
            >
              <path d={d as string} fill={colors[i]} fillOpacity={data[i].name === props.hoveredGroup ? 1 : 0.5} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
