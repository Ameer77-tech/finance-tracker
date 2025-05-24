import React, { useEffect, useState } from 'react'

const Card = (props) => {

  
    const [color, setcolor] = useState(props.color)
  return (
    <div className={`w-[25%] h-60 ${color}  px-5 py-5 text-2xl font-bold flex flex-col gap-7`}>
        <h1 className={`${props.color2} uppercase w-full`}> {props.text}:</h1>
        <h1 className={`${props.color2} text-5xl`}>{props.amount}</h1>
       {props.button && props.button(props.btext,props.textcolor,props.func)}
    </div>
  )
}

export default Card