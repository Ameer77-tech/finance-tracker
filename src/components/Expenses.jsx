import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { AnimatePresence, motion } from 'motion/react';

const Expenses = (props) => {
  const type = "expense"
  const [data, setdata] = useState({
    name:"",
    amount:"",
    date:"",
    type:type
  })
  const [errors, setErrors] = useState({})
  
    const add = () => {
    let err = {};
  
    if (data.name.length < 2) {
      err.name = "Name must be at least 2 characters";
    }
    if (!data.amount || Number(data.amount) <= 0) {
      err.amount = "Enter a valid amount";
    }
      if(Number(data.amount) > 100000000) err.amount = "Max Limit - 10crores"
    if (!data.date) {
      err.date = "Date is required";
    }
  
    setErrors(err);
  
   if (Object.keys(err).length === 0) {
    const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
    const existingExpense =parseFloat(localStorage.getItem("expense")) || 0;
    const expense = existingExpense + parseFloat(data.amount) 
    existing.push(data);
    localStorage.setItem("transactions", JSON.stringify(existing));
    localStorage.setItem("expense",expense)
    props.onSuccess()
    setdata({ name:"", amount:"", date:"" });
    setErrors({});
  }
  }

  const handleChange = (e)=>{
  const {name,value} = e.target
    setdata({
      ...data,
      [name]:value
    })

     let err = { ...errors }
    if (name === "name") {
      err.name = value.length < 2 ? "Name must be at least 2 characters" : ""
    }
    if (name === "amount") {
      err.amount = !value || Number(value) <= 0 ? "Enter a valid amount" : ""
    }
    if (name === "date") {
      err.date = !value ? "Date is required" : ""
    }
    setErrors(err)
}



  return (
     <motion.div 
     initial={{ opacity: 0, scale: 0.8,x:200 }}
      animate={{ opacity: 1, scale: 1,x:0 }}
      exit={{ opacity: 0, scale: 0.2,x:300 }}
      transition={{ease:'anticipate'}}
     className='absolute p-5 bg-white w-1/4 h-2/4 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 scale-130 rounded-xl z-10 shadow-2xl shadow-black flex flex-col justify-between'>
          <div className='w-full flex justify-between items-center'>  <h1 className='uppercase text-black font-medium'>ADD EXPENSE</h1> 
          <FaTimes className='text-black hover:bg-red-500 cursor-pointer transition-all ease rounded-full p-1 w-6 h-6'
           onClick={()=>{
        props.func()
      }}
          />
          </div>
          <div className='h-3/4 flex flex-col justify-evenly'>
                <input 
                value={data.name} name='name' 
                onChange={(e)=>handleChange(e)}
                type="text" placeholder='Enter name' className='placeholder:text-gray-600 text-sm font-semibold text-black border-b-2 border-b-gray-600 outline-0 hover:shadow-xs focus:shadow-xs transition-all ease focus:shadow-cyan-700  hover:shadow-cyan-700 px-2 py-1 rounded-xl'></input>
                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                <input 
                value={data.amount} name='amount' 
                onChange={(e)=>handleChange(e)}
                type="number" placeholder='Enter Amount*' className='placeholder:text-gray-600 text-sm font-semibold text-black border-b-2 border-b-gray-600 outline-0 hover:shadow-xs focus:shadow-xs transition-all ease focus:shadow-cyan-700  hover:shadow-cyan-700 px-2 py-1 rounded-xl'></input>
                {errors.amount && <span className="text-red-500 text-xs">{errors.amount}</span>}
                <input 
                value={data.date} name='date' 
                onChange={(e)=>handleChange(e)}
                type="date" placeholder='Enter Date' className=' placeholder:text-gray-600 text-sm font-semibold text-black border-b-2 border-b-gray-600 outline-0 hover:shadow-xs focus:shadow-xs transition-all ease focus:shadow-cyan-700  hover:shadow-cyan-700 px-2 py-1 rounded-xl'></input>
                {errors.date && <span className="text-red-500 text-xs">{errors.date}</span>}
          </div>
          <button 
          onClick={()=>add()}
          className='text-white font-bold text-sm bg-red-600 rounded-2xl py-1 cursor-pointer hover:bg-red-500 transition-all ease'>ADD</button>
        </motion.div>
  )
}

export default Expenses