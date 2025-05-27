import { AxisBottom } from "@/components/graph/axis-bottom"
import { AxisLeft } from "@/components/graph/axis-left"
import { extent } from "d3-array"
import { scaleLinear, scaleOrdinal } from "d3-scale"
import { Datum } from "./page"
import { ResponsiveDensityChartProps } from "./responsive-bubble-chart"

import styles from './bubble-chart.module.css'

type BubbleChartProps = ResponsiveDensityChartProps & {
  width: number
  height: number
}

export const BubbleChart = ({data, width, height}: BubbleChartProps) => {
  
    const chartWidth = Math.min(width, height)
    const chartHeight = chartWidth
  
    // 2. Draw dims
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
  
    let dims: Dimensions = {
      width: chartWidth,
      height: chartHeight,
      margin: {
        top: 20,
        right: 20,
        bottom: 200,
        left: 200,
      },
    };
  
    dims.boundedWidth = dims.width - dims.margin.right - dims.margin.left;
    dims.boundedHeight = dims.height - dims.margin.top - dims.margin.bottom;
  
    // 3. Draw canvas
  
    // 4. Draw scales
    const xAccessor = (d: Datum) => d.gdpPercap;
    const xScale = scaleLinear()
      .domain(extent(data, xAccessor) as [number, number])
      .range([0, dims.boundedWidth])
      .nice();
  
    const yAccessor = (d: Datum) => d.lifeExp;
    const yScale = scaleLinear()
      .domain(extent(data, yAccessor) as [number, number])
      .range([dims.boundedHeight, 0])
      .nice();
  
    const sizeAccessor = (d: Datum) => d.pop;
    const sizeScale = scaleLinear()
      .domain(extent(data, sizeAccessor) as [number, number])
      .range([5, 40]);
  
    const colorAccessor = (d: Datum) => d.continent;
    const continents = Array.from(new Set(data.map(colorAccessor)));
    
    const colorScale = scaleOrdinal<string, string>()
      .domain(continents)
      .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);
      
  return (
    <svg width={chartWidth} height={chartHeight}>
      <g
        style={{
          transform: `translate(${dims.margin.left}px, ${dims.margin.top}px)`,
          overflow: "hidden",
        }}
      >
        {/* Define the clipping path */}
        <defs>
          <clipPath id="chart-clip">
            <rect
              x={0}
              y={0}
              width={dims.boundedWidth + 20}
              height={dims.boundedHeight}
            />
          </clipPath>
        </defs>
        {/* Apply clipping to the circles */}
        <g clipPath="url(#chart-clip)">
          {data.map((datum, i) => {
            return (
              <circle
                className={styles.scatterplotCircle}
                key={i}
                cx={xScale(xAccessor(datum))}
                cy={yScale(yAccessor(datum))}
                r={sizeScale(sizeAccessor(datum))}
                fill={colorScale(colorAccessor(datum))}
                fillOpacity="0.25"
                stroke={colorScale(colorAccessor(datum))}
                strokeWidth="1"
              />
            );
          })}
        </g>
        <g style={{ transform: `translate(0px, ${dims.margin.top}px)` }}>
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={50}
            title={"Life expectancy"}
          />
        </g>
        <g
          style={{
            transform: `translate(0px, ${
              dims.boundedHeight + dims.margin.top
            }px)`,
          }}
        >
          <AxisBottom
            xScale={xScale}
            pixelsPerTick={50}
            title={"Gdp per Capita"}
            formatString=","
          />
        </g>
      </g>
    </svg>
  )
}
