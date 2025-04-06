import React from 'react'
import { Button } from "@/components/ui/button"

const dashboard = () => {
  return (
    <>
        <div className='flex flex-row'>
            <div className='w-4/5 h-45 bg-amber-600'/>
            <Button className='absolute'>Click me</Button>
            <div className='w-1/5 h-45 bg-amber-200'/>
        </div>
    </>
  )
}

export default dashboard