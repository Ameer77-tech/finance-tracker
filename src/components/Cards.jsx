import React, { useEffect } from 'react'
import Card from './Card'


export const Cards = (props) => {
  
    const renderButton = (text,color,func)=>{
      return(
        <button 
        onClick={()=>{
          func(text)
        }}
        className={`mt-7 bg-white ${color} font-medium py-1 text-lg cursor-pointer rounded hover:bg-gray-200`}>{text}</button>
      )
    }
    
  return (
    <div className='h-auto w-full flex justify-evenly items-center py-15'>
        <Card color="bg-white" text="current balance" color2="text-black"/>
           <Card color="bg-green-600" text="total income" btext="add income" button={renderButton} textcolor="text-emerald-600" func={props.func}/>
              <Card color="bg-red-600" text="total expenses" btext="add expenses" button={renderButton} textcolor="text-red-600" func={props.func}/>
    </div>
  )
}
