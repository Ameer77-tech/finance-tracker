import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'






const App = () => {
  const [login, setlogin] = useState(false)
  const [totalAmount, settotalAmount] = useState(0)
  const [income, setincome] = useState(0)
  const [expenses, setexpenses] = useState(0)
  useEffect(() => {
  const loginValue = localStorage.getItem("login") === "true";
  setlogin(loginValue);
  settotalAmount(Number(localStorage.getItem("totalAmount")) || 0);
  setincome(Number(localStorage.getItem("income")) || 0);
  setexpenses(Number(localStorage.getItem("expenses")) || 0);
}, []);

  return (
   <>
    <Home/>
   </>
  )
}

export default App