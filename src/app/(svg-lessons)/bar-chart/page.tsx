import { HorizontalBarChart, VerticalBarChart } from "./components";

export default function BarChartPage() {
  return (
    <div className='flex flex-col gap-10 items-center justify-center mt-10'>
      <h1>Circle Page</h1>
      <VerticalBarChart />
      <HorizontalBarChart />
    </div>
  );
}
