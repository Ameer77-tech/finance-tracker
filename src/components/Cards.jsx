import React, { useEffect, useState } from 'react'
import Card from './Card'

export const Cards = (props) => {
  const [current, setcurrent] = useState(0)
  const [income, setincome] = useState(0)
  const [expense, setexpense] = useState(0)

  useEffect(() => {
    const inc = Number(localStorage.getItem("income") || 0)
    const exp = Number(localStorage.getItem("expense") || 0)
    setincome(inc)
    setexpense(exp)
    setcurrent(inc - exp)
  }, [props.refresh])

  const renderButton = (text, color, func) => {
    return (
      <button
        onClick={() => {
          func(text)
        }}
        className={`md:mt-7 bg-[#72e4f7] ${color} text-[#071c1f] font-medium py-1 text-lg cursor-pointer rounded hover:shadow-2xl hover:shadow-[#72e4f7] hover:-translate-y-1 transition-all ease`}
      >
        {text}
      </button>
    )
  }

  return (
    <div className='md:h-auto py-15 grid grid-cols-1 px-5 gap-5 md:w-full md:flex md:justify-evenly md:items-center md:py-15'>
      <Card color="md:[#071c1f]" text="current balance" amount={current} />
      <Card color="md:[#071c1f]" text="total income" btext="add income" amount={income} button={renderButton} textcolor="md:text-[#051718]"  func={props.func} />
      <Card color="md:[#071c1f]" text="total expenses" btext="add expenses" amount={expense} button={renderButton} textcolor="md:text-[#051718]" func={props.func} />
    </div>
  )
}
