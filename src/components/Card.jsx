import React, { useEffect, useState } from 'react'

const Card = (props) => {
  const [color, setcolor] = useState(props.color)
  return (
    <div className={`md:w-[25%]  md:h-60 px-5 py-6 text-xl md:px-5 md:py-5 md:text-2xl ${color} bg-[#071c1f] md:font-bold flex flex-col gap-7 md:shadow-2xl md:rounded-xl`}>
      <h1 className={`${props.color2} uppercase md:w-full font-medium`}> {props.text}:</h1>
      <h1 className={`${props.color2} md:text-5xl text-3xl font-bold`}>₹ {props.amount}</h1>
      {props.button && props.button(props.btext, props.textcolor, props.func)}
    </div>
  )
}

export default Card