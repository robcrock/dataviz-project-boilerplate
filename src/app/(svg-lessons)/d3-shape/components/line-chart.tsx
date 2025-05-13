import { scaleLinear } from 'd3-scale'
import {line} from 'd3-shape'

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

export const LineChart = () => {
  const xScale = scaleLinear()
    .domain([0, 100])
    .range([0, 500])

  const yScale = scaleLinear()
    .domain([0, 100])
    .range([300, 0])

  console.log('xScale', xScale(50))
  console.log('yScale', yScale(50))

  const lineGenerator = line<TDataPoint>()
    .x((d) => d.xAxisPosition)
    .y((d) => d.y)

  const pathGenerator = lineGenerator(data)

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
        fill="none"
        stroke="black"
        strokeWidth={2}
      />
    </svg>
  )
}
