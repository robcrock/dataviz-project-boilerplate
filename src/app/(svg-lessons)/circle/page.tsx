import { OneCircle, TwoCircles, ThreeCircles, LoopedCircles } from "./components";

export default function CirclePage() {
  return (
    <div className='flex flex-col gap-10 items-center justify-center mt-10'>
      <h1>Circle Page</h1>
      <OneCircle />
      <TwoCircles />
      <ThreeCircles />
      <LoopedCircles />
    </div>
  );
}
