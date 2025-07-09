import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, spring } from "motion/react";
import Search from "./Search";

const Transactions = ({ refresh, setrefresh }) => {
  const [transactions, settransactions] = useState([]);
  const [allTransactions, setallTransactions] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [sortTerm, setsortTerm] = useState("latest");
  const [editModeIdx, seteditModeIdx] = useState(null);
  const [status, setstatus] = useState("No data");
  const inputRef = useRef(null);

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

  const updateData = () => {
    const updated = transactions.map((item, idx) =>
      idx === editModeIdx ? { ...item, ...updatedInputs } : item
    );
    settransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));

    const totalIncome = updated.reduce((acc, u) => {
      if (u.type.toLowerCase() === "income") return acc + Number(u.amount);
      return acc;
    }, 0);

    const totalExpense = updated.reduce(
      (acc, u) =>
        acc + (u.type.toLowerCase() === "expense" ? Number(u.amount) : 0),
      0
    );
    localStorage.setItem("income", String(totalIncome));
    localStorage.setItem("expense", String(totalExpense));
    setrefresh((prev) => prev + 1);
    seteditModeIdx(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setsearchTerm(value);

    if (value === "") {
      setrefresh((prev) => prev + 1);
    } else {
      let filter = [...allTransactions]
      const filtered = filter.filter((t) =>
        t.name.toLowerCase().includes(value.toLowerCase())
      );
      settransactions(filtered)
      if (filtered.length === 0) {
        setstatus("No match found");
      }else{
        setstatus("No data")
      }
      settransactions(filtered);
    }
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setsortTerm(value);

    let sorted = [...allTransactions];
    if (value === "latest") {
      let latest = [...allTransactions]
      settransactions(latest)
      return;
    } else if (value === "az") {
      sorted.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else if (value === "za") {
      sorted.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    } else if (value === "smallbig") {
      sorted.sort((a, b) => a.amount - b.amount);
    } else if (value === "bigsmall") {
      sorted.sort((a, b) => b.amount - a.amount);
    } else if (value === "oldest") {
      const reversed = sorted.reverse()
      settransactions(reversed);
      return;
    } else if (value === "incomes") {
      let filtered = sorted.filter((s) => s.type.toLowerCase() === "income");

      sorted = filtered;
    } else if (value === "expenses") {
      let filtered = sorted.filter((s) => s.type.toLowerCase() === "expense");
      sorted = filtered;
    } else {
      setrefresh((prev) => prev + 1);
      setsortTerm("latest");
      return;
    }
    settransactions(sorted);
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
    settransactions(data.reverse());
    setallTransactions(data.reverse());
  }, [refresh]);

  const deleteRow = (idx) => {
    const updated = transactions.filter((_, index) => index !== idx);
    settransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  return (
    <div className="w-full h-auto overflow-x-auto md:overflow-x-visible flex justify-center">
      <div className="bg-[#021832] ml-61 md:ml-0 mb-5 md:w-full h-auto rounded-2xl p-5 md:px-10 border-1 border-white">
        <Search
          searchfunc={handleSearch}
          searchTerm={searchTerm}
          sortTerm={sortTerm}
          sortfunc={handleSort}
        />
        <table className="w-full table-fixed min-w-[600px] border-separate border-spacing-y-3 text-lg">
          <caption className="text-center text-3xl font-medium tracking-wider font-sans mb-7">
            <p className="mb-3 underline"> My Transactions </p>
            {editModeIdx != null && (
              <motion.button
                onClick={updateData}
                className="text-sm bg-green-600 px-2 py-1 rounded absolute left-2/4 -translate-x-2/4 cursor-pointer"
              >
                Update
              </motion.button>
            )}
          </caption>
          {transactions.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={5}
                  className="font-bold text-xl text-gray-700 text-center py-8"
                >
                  {status}
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              <thead className="font-mono text-lg">
                <tr>
                  <th className="text-start w-2/4 underline">Name</th>
                  <th className="text-start w-2/4 underline">Amount</th>
                  <th className="text-start w-2/4 underline">Type</th>
                  <th className="text-start w-2/4 underline">Date</th>
                  <th className="text-start w-32 underline">Actions</th>
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
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          className="px-2 w-3/4 border-2 border-white rounded outline-0"
                        ></input>
                      </td>
                    ) : (
                      <td className="w-full">{t.name}</td>
                    )}
                    {editModeIdx === idx ? (
                      <td>
                        {" "}
                        <input
                          type="number"
                          ref={inputRef}
                          value={updatedInputs.amount}
                          name="amount"
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          className="px-2 w-3/4 border-2 border-white rounded outline-0"
                        ></input>{" "}
                      </td>
                    ) : (
                      <td className="w-full">{t.amount}</td>
                    )}
                    {editModeIdx === idx ? (
                      <td>
                        {" "}
                        <input
                          type="text"
                          ref={inputRef}
                          value={updatedInputs.type}
                          name="type"
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          className="px-2 w-3/4 border-2 border-white rounded outline-0"
                        ></input>{" "}
                      </td>
                    ) : (
                      <td
                        className={`w-full ${
                          t.type.toLowerCase() === "expense"
                            ? "text-red-600"
                            : "text-emerald-600"
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
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          className="px-2 w-3/4 border-2 border-white rounded outline-0"
                        ></input>
                      </td>
                    ) : (
                      <td className="w-full">{t.date}</td>
                    )}

                    <td className="w-10 flex justify-evenly gap-5">
                      <div
                        className="font-medium text-red-600 cursor-pointer select-none"
                        onClick={() => deleteRow(idx)}
                      >
                        Delete
                      </div>
                      <div
                        onClick={() => {
                          seteditModeIdx(editModeIdx === idx ? null : idx);
                          setDefault(idx);
                        }}
                        className="font-medium text-[#71e4f7] cursor-pointer select-none"
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
