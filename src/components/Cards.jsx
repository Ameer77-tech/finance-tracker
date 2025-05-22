import React, { useEffect } from 'react'
import Card from './Card'


export const Cards = () => {
  
    
    
  return (
    <div className='h-auto w-full flex justify-evenly items-center py-15'>
        <Card color="bg-white" text="Amount" color2="text-black"/>
           <Card color="bg-green-600" text="income"/>
              <Card color="bg-red-600" text="expenses"/>
    </div>
  )
}
