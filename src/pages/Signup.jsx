import { easeOut, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [visible, setvisible] = useState(false)
  const [nameStats, setnameStats] = useState("")
  const [emailStats, setemailStats] = useState("")
  const [passwordStats, setpasswordStats] = useState("")
  const navigate = useNavigate()

 // ...existing code...

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("login")) || false
    if(logged){
      navigate('/')
    }
    else{
       return;
    }
  
   
  }, [])
  


const submit = () => {
  let valid = true;

  // Name validation
  if (name.trim() === "") {
    setnameStats("please enter your name");
    valid = false;
  } else {
    setnameStats("");
  }

  // Email validation
  if (email.trim() === "") {
    setemailStats("please enter your email");
    valid = false;
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setemailStats("please enter a valid email");
    valid = false;
  } else {
    setemailStats("");
  }

  // Password validation
  if (password.trim() === "") {
    setpasswordStats("please enter your password");
    valid = false;
  } else if (password.length < 6) {
    setpasswordStats("password must be at least 6 characters");
    valid = false;
  } else {
    setpasswordStats("");
  }

  if (!valid) return;
  else {
      localStorage.setItem("login","true"); 
      localStorage.setItem("name",JSON.stringify(name));
      navigate("/");
    }
  
}




  return (
    <div className='h-full w-full bg-[#242424] flex justify-center items-center'>
      <div className='w-xl h-3/4 border-2 border-white border-y-red-600 border-y-4 border- rounded-4xl p-10'>

        <h1 className='mb-5 text-center text-3xl tracking-widest font-bold'>LOGIN</h1>
          <div className='flex flex-col justify-evenly h-3/4'>
           <div className='w-full relative'> <input type='name' placeholder='Enter username'
            value={name} onChange={(e)=>{setname(e.target.value)}}
            className='w-full p-3 border-2 border-white rounded-2xl outline-0 focus:border-fuchsia-600 hover:border-fuchsia-600 text-lg font-mono'
            ></input><p className='text-red-600 absolute left-5 lowercase tracking-wide'>{nameStats}</p></div>
           <div className='w-full relative'> <input type='text' placeholder='Enter Email'
             value={email} onChange={(e)=>{setemail(e.target.value)}}
            className='w-full p-3 border-2 border-white rounded-2xl outline-0 focus:border-fuchsia-600 hover:border-fuchsia-600 text-lg font-mono'
            ></input><p className='text-red-600 absolute left-5 lowercase tracking-wide'>{emailStats}</p></div>
           <div className='w-full relative'> <input type={visible ? 'text' : 'password'} placeholder='Enter password'
             value={password} onChange={(e)=>{setpassword(e.target.value)}}
            className='p-3 border-2 border-white rounded-2xl outline-0 focus:border-fuchsia-600 hover:border-fuchsia-600 text-lg font-mono w-full'
            ></input><h3 className='select-none absolute top-2/4 right-5 -translate-y-2/4 cursor-pointer text-fuchsia-600 font-medium'
            onClick={()=>setvisible(!visible)}
            >{visible ? "hide" : "show"}</h3><p className=' text-red-600 absolute left-5 lowercase tracking-wide'>{passwordStats}</p></div>
          </div>
          <div className='w-full h-10 text-center'><motion.button type='submit' 
          initial={{
            scale:1,
            color:'white',
            backgroundColor:'var(--color-fuchsia-600)'
          }}
          whileHover={{
            scale:1.15,
           
          }}
         
          whileTap={{scale:0.9,color:'var(--color-fuchsia-600)',backgroundColor:'white'}}
          onClick={()=>submit()}
          className='bg-fuchsia-600 px-4 py-2 font-semibold font-mono text-lg tracking-wider rounded-xl select-none cursor-pointer'>login</motion.button></div>

      </div>
       
    </div>
  )
}

export default Signup