import { AreaChart, LineChart } from "./components";

export default function LineChartPage() {
  return (
    <div className='flex flex-col gap-10 items-center justify-center mt-10'>
      <h1>Line Chart Page</h1>
      <LineChart />
      <AreaChart />
    </div>
  )
}
