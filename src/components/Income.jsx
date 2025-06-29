import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react';
import { FaTimes } from 'react-icons/fa'

const Income = (props) => {
  const [data, setdata] = useState({
    name: "",
    amount: "",
    date: "",
    type: "Income"
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
      const existingIncome = parseFloat(localStorage.getItem("income")) || 0;
      const income = existingIncome + parseFloat(data.amount)
      existing.push(data);
      localStorage.setItem("transactions", JSON.stringify(existing));
      localStorage.setItem("income", income)
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      transition={{ ease: 'anticipate' }}
      className='md:absolute md:p-5 md:bg-white md:w-1/4 md:h-2/4 md:top-2/4 md:left-2/4 md:-translate-x-2/4 md:-translate-y-2/4 md:scale-130 md:rounded-xl md:z-10 md:shadow-2xl md:shadow-black md:flex md:flex-col md:justify-between'
    >
      <div className='md:w-full md:flex md:justify-between md:items-center'>
        <h1 className='md:uppercase md:text-black md:font-medium'>ADD INCOME</h1>
        <FaTimes
          className='md:text-black md:hover:bg-emerald-500 md:cursor-pointer md:transition-all md:ease md:rounded-full md:p-1 md:w-6 md:h-6'
          onClick={() => {
            props.func()
          }}
        />
      </div>
      <div className='md:h-3/4 md:flex md:flex-col md:justify-evenly'>
        <input
          value={data.name}
          name='name'
          onChange={handleChange}
          type="text"
          placeholder='Enter name'
          className='md:placeholder:text-gray-600 md:text-sm md:font-semibold md:text-black md:border-b-2 md:border-b-gray-600 md:outline-0 md:hover:shadow-xs md:focus:shadow-xs md:transition-all md:ease md:focus:shadow-cyan-700 md:hover:shadow-cyan-700 md:px-2 md:py-1 md:rounded-xl'
        />
        {errors.name && <span className="md:text-red-500 md:text-xs">{errors.name}</span>}
        <input
          onChange={handleChange}
          value={data.amount}
          name='amount'
          type="number"
          placeholder='Enter Amount*'
          className='md:placeholder:text-gray-600 md:text-sm md:font-semibold md:text-black md:border-b-2 md:border-b-gray-600 md:outline-0 md:hover:shadow-xs md:focus:shadow-xs md:transition-all md:ease md:focus:shadow-cyan-700 md:hover:shadow-cyan-700 md:px-2 md:py-1 md:rounded-xl'
        />
        {errors.amount && <span className="md:text-red-500 md:text-xs">{errors.amount}</span>}
        <input
          onChange={handleChange}
          value={data.date}
          name='date'
          type="date"
          placeholder='Enter Date'
          className='md:placeholder:text-gray-600 md:text-sm md:font-semibold md:text-black md:border-b-2 md:border-b-gray-600 md:outline-0 md:hover:shadow-xs md:focus:shadow-xs md:transition-all md:ease md:focus:shadow-cyan-700 md:hover:shadow-cyan-700 md:px-2 md:py-1 md:rounded-xl'
        />
        {errors.date && <span className="md:text-red-500 md:text-xs">{errors.date}</span>}
      </div>
      <button
        className='md:text-white md:font-bold md:text-sm md:bg-emerald-600 md:rounded-2xl md:py-1 md:cursor-pointer md:hover:bg-emerald-500 md:transition-all md:ease'
        onClick={add}
      >ADD</button>
    </motion.div>
  )
}

export default Income