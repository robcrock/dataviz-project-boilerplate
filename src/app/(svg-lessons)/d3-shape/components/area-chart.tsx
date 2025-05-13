import * as d3 from 'd3-shape'

type TDataPoint = {
  xAxisPosition: number
  y: number
}

type TData = TDataPoint[]

const data = [
  { xAxisPosition: 0, y: 40 },
  { xAxisPosition: 50, y: 70 },
  { xAxisPosition: 100, y: 150 },
  { xAxisPosition: 200, y: 50 },
  { xAxisPosition: 300, y: 250 },
];

export const AreaChart = () => {

  const areaGenerator = d3
    .area<TDataPoint>()
    .x((d) => d.xAxisPosition)
    .y0(() => 300)
    .y1((d) => d.y)

  const pathGenerator = areaGenerator(data)

  return (
    <svg
      style={{ overflow: 'visible' }}
      width={500}
      height={300}
      viewBox="0 0 500 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathGenerator || ''}
        fill="grey"
        // stroke="black"
        strokeWidth={2}
      />
    </svg>
  )
}
