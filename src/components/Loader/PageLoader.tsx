'use client'
import { InfinitySpin } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <InfinitySpin
        height={80}
        width={80}
        color="green"
        ariaLabel="infinity-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}
