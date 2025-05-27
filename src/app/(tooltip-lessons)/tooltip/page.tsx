'use client'

import { TInteractionData, Tooltip } from "@/components/tooltip"
import { useState } from "react"

const TooltipPage = () => {
  const [interactionData, setInteractionData] = useState<TInteractionData | null>(null)

  const dims = {
    width: 400,
    height: 400,
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }
  }

  const boundedWidth = dims.width - dims.margin.right - dims.margin.left
  const boundedHeight = dims.height - dims.margin.top - dims.margin.bottom

  return (
    <div style={{position: 'relative'}}>
      {/* Graph Layer */}
      <svg width={dims.width} height={dims.height}>
        <circle 
          cx={boundedWidth / 2} 
          cy={boundedHeight / 2} 
          r={20}
          onMouseEnter={() => setInteractionData({
            xPos: boundedWidth / 2,
            yPos: boundedHeight / 2,
            xValue: 200,
            yValue: 200,
            name: "hello"
          })}
          onMouseLeave={() => setInteractionData(null)}
        />
      </svg>
      {/* Tooltip Layer */}
      <Tooltip interactionData={interactionData} 
      />
    </div>
  )
}

export default TooltipPage
