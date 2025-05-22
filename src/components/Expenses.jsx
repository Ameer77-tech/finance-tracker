import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { AnimatePresence, motion } from 'motion/react';

const Expenses = (props) => {
  return (
     <motion.div 
     initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
     className='absolute p-5 bg-white w-1/4 h-2/4 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 scale-130 rounded-xl z-10 shadow-2xl shadow-black flex flex-col justify-between'>
          <div className='w-full flex justify-between items-center'>  <h1 className='uppercase text-black font-medium'>ADD EXPENSE</h1> 
          <FaTimes className='text-black hover:bg-red-500 cursor-pointer transition-all ease rounded-full p-1 w-6 h-6'
           onClick={()=>{
        props.func()
      }}
          />
          </div>
          <div className='h-3/4 flex flex-col justify-evenly'>
                <input type="text" placeholder='Enter name' className='placeholder:text-gray-600 text-sm font-semibold text-black border-b-2 border-b-gray-600 outline-0 hover:shadow-xs focus:shadow-xs transition-all ease focus:shadow-cyan-700  hover:shadow-cyan-700 px-2 py-1 rounded-xl'></input>
                <input type="number" placeholder='Enter Amount*' className='placeholder:text-gray-600 text-sm font-semibold text-black border-b-2 border-b-gray-600 outline-0 hover:shadow-xs focus:shadow-xs transition-all ease focus:shadow-cyan-700  hover:shadow-cyan-700 px-2 py-1 rounded-xl'></input>
                <input type="date" placeholder='Enter Date' className=' placeholder:text-gray-600 text-sm font-semibold text-black border-b-2 border-b-gray-600 outline-0 hover:shadow-xs focus:shadow-xs transition-all ease focus:shadow-cyan-700  hover:shadow-cyan-700 px-2 py-1 rounded-xl'></input>
          </div>
          <button className='text-white font-bold text-sm bg-red-600 rounded-2xl py-1 cursor-pointer hover:bg-red-500 transition-all ease'>ADD</button>
        </motion.div>
  )
}

export default Expenses