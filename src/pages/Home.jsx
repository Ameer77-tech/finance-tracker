import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Header from '../components/Header';
import { Cards } from '../components/Cards';





const Home = () => {
 

  return (
    <>
    <div className='w-full h-full bg-[#242424]'>
     
      <Header/>
      <Cards/>
      
    </div>
    
    </>
  )

}

export default Home