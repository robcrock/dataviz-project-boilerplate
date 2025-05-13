import { AreaChart, LineChart, MutliLineChart, OutlinedAreaChart } from "./components"

export default function D3ShapePage() {
  return (
    <div className='flex flex-col gap-10 items-center justify-center mt-10'>
      <h1>D3 Shape</h1>
      <MutliLineChart />
      <LineChart />
      <OutlinedAreaChart />
      <AreaChart />
    </div>
  )
}
