import { Graph } from "./components";

export default function CirclePage() {
  return (
    <div className='flex flex-col gap-10 items-center justify-center mt-10'>
      <h1>Graph Page</h1>
      <Graph />
    </div>
  );
}
