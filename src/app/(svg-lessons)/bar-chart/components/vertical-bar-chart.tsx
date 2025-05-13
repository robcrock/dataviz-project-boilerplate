export const VerticalBarChart = () => {
  const height = 300

  return (
    <svg
      style={{ overflow: 'visible' }}
      width={500}
      height={400}
      viewBox="0 0 500 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x={0} y={height - 250} width="20" height={250} fill="grey" />
      <rect x={25} y={height - 200} width="20" height={200} fill="grey" />
      <rect x={50} y={height - 150} width="20" height={150} fill="grey" />
      <rect x={75} y={height - 100} width="20" height={100} fill="grey" />
    </svg>
  )
}
