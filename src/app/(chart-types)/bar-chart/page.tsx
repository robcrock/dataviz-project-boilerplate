'use client'

import { scaleBand, scaleLinear } from "d3-scale"
import { colors, data } from "../donut-chart/page"
import { Dispatch, SetStateAction } from "react"


type BarChartProps = {
  height: number
  width: number
  hoveredGroup: null | string
  handleHovered: Dispatch<SetStateAction<null>>
}

export default function BarChartPage(props: BarChartProps) {
  const dims = {
    height: props.height,
    width: props.width,
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }
  }

  const boundedHeight = dims.height - dims.margin.top - dims.margin.bottom
  const boundedWidth = dims.width - dims.margin.right - dims.margin.left

  const xAccessor = d => d.value
  const xScale = scaleLinear()
    .domain([0, Math.max(...data.map(xAccessor))])
    .range([0, boundedWidth])

  const yScale = scaleBand()
    .domain(Array.from(new Set(data.map(d => d.name))))
    .range([boundedHeight, dims.margin.bottom])
    .paddingInner(0.1)

  return (
    <svg height={dims.height} width={dims.width}>
      <g style={{transform: `translate(${dims.margin.left}px, ${dims.margin.top}px)`}}>
        {data.map((d, i) => {
          return (
            <rect 
              key={i} 
              x={dims.margin.left} 
              y={yScale(d.name)} 
              height={yScale.bandwidth()} 
              width={xScale(xAccessor(d))} 
              fill={colors[i]}
              fillOpacity={d.name === props.hoveredGroup ? 1 : 0.5} 
              onMouseEnter={() => props.handleHovered(d.name)}
              onMouseLeave={() => props.handleHovered(null)}
            />
          )
        })}
      </g>
    </svg>
  )
}
