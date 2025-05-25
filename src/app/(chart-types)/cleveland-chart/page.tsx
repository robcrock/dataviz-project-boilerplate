"use client"

import { scaleBand, scaleLinear } from "d3-scale"
import styles from './graph.module.css'

export const data = [
  { name: "Mark", value1: 90, value2: 72 },
  { name: "Robert", value1: 12, value2: 10 },
  { name: "Emily", value1: 34, value2: 14 },
  { name: "Marion", value1: 53, value2: 24 },
  { name: "Nicolas", value1: 98, value2: 58 },
  { name: "Mélanie", value1: 23, value2: 20 },
  { name: "Gabriel", value1: 18, value2: 10 },
  { name: "Jean", value1: 104, value2: 70 },
  { name: "Paul", value1: 2, value2: 1 },
]

export default function ClevelandChartPage() {

  const dims = {
    height: 500,
    width: 900,
    margin: {
      top: 20,
      right: 20,
      bottom: 60,
      left: 60
    }
  }

  const boundedHeight = dims.height - dims.margin.top - dims.margin.bottom
  const boundedWidth = dims.width - dims.margin.right - dims.margin.left
  
  const maxes = data.map(d => Math.max(d.value1, d.value2))
  const max = Math.max(...maxes)

  const xScale = scaleLinear()
    .domain([0, max])
    .range([0, boundedWidth])

  const yScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, boundedHeight])

  return (
    <svg  width={dims.width} height={dims.height}>
      <g
        className={styles.rowsContainer}
        width={boundedWidth}
        height={boundedHeight}
        transform={`translate(${[dims.margin.left, dims.margin.top].join(',')})`}
      >
        {data.map((d, i) => {
          const y = yScale(d.name) + yScale.bandwidth() / 2
          return (
            <g key={i} className={styles.row}>
              <line 
                x1={xScale(d.value2)} 
                y1={y} 
                x2={xScale(d.value1)} 
                y2={y} 
                opacity={0.7}
                stroke="grey"
                strokeWidth={1} 
              />
              <circle
                cy={y}
                cx={xScale(d.value1)}
                opacity={0.7}
                stroke="#69b3a2"
                fill="#69b3a2"
                strokeWidth={1}
                r={5}
              />
              <circle
                cy={y}
                cx={xScale(d.value2)}
                opacity={0.7}
                stroke="#9d174d"
                fill="#9d174d"
                strokeWidth={1}
                r={5}
              />
              <text
                x={xScale(0) - 8}
                y={y}
                textAnchor="end"
                alignmentBaseline="central"
                fontSize={12}
              >
                {d.name}
              </text>
            </g>
          )
        })}
    </g>
    </svg>
  )
}
