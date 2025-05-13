import { LinearScale } from "./components";

export default function LinearScalePage() {
  return (
    <div className='flex flex-col gap-10 items-center justify-center mt-10'>
      <h1>Linear Scale</h1>
      <div className='border'>
        <LinearScale />
      </div>
    </div>
  )
}
