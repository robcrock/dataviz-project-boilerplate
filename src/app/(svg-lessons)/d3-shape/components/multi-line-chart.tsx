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

const data2 = [
  { xAxisPosition: 0, y: 140 },
  { xAxisPosition: 50, y: 20 },
  { xAxisPosition: 100, y: 110 },
  { xAxisPosition: 200, y: 150 },
  { xAxisPosition: 300, y: 50 },
];

export const MutliLineChart = () => {

  const lineGenerator = d3
    .line<TDataPoint>()
    .x((d) => d.xAxisPosition)
    .y((d) => d.y)

  const pathGenerator0 = lineGenerator(data)
  const pathGenerator1 = lineGenerator(data2)

  return (
    <svg
      style={{ overflow: 'visible' }}
      width={500}
      height={300}
      viewBox="0 0 500 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={pathGenerator0 || ''}fill="none"stroke="red"strokeWidth={2} />
      <path d={pathGenerator1 || ''}fill="none"stroke="blue"strokeWidth={2} />
    </svg>
  )
}
