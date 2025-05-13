export const Graph = () => {

  return (
      <svg style={{overflow: 'visible'}} width={500} height={300}>
        <rect width="100%" height="100%" fill="grey" />
        <circle cx="100" cy="100" r="50" stroke="black" strokeWidth={1} fill="yellow" />
        <text x="100" y="100" textAnchor="middle" stroke="black" strokeWidth={0.5} fill="black">Circle</text>
      </svg>
  )
}
