'use client'

import { useState } from "react";
import BarChartPage from "../bar-chart/page";
import DonutChartPage from "../donut-chart/page";

export default function ComboChartPage() {
  const [hoveredGroup, setHoveredGroup] = useState(null)

  return (
    <div className='h-screen flex'>
      <BarChartPage height={350} width={400} handleHovered={setHoveredGroup} hoveredGroup={hoveredGroup} />
      <DonutChartPage height={400} width={400} handleHovered={setHoveredGroup} hoveredGroup={hoveredGroup} />
    </div>
  )
}
