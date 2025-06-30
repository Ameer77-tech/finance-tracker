import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, spring } from "motion/react";

const Transactions = ({ refresh, setrefresh }) => {
  const [transactions, settransactions] = useState([]);
  const [editModeIdx, seteditModeIdx] = useState(null);
  const inputRef = useRef(null);
  const [wrongKey, setwrongKey] = useState(false);

  const [updatedInputs, setupdatedInputs] = useState({
    name: "",
    amount: "",
    type: "",
    date: "",
  });

  const setDefault = (idx) => {
    let name,
      amount,
      type,
      date = null;
    name = transactions[idx].name;
    amount = transactions[idx].amount;
    type = transactions[idx].type;
    date = transactions[idx].date;
    setupdatedInputs({
      name,
      amount,
      type,
      date,
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setupdatedInputs({
      ...updatedInputs,
      [name]: value,
    });
  };

  const updateData = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      const updated = transactions.map((item, idx) =>
        idx === editModeIdx ? { ...item, ...updatedInputs } : item
      );
      settransactions(updated);
      localStorage.setItem("transactions", JSON.stringify(updated));
      setrefresh((prev) => prev + 1);
      seteditModeIdx(null);
      setwrongKey(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editModeIdx]);

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
      <div className="md:bg-[#021832] md:w-full md:h-auto md:rounded-2xl md:p-5 md:px-10 md:overflow-x-auto border-1 border-white">
        <table className="md:w-full md:table-fixed border-separate border-spacing-y-3">
          <caption className="md:text-center md:text-3xl md:font-medium md:tracking-wider md:font-sans md:mb-7">
            <p className="mb-3"> My Transactions </p>
            {editModeIdx != null && (
              <motion.p
                animate={{
                  x: [10, -10, 10, 0],
                }}
                transition={{
                  duration: 0.3,
                }}
                className="text-sm absolute text-green-600 left-2/4 -translate-x-2/4"
              >
                Press Enter To Save
              </motion.p>
            )}
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
                  <motion.tr
                    key={idx}
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ type: spring, stiffness: 300 }}
                  >
                    {editModeIdx === idx ? (
                      <td>
                        <input
                          type="text"
                          ref={inputRef}
                          value={updatedInputs.name}
                          name="name"
                          onKeyDown={(e) => updateData(e)}
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          className="px-2 w-2/4 border-2 border-white rounded outline-0"
                        ></input>
                      </td>
                    ) : (
                      <td className="md:w-1/4">{t.name}</td>
                    )}
                    {editModeIdx === idx ? (
                      <td>
                        {" "}
                        <input
                          type="number"
                          ref={inputRef}
                          value={updatedInputs.amount}
                          name="amount"
                          onKeyDown={(e) => updateData(e)}
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          className="px-2 w-2/4 border-2 border-white rounded outline-0"
                        ></input>{" "}
                      </td>
                    ) : (
                      <td className="md:w-1/4">{t.amount}</td>
                    )}
                    {editModeIdx === idx ? (
                      <td>
                        {" "}
                        <input
                          type="text"
                          ref={inputRef}
                          value={updatedInputs.type}
                          name="type"
                          onKeyDown={(e) => updateData(e)}
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          className="px-2 w-2/4 border-2 border-white rounded outline-0"
                        ></input>{" "}
                      </td>
                    ) : (
                      <td
                        className={`md:w-1/4 ${
                          t.type === "Expense"
                            ? "md:text-red-600"
                            : "md:text-emerald-600"
                        }`}
                      >
                        {t.type}
                      </td>
                    )}
                    {editModeIdx === idx ? (
                      <td>
                        <input
                          type="date"
                          ref={inputRef}
                          value={updatedInputs.date}
                          name="date"
                          onKeyDown={(e) => updateData(e)}
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          className="px-2 w-2/4 border-2 border-white rounded outline-0"
                        ></input>
                      </td>
                    ) : (
                      <td className="md:w-1/6">{t.date}</td>
                    )}

                    <td className="md:w-10 md:flex md:justify-evenly md:gap-5">
                      <div
                        className="md:font-medium md:text-red-600 md:cursor-pointer md:select-none"
                        onClick={() => deleteRow(idx)}
                      >
                        Delete
                      </div>
                      <div
                        onClick={() => {
                          seteditModeIdx(editModeIdx === idx ? null : idx);
                          setDefault(idx);
                        }}
                        className="md:font-medium md:text-[#71e4f7] md:cursor-pointer md:select-none"
                      >
                        {editModeIdx === idx ? "Cancel" : "Edit"}
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
