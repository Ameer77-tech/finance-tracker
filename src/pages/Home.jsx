import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Header from '../components/Header';
import { Cards } from '../components/Cards';
import Income from '../components/Income';
import Expenses from '../components/expenses';






const Home = () => {
  
  const [Ishow, setIshow] = useState(false)
  const [Eshow, setEshow] = useState(false)
  const [refresh, setrefresh] = useState(0)

  const handleCards = (text)=>{
     if(text === "add income"){
      setIshow(true)
     }
     else{
      setIshow(false)
     }
     if(text === "add expenses"){
      setEshow(true)
     }
     else{
      setEshow(false)
     }
  }

  const closeCard = ()=>{
    setIshow(false)
    setEshow(false)
  }
  return (
    <>
    <div className={`w-full h-full bg-[#242424] `}>
   {(Ishow || Eshow) && <motion.div 
   initial={{
    opacity:0
   }}
   animate={{opacity:0.5}}
   className='h-full w-full  bg-black absolute z-5'></motion.div>}  
      <Header/>
      <Cards func={handleCards} refresh={refresh}/>
 <AnimatePresence>
    {Ishow && 
   
     <Income func={closeCard} onSuccess={()=>setrefresh(r => r + 1)}/>
    
     } 
    {Eshow &&  <Expenses func={closeCard} onSuccess={()=>setrefresh(r => r + 1)}/>} 
     </AnimatePresence>
      
      
    </div>
    
    </>
  )

}

export default Home