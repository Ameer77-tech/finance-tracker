import React, { useEffect, useState } from 'react'


const Transactions = ({refresh}) => {
   const [transactions, settransactions] = useState([])

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("transactions")) || "[]";
      settransactions(data)
     }, [refresh])
   
     const deleteRow = (idx)=>{
     const updated =  transactions.filter((_, index) => index !== idx);
     settransactions(updated)
        localStorage.setItem("transactions",JSON.stringify(updated))
        
     }
    
  return (
    <div className='w-full h-auto px-20 flex justify-center'>
        <div className='bg-cyan-100 w-[100%] h-auto rounded-2xl mt-10 p-5 px-10'>
            
           <table className='text-black w-full' >
            <caption className='text-center text-3xl font-medium tracking-widest font-sans mb-7'>My Transactions</caption>
           {transactions.length == 0 ? <p className='font-bold text-xl text-gray-700'>No Data</p> : 
           <>        
            <thead className='font-mono text-lg w-2'>
                <tr>
                <th className='text-start'>Name</th>
                <th className='text-start'>Amount</th>
                <th className='text-start'>Type</th>
                <th className='text-start'>Date</th>
                </tr>
                
            </thead>
             <tbody>
            {transactions.map((t,idx)=>{
              return (
               
             <tr key={idx}>
                <td className='w-1/4'>{t.name}</td>
                <td className='w-1/4'>{t.amount}</td>
                <td className={`w-1/4 ${t.type=="Expense" ?  'text-red-600' : 'text-emerald-600'}`}>{t.type}</td>
                <td className='w-1/6'>{t.date}</td>
                <td className='w-10 flex justify-evenly gap-5'>
                    <div className='font-medium text-red-600 cursor-pointer select-none'
                    onClick={()=>{deleteRow(idx)}}
                    >Delete</div>
                    <div className='font-medium text-cyan-600 cursor-pointer select-none'>Edit</div>
                </td>
            </tr>
          
              )   
            })}
             </tbody>
          </> 
           }
           
           
           </table>
        </div>
    </div>
  )
}

export default Transactions