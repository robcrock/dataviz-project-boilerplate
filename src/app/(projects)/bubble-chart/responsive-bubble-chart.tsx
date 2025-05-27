import { useDimensions } from "@/app/hooks/use-dimensions"
import { useRef } from "react"
import { Datum } from "./page"
import { BubbleChart } from "./bubble-chart"

export type ResponsiveDensityChartProps = {
  data: Datum[]
}

export const ResponsiveBubbleChart  = (props: ResponsiveDensityChartProps) => {
  const chartRef = useRef(null)

  const chartSize = useDimensions(chartRef)

  return (
    <div ref={chartRef} className='h-screen'>
      <BubbleChart width={chartSize.width} height={chartSize.height} {...props} />
    </div>
  )
}
