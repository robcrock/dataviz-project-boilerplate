export const LoopedCircles = () => {

  const circles = Array.from({ length: 10 }, (_, i) => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const r = Math.floor(Math.random() * 20) + 5;
    const fill = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;

    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={r}
        stroke="black"
        strokeWidth={1}
        fill={fill}
        fillOpacity={0.5}
      />
    )
  })

  return (
      <svg style={{overflow: 'visible'}} width={100} height={100}>
        {circles.map(circle => circle)}
      </svg>
  )
}
