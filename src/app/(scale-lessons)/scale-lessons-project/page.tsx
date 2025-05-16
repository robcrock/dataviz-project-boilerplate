'use client'

import { useEffect, useState } from 'react'
import * as d3 from "d3"
import { scaleBand, scaleLinear } from 'd3'

type TInfectionData = {
  infection: string
  count: number
}
export default function ProjectPage() {
  const [data, setData] = useState<TInfectionData[]>([])
  
  // 1. Access Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataset: TInfectionData[] = await d3.json('/data/infections.json') ?? []
        
        console.table(dataset)
        setData(dataset)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchData()
  }, [])

  const xAccessor = d => d.count

  // 2. Create dimensions
  let dimensions = {
    width: 700,
    height: 500,
    margin: {
      top: 16,
      right: 0,
      bottom: 0,
      left: 4,
    }
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // 3. Add the SVG to the screen

  // 4. Create the scales
  const xScale = scaleLinear()
    .domain([0, d3.max(data, xAccessor)])
    .range([0, 700])
  
  const yScale = scaleBand()
    .domain([...data.map(d => d.infection)])
    .range([0, 500])
    .padding(0.5)

  // 5. Draw Data

  // 6. Draw peripherals
  console.log(xScale.ticks(10))

  return (
    <div className='container h-screen flex justify-center items-center'>
      <div className='w-[700px] h-[500px]'>
        <header className='w-full border-t-2 border-red-500 relative'>
          <div className='absolute w-10 h-2 bg-red-500' />
          <h1 className='mt-4 text-2xl font-semibold'>Escape artists</h1>
        </header>
        <svg width={dimensions.width} height={dimensions.height}>
          <g style={{
            transform: `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`}}>
            {xScale.ticks().map((tick, i) => {
              console.log(tick.toString().length)
              const dx = tick.toString().length === 1 ? -4 : -6
              return <text key={i} x={xScale(tick)} dx={dx} dy={-4} y={0} fill="#808080" style={{fontSize: '12px'}}>{tick}</text>
            })}
            
            {/* Lines */}
            <line x1={0} x2={0} y1={0} y2={dimensions.height} stroke={'black'} strokeWidth='1px' />
            {xScale.ticks().map((tick: number, i: number) => {
              return <line key={i} x1={xScale(tick)} x2={xScale(tick)} y1={0} y2={dimensions.height} stroke='grey' strokeOpacity={0.3}/>
            })}
            {/* Bars */}
            {data.map((d, i) => {
              return (
                <rect key={i} x={0} y={yScale(d.infection)} height={yScale.bandwidth()} width={xScale(d.count)} fill={'#076fa2'} />
              )
            })}
          </g>
        </svg>
        <footer>
          <p className='-mb-4 text-gray-400 text-sm'>Sources: Laboratory-Acquired Infection Database; American Biological Safety Association</p>
          <p className='text-gray-400 text-sm'>The Economist</p>
        </footer>
      </div>
    </div>
  )
}
