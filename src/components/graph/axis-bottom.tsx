import { ScaleLinear} from 'd3'

type AxisBottomProps = {
  xScale: ScaleLinear<number, number>
  pixelsPerTick: number;
  title?: string
}

const TICK_LENGTH = 6

export const AxisBottom = ({xScale, pixelsPerTick, title}: AxisBottomProps) => {
  const range = xScale.range();

  const width = range[1] - range[0]
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

  return (
    <>
    {title &&<text dominantBaseline="hanging" textAnchor='end' transform={`translate(${range[1]}, 32)`}>{title}</text>}
    {/* main horizontal line */}
    <line
      x1={range[0]}
      x2={range[1]}
      y1={0}
      y2={0}
      stroke='currentColor'
      fill='none'
    />
    {/* ticks and labels */}
    {xScale.ticks(numberOfTicksTarget).map((value) => {
      return (
        <g 
          key={value}
          transform={`translate(${xScale(value)}, 0)`}
        >
          <line y2={TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            {value}
          </text>
        </g>
      )
    })}
    </>
  )
}
