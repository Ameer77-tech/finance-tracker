import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';




const Header = () => {
     const [name, setname] = useState("")
  const [show, setshow] = useState(false)
  useEffect(() => {

  setname(JSON.parse(localStorage.getItem("name")))
    
  }, [])
  
  const logout = ()=>{
    localStorage.setItem("login",false)
    window.location.reload()
  }
  return (
     <div className='h-auto w-full bg-linear-to-br to-black from-red-800 shadow-xl shadow-black rounded flex justify-between items-center p-10'>
        <h1 className='text-3xl'>Hello👋<br></br><span className='font-bold tracking-wider'>{name}</span></h1>
        <div className='flex justify-evenly items-center w-40 font-mono font-medium cursor-pointer text-xl bg-slate-900 py-3 px-3 rounded hover:bg-slate-600 transition-all ease select-none relative group'
        onClick={()=>{setshow(!show)}}
        >Profile <motion.span
             animate={{ rotate: show ? -180 : 0 }}
             transition={{ duration: 0.3 }}
              >
             <FaChevronDown />
            </motion.span>
            <AnimatePresence>
           { show &&
             <motion.div 
             initial={{
              opacity:0,
              y:-10
             }}
             animate={{
              opacity:1,
              y:0
             }}
             
             exit={{
              opacity:0,
              y:-10
             }}
             className='absolute h-auto w-90 bg-white top-[120%] text-gray-800 text-lg px-5 -left-50 py-5 flex flex-col gap-3 justify-evenly rounded-2xl pointer-events-none'>
              <p className='uppercase font-bold tracking-wide'>income - ₹10,000</p>
              <p className='uppercase font-bold tracking-wide'>Expenses - ₹10,000</p>
              <div className='bg-gray-900 hover:bg-gray-800 px-3 py-2 -ml-3 rounded-xl cursor-pointer pointer-events-auto uppercase font-bold text-red-500'>Reset Data</div>
               <div 
               onClick={()=>{logout()}}
               className='bg-gray-900 hover:bg-gray-800 px-3 py-2 -ml-3 rounded-xl cursor-pointer pointer-events-auto uppercase font-bold text-red-500'>logout</div>
            </motion.div>
           }
           </AnimatePresence>
            </div>
      </div>
  )
}

export default Header