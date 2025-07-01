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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      transition={{ ease: 'anticipate' }}
      className="absolute p-5 bg-[#031733] md:w-1/4 w-3/4 h-100 top-100 left-2/4 -translate-x-2/4 -translate-y-2/4 md:scale-130 rounded-xl z-10 shadow-2xl shadow-black flex flex-col justify-between"
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="uppercase text-xl font-medium">ADD EXPENSE</h1>
        <FaTimes
          className=" md:hover:bg-emerald-500 bg-red-500 md:bg-transparent cursor-pointer transition-all ease rounded-full p-1 md:w-6 md:h-6 w-7 h-7"
          onClick={() => {
            props.func()
          }}
        />
      </div>
      <div className="h-3/4 flex flex-col justify-evenly">
        <input
          value={data.name} name='name'
          onChange={handleChange}
          type="text" placeholder='Enter name'
           className="md:text-sm border-1 border-[#dbf8fd] outline-0 md:hover:shadow-xs focus:shadow-xs transition-all ease focus:shadow-cyan-700 md:hover:shadow-cyan-700 px-3 py-2 rounded-sm"
        />
        {errors.name && <span className="text-red-500 md:text-xs text-sm">{errors.name}</span>}
        <input
          value={data.amount} name='amount'
          onChange={handleChange}
          type="number" placeholder='Enter Amount*'
           className="md:text-sm border-1 border-[#dbf8fd] outline-0 md:hover:shadow-xs focus:shadow-xs transition-all ease focus:shadow-cyan-700 md:hover:shadow-cyan-700 px-3 py-2 rounded-sm"
        />
        {errors.amount && <span className="text-red-500 md:text-xs text-sm">{errors.amount}</span>}
        <input
          value={data.date} name='date'
          onChange={handleChange}
          type="date" placeholder='Enter Date'
          className="md:text-sm w-full border-1 border-[#dbf8fd] outline-0 md:hover:shadow-xs focus:shadow-xs transition-all ease focus:shadow-cyan-700 md:hover:shadow-cyan-700 px-3 py-2 rounded-sm"
        />
        {errors.date && <span className="text-red-500 md:text-xs text-sm">{errors.date}</span>}
      </div>
      <button
        onClick={add}
        className="text-white font-bold md:text-sm bg-red-600 rounded-2xl py-1 cursor-pointer active:bg-red-500 active:shadow-red-800 active:shadow-lg select-none hover:shadow-red-800 hover:shadow-xl hover:-translate-y-1 md:transition-all md:ease"
      >ADD</button>
    </motion.div>
  )
}

export default Expenses