import { scaleLinear } from "d3-scale"

export const LinearScale = () => {
  const MARGIN = 20
  const PADDING = 8
  const WIDTH = 500

  
  const xScale = scaleLinear()
    .domain([0, 100])
    .range([MARGIN, (WIDTH - PADDING) / 2])

  return (
    <svg width="500" height="100">
      <rect x={WIDTH / 2 - xScale(32)} y={0} width={xScale(32)} height="20" fill="grey" />
      <rect x={WIDTH / 2 - xScale(55)} y={25} width={xScale(55)} height="20" fill="grey" />
      <rect x={WIDTH / 2 - xScale(87)} y={50} width={xScale(87)} height="20" fill="grey" />

      <rect x={250 + PADDING} y={0} width={xScale(12)} height="20" fill="grey" />
      <rect x={250 + PADDING} y={25} width={xScale(43)} height="20" fill="grey" />
      <rect x={250 + PADDING} y={50} width={xScale(98)} height="20" fill="grey" />
    </svg>
  )
}
