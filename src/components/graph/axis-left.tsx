import { format, ScaleLinear} from 'd3'

type AxisLeftProps = {
  yScale: ScaleLinear<number, number>
  pixelsPerTick: number;
  title?: string;
  formatString?: string;
}

const TICK_LENGTH = 6

export const AxisLeft = ({yScale, pixelsPerTick, title, formatString = ""}: AxisLeftProps) => {
  const range = yScale.range();

  const height = range[0] - range[1]
  const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

  return (
    <>
    {title && <text textAnchor="end" dominantBaseline="hanging" transform={`translate(${-36}, 0)`}>{title}</text>}
    {/* main horizontal line */}
    <line
      x1={0}
      x2={0}
      y1={range[0]}
      y2={range[1]}
      stroke='currentColor'
      fill='none'
    />
    {/* ticks and labels */}
    {yScale.ticks(numberOfTicksTarget).map((value) => {
      return (
        <g 
          key={value}
          transform={`translate(0, ${yScale(value)})`}
        >
          <line x2={-TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translate(-16px, 3px)',
            }}
          >
            {format(formatString)(value)}
          </text>
        </g>
      )
    })}
    </>
  )
}
