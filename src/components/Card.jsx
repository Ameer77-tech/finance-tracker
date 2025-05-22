import React, { useState } from 'react'

const Card = (props) => {
    const [color, setcolor] = useState(props.color)
  return (
    <div className={`w-[25%] h-60 ${color} rounded-2xl px-5 py-5 text-3xl font-bold`}>
        <h1 className={`${props.color2}`}>Total {props.text}:</h1>
        <h1 className={`ml-5 mt-10 text-6xl ${props.color2}`}>₹10,000</h1>
    </div>
  )
}

export default Card