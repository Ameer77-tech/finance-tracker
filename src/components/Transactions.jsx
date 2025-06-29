import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, spring } from 'motion/react';

const Transactions = ({ refresh }) => {
  const [transactions, settransactions] = useState([]);

  useEffect(() => {
    let data = [];
    try {
      data = JSON.parse(localStorage.getItem("transactions") || "[]") || [];
      if (!Array.isArray(data)) data = [];
    } catch {
      data = [];
    }
    settransactions(data);
  }, [refresh]);

  const deleteRow = (idx) => {
    const updated = transactions.filter((_, index) => index !== idx);
    settransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  return (
    <div className="md:w-full md:h-auto md:px-20 md:flex md:justify-center">
      <div className="md:bg-[#021832] md:w-full md:h-auto md:rounded-2xl  md:p-5 md:px-10 md:overflow-x-auto">
        <table className="md:w-full md:table-fixed">
          <caption className="md:text-center md:text-3xl md:font-medium md:tracking-widest md:font-sans md:mb-7">
            My Transactions
          </caption>
          {transactions.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={5}
                  className="md:font-bold md:text-xl md:text-gray-700 md:text-center md:py-8"
                >
                  No Data
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              <thead className="md:font-mono md:text-lg">
                <tr>
                  <th className="md:text-start md:w-1/4">Name</th>
                  <th className="md:text-start md:w-1/4">Amount</th>
                  <th className="md:text-start md:w-1/4">Type</th>
                  <th className="md:text-start md:w-1/4">Date</th>
                  <th className="md:text-start md:w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, idx) => (

                  <motion.tr key={idx} initial={{y:-10}} animate={{y:0}} transition={{type:spring,stiffness:300}}>
                    <td className="md:w-1/4">{t.name}</td>
                    <td className="md:w-1/4">{t.amount}</td>
                    <td
                      className={`md:w-1/4 ${
                        t.type === "Expense"
                          ? "md:text-red-600"
                          : "md:text-emerald-600"
                      }`}
                    >
                      {t.type}
                    </td>
                    <td className="md:w-1/6">{t.date}</td>
                    <td className="md:w-10 md:flex md:justify-evenly md:gap-5">
                      <div
                        className="md:font-medium md:text-red-600 md:cursor-pointer md:select-none"
                        onClick={() => deleteRow(idx)}
                      >
                        Delete
                      </div>
                      <div className="md:font-medium md:text-[#71e4f7] md:cursor-pointer md:select-none">
                        Edit
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default Transactions;
