import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale"

const width = 500;
const height = 300;

const data = [
  {
    name: 'kevin',
    group: 'A',
    value: 25,
  },
  {
    name: 'alan',
    group: 'A',
    value: 15,
  },
  {
    name: 'camille',
    group: 'B',
    value: 8,
  },
  {
    name: 'toto',
    group: 'B',
    value: 6,
  },
];

export const BarPlot = () => {

  const xScale = scaleLinear()
    .domain([0, Math.max(...data.map(d => d.value))])
    .range([0, width])
    .nice()
    
  const yScale = scaleBand()
    .domain([...data.map(d => d.name)])
    .range([0, height])
    .padding(0.1)

  const colorScale = scaleOrdinal<string, string>()
    .domain(['A', 'B'])
    .range(['steelblue', 'orange'])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{overflow: 'visible'}}>
      {data.map((d, i) => (
        <g key={i}>
          <rect
            key={i}
            x="0"
            y={yScale(d.name)}
            width={xScale(d.value)}
            height={yScale.bandwidth()}
            fill={colorScale(d.group)}
          />
          <text
            style={{textTransform: 'capitalize' }}
            x={xScale(d.value) + 5}
            y={(yScale(d.name) ?? 0) + yScale.bandwidth() / 2}
            alignmentBaseline="middle"
            fill={colorScale(d.group)}
            fontSize="12"
          >
            {d.name}
          </text>
        </g>
      ))}
    </svg>
  )
}
