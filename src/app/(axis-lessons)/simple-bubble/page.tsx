"use client";

import { AxisBottom } from "@/components/graph/axis-bottom";
import { AxisLeft } from "@/components/graph/axis-left";
import { extent, min, scaleLinear, scaleSqrt } from "d3";

// 1. Access the data
type Datum = {
  x: number;
  y: number;
  size: number;
};

const data: Datum[] = [
  { x: 10, y: 99.7, size: 8 },
  { x: 45, y: 20, size: 10 },
  { x: 80, y: 55, size: 5 },
  { x: 15, y: 97.6, size: 7 },
  { x: 60, y: 40, size: 9 },
  { x: 25, y: 65, size: 6 },
  { x: 70, y: 30, size: 4 },
  { x: 50, y: 85, size: 11 },
  { x: 35, y: 10, size: 12 },
  { x: 95, y: 50, size: 8 },
  { x: 96.2, y: 50, size: 8 },
  { x: 98.9, y: 50, size: 8 },
];

type Dimensions = {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  boundedWidth?: number;
  boundedHeight?: number;
};

export default function SimpleBubblePage() {
  // 2. dimensions
  const xAccessor = (d: Datum): number => d.x;
  const yAccessor = (d: Datum): number => d.y;

  const maxSize: number =
    min([window.innerWidth * 0.9, window.innerHeight * 0.9]) ?? 500;

  let dimensions: Dimensions = {
    width: maxSize,
    height: maxSize,
    margin: {
      top: 30,
      right: 30,
      bottom: 100,
      left: 100,
    },
  };

  // 3. Wrapper and bounds
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // 4. Create scales
  const sizeAccessor = (d: Datum): number => d.size;

  const xScale = scaleLinear()
    .domain([0, 100])
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = scaleLinear()
    .domain([0, 100])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const colorScale = scaleLinear<string>()
    .domain(extent(data, sizeAccessor) as [number, number])
    .range(["#dbeafe", "#1448e7"]);

  const sizeScale = scaleSqrt().domain([4, 12]).range([1, 10]);

  // 5. Draw data (see return)

  // 6. Draw peripherals
  const TICK_LENGTH = 8;

  return (
    <svg width={dimensions.width} height={dimensions.height}>
      <rect
        x={0}
        y={0}
        width={dimensions.width}
        height={dimensions.height}
        fill="lightgrey"
        fillOpacity={0.3}
      />
      <g
        style={{
          transform: `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`,
        }}
      >
        <rect
          x={0}
          y={0}
          width={dimensions.boundedWidth}
          height={dimensions.boundedHeight}
          fill="lightgrey"
        />
        {data.map((datum, i) => {
          return (
            <circle
              key={i}
              cx={xScale(xAccessor(datum))}
              cy={yScale(yAccessor(datum))}
              r={sizeAccessor(datum)}
              fill={colorScale(sizeAccessor(datum))}
            />
          );
        })}
      </g>
      {/* x-axis */}
      <g
        transform={`translate(${dimensions.margin.left}, ${
          dimensions.boundedHeight + dimensions.margin.top
        })`}
      >
        <AxisBottom xScale={xScale} pixelsPerTick={50} title={"X Axis"} />
      </g>
      {/* y-axis */}
      <g
        transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
      >
        <AxisLeft yScale={yScale} pixelsPerTick={50} title={"Y Axis"} />
      </g>
    </svg>
  );
}
