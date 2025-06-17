import React, { useEffect, useState } from 'react'

const Transactions = ({ refresh }) => {
  const [transactions, settransactions] = useState([])

  useEffect(() => {
    // Always default to an array if localStorage is empty or invalid
    let data = []
    try {
      data = JSON.parse(localStorage.getItem("transactions") || "[]") || []
      if (!Array.isArray(data)) data = []
    } catch {
      data = []
    }
    settransactions(data)
  }, [refresh])

  const deleteRow = (idx) => {
    const updated = transactions.filter((_, index) => index !== idx)
    settransactions(updated)
    localStorage.setItem("transactions", JSON.stringify(updated))
  }

  return (
    <div className='w-full h-auto px-4 md:px-20 flex justify-center'>
      <div className='bg-cyan-100 w-full h-auto rounded-2xl mt-10 p-5 md:px-10 overflow-x-auto'>
        <table className='text-black w-full table-fixed'>
          <caption className='text-center text-3xl font-medium tracking-widest font-sans mb-7'>
            My Transactions
          </caption>
          {transactions.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={5} className='font-bold text-xl text-gray-700 text-center py-8'>
                  No Data
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              <thead className='font-mono text-lg'>
                <tr>
                  <th className='text-start w-1/4'>Name</th>
                  <th className='text-start w-1/4'>Amount</th>
                  <th className='text-start w-1/4'>Type</th>
                  <th className='text-start w-1/4'>Date</th>
                  <th className='text-start w-32'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, idx) => (
                  <tr key={idx}>
                    <td className='w-1/4'>{t.name}</td>
                    <td className='w-1/4'>{t.amount}</td>
                    <td className={`w-1/4 ${t.type === "Expense" ? 'text-red-600' : 'text-emerald-600'}`}>{t.type}</td>
                    <td className='w-1/6'>{t.date}</td>
                    <td className='w-10 flex justify-evenly gap-5'>
                      <div
                        className='font-medium text-red-600 cursor-pointer select-none'
                        onClick={() => deleteRow(idx)}
                      >
                        Delete
                      </div>
                      <div className='font-medium text-cyan-600 cursor-pointer select-none'>Edit</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  )
}

export default Transactions