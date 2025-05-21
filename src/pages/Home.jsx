import React, { useEffect, useState } from 'react'

const Home = () => {
  const [name, setname] = useState("")
  useEffect(() => {

  setname(JSON.parse(localStorage.getItem("name")))
    
  }, [])
  
  const logout = ()=>{
    localStorage.setItem("login",false)
    window.location.reload()
  }

  return (
    <>
    <div className='w-full h-full bg-[#242424]'>WelCome {name}

      <button className='text-white' onClick={()=>logout()}>LogOut</button>
    </div>
    
    </>
  )

}

export default Home