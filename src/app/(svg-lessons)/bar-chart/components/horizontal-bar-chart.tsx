export const HorizontalBarChart = () => {
  return (
    <svg
      style={{ overflow: 'visible' }}
      width={500}
      height={300}
      viewBox="0 0 500 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x={0} y={0} width="400" height="20" fill="grey" />
      <rect x={0} y={25} width="300" height="20" fill="grey" />
      <rect x={0} y={50} width="200" height="20" fill="grey" />
      <rect x={0} y={75} width="100" height="20" fill="grey" />
    </svg>
  )
}
