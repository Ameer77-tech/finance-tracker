import React, { useEffect, useState } from 'react'

const Card = (props) => {
  const [color, setcolor] = useState(props.color)
  return (
    <div className={`md:w-[25%] md:h-60 md:px-5 md:py-5 md:text-2xl ${color} md:bg-[#071c1f] md:font-bold md:flex md:flex-col md:gap-7 md:shadow-2xl md:rounded-xl`}>
      <h1 className={`${props.color2} md:uppercase md:w-full`}> {props.text}:</h1>
      <h1 className={`${props.color2} md:text-5xl`}>{props.amount}</h1>
      {props.button && props.button(props.btext, props.textcolor, props.func)}
    </div>
  )
}

export default Card