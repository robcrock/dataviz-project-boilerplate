import styles from './styles.module.css'

export type TInteractionData = {
  xPos: number
  yPos: number
  xValue: number
  yValue: number
  name: string
}

type TooltipProps = {
  interactionData: TInteractionData | null
}

export const Tooltip = ({interactionData}: TooltipProps) => {
  if (!interactionData) return null

  const {xPos,
    yPos,
    xValue,
    yValue,
    name,
  } = interactionData

  return (
    <div
      className={styles.tooltip}
      style={{
        left: `${xPos}px`, 
        top: `${yPos}px`,
      }}
      
    >
      <div className='w-full flex justify-center'>
        <b>{name}</b>
      </div>
      <div className='grid grid-cols-2'>
        <div>
          <div>xValue:</div>
          <div>yValue:</div>
        </div>
        <div>
          <div>{xValue}</div>
          <div>{yValue}</div>
        </div>
      </div>
    </div>
  )
}
