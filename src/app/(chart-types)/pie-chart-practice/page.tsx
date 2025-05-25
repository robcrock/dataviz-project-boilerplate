'use client'

import * as d3 from 'd3'
import style from './styles.module.css'
import { useRef } from 'react';

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
]

const colors = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56'].reverse();

export default function PieChartPracticePage() {
  const sliceRef = useRef<SVGSVGElement>(null)
  
  // 2. define dimensions
  const dims = {
    height: 500,
    width: 500,
    margin: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    }
  }

  const boundedWidth = dims.width - dims.margin.right - dims.margin.left
  const boundedHeight = dims.height - dims.margin.top - dims.margin.bottom

  const radius = Math.min(dims.height, dims.width) / 2 - dims.margin.top

  // 3. define accessors, scales, and generators
  const valueAccessor = d => d.value

  // 3.a. creates our data
  const pieGenerator = d3.pie().value(valueAccessor)
  const pieData = pieGenerator(data)
    .sort((a, b) => d3.descending(a.value, b.value))

  const arcGenerator = d3.arc().cornerRadius(8)
  const shapes = pieData.map((segment, i) => {
    const shapeInfo = {
      innerRadius: 100,
      outerRadius: radius,
      startAngle: segment.startAngle,
      endAngle: segment.endAngle,
    }

    return arcGenerator(shapeInfo)
  })

  return (
    <svg width={dims.width} height={dims.height}>
      <g 
        ref={sliceRef} 
        className={style.container}
        style={{
          transform: 
            `translate(
              ${(boundedWidth + dims.margin.left) / 2}px, 
              ${(boundedHeight + dims.margin.top) / 2}px
            )`
        }}
      >
        {shapes.map((d, i) => {
          return (
            <g
              key={i}
              className={style.slice}
              onMouseEnter={() => {
                if (sliceRef.current) {
                  sliceRef.current.classList.add(style.hasHighlight);
                }
              }}
              onMouseLeave={() => {
                if (sliceRef.current) {
                  sliceRef.current.classList.remove(style.hasHighlight);
                }
              }}
            >
              <path
                d={d as string}
                fill={colors[i]}
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
