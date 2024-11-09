import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loader() {
  return (
    <div className='min-w-full min-h-full w-full h-full flex justify-center items-center'>
      <Loader2 className="animate-spin" />
    </div>
  )
}
