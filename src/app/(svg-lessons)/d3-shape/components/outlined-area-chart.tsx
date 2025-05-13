import {line, area} from 'd3-shape'

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

export const OutlinedAreaChart = () => {

  const lineGenerator = line<TDataPoint>()
    .x((d) => d.xAxisPosition)
    .y((d) => d.y);

  const areaGenerator = area<TDataPoint>()
    .x((d) => d.xAxisPosition)
    .y0((d) => 300)
    .y1((d) => d.y);

  return (
    <svg
      style={{ overflow: 'visible' }}
      width={500}
      height={300}
      viewBox="0 0 500 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={areaGenerator(data) || ''}
        fill="grey"
        fillOpacity={0.5}
      />
      <path
        d={lineGenerator(data) || ''}
        fill="none"
        stroke="black"
        strokeWidth={2}
      />
    </svg>
  )
}
