import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { AnimatePresence, motion } from 'motion/react';

const Expenses = (props) => {
  const [data, setdata] = useState({
    name: "",
    amount: "",
    date: "",
    type: "Expense"
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
    if (Number(data.amount) > 100000000) err.amount = "Max Limit - 10crores"
    if (!data.date) {
      err.date = "Date is required";
    }

    setErrors(err);

    if (Object.keys(err).length === 0) {
      const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
      const existingExpense = parseFloat(localStorage.getItem("expense")) || 0;
      const expense = existingExpense + parseFloat(data.amount)
      existing.push(data);
      localStorage.setItem("transactions", JSON.stringify(existing));
      localStorage.setItem("expense", expense)
      props.onSuccess()
      setdata({ name: "", amount: "", date: "" });
      setErrors({});
      props.func()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setdata({
      ...data,
      [name]: value
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
      initial={{ opacity: 0, scale: 0.8, x: 200 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.2, x: 300 }}
      transition={{ ease: 'anticipate' }}
      className='md:absolute md:p-5 bg-[#031733] md:w-1/4 md:h-100 md:top-100 md:left-2/4 md:-translate-x-2/4 md:-translate-y-2/4 md:scale-130 md:rounded-xl md:z-10 md:shadow-2xl md:shadow-black md:flex md:flex-col md:justify-between'
    >
      <div className='md:w-full md:flex md:justify-between md:items-center'>
        <h1 className='md:uppercase md:font-medium'>ADD EXPENSE</h1>
        <FaTimes
          className='md:hover:bg-red-500 md:cursor-pointer md:transition-all md:ease md:rounded-full md:p-1 md:w-6 md:h-6'
          onClick={() => {
            props.func()
          }}
        />
      </div>
      <div className='md:h-3/4 md:flex md:flex-col md:justify-evenly'>
        <input
          value={data.name} name='name'
          onChange={handleChange}
          type="text" placeholder='Enter name'
          className='md:text-sm border-1 border-[#dbf8fd] md:outline-0 md:hover:shadow-xs md:focus:shadow-xs md:transition-all md:ease md:focus:shadow-cyan-700 md:hover:shadow-cyan-700 md:px-3 md:py-2 rounded-sm'
        />
        {errors.name && <span className="md:text-red-500 md:text-xs">{errors.name}</span>}
        <input
          value={data.amount} name='amount'
          onChange={handleChange}
          type="number" placeholder='Enter Amount*'
          className='md:text-sm border-1 border-[#dbf8fd] md:outline-0 md:hover:shadow-xs md:focus:shadow-xs md:transition-all md:ease md:focus:shadow-cyan-700 md:hover:shadow-cyan-700 md:px-3 md:py-2 rounded-sm'
        />
        {errors.amount && <span className="md:text-red-500 md:text-xs">{errors.amount}</span>}
        <input
          value={data.date} name='date'
          onChange={handleChange}
          type="date" placeholder='Enter Date'
          className='md:text-sm border-1 border-[#dbf8fd] md:outline-0 md:hover:shadow-xs md:focus:shadow-xs md:transition-all md:ease md:focus:shadow-cyan-700 md:hover:shadow-cyan-700 md:px-3 md:py-2 rounded-sm'
        />
        {errors.date && <span className="md:text-red-500 md:text-xs">{errors.date}</span>}
      </div>
      <button
        onClick={add}
        className='md:text-white md:font-bold md:text-sm md:bg-red-600 md:rounded-2xl md:py-1 md:cursor-pointer hover:shadow-red-900 hover:shadow-xl hover:-translate-y-1 md:transition-all md:ease'
      >ADD</button>
    </motion.div>
  )
}

export default Expenses