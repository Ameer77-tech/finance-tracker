import React, { useEffect, useState } from 'react'
import Card from './Card'



export const Cards = (props) => {
  const [current, setcurrent] = useState(0)
  const [income, setincome] = useState(0)
  const [expense, setexpense] = useState(0)
    useEffect(() => {
      const inc =  localStorage.getItem("income") || 0
      const exp =  localStorage.getItem("expense") || 0
    setincome(inc)
    setexpense( exp )
    setcurrent(()=>{return (inc - exp)}) 
    console.log(current)
    
  }, [props.refresh])
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
        <Card color="bg-white" text="current balance" color2="text-black" amount={current}/>
           <Card color="bg-green-600" text="total income" btext="add income" amount={income} button={renderButton} textcolor="text-emerald-600" func={props.func}/>
              <Card color="bg-red-600" text="total expenses" btext="add expenses" amount={expense} button={renderButton} textcolor="text-red-600" func={props.func}/>
    </div>
  )
}
