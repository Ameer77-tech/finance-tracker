import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Header = ({ onSuccess, refresh }) => {
  const [show, setshow] = useState(false);
  const [income, setincome] = useState(0);
  const [expense, setexpense] = useState(0);

  useEffect(() => {
    setincome(localStorage.getItem("income"));
    setexpense(localStorage.getItem("expense"));
  }, [refresh]);

  const resetData = () => {
    const ok = confirm("Are You Sure");
    if (ok) {
      localStorage.setItem("income", parseFloat(0));
      localStorage.setItem("expense", parseFloat(0));
      onSuccess();
    }
  };

  return (
    <div className="md:h-auto flex justify-between px-10 h-40 items-center text-2xl md:w-full bg-[#011114] shadow-sm shadow-gray-600 md:flex md:justify-between md:items-center md:p-10">
      <h1 className="md:text-3xl text-4xl">
        Hello👋
        <br />
        <span className="font-bold tracking-wider">Friend</span>
      </h1>
      <div
        className="md:flex gap-2 relative px-5 py-3 text-lg flex items-center justify-between md:justify-evenly md:items-center md:w-40 md:font-mono md:font-medium md:cursor-pointer md:text-xl md:bg-[#011114] border-1 border-gray-600 md:py-3 md:px-3 md:rounded-xl md:hover:bg-[#010914] md:transition-all md:ease md:select-none md:relative md:group"
        onClick={() => {
          setshow(!show);
        }}
      >
        Profile
        <motion.span
          animate={{ rotate: show ? -180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.span>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="border-gray-600 flex flex-col gap-3 z-10 absolute top-[120%] w-65 right-0 border-2 md:absolute md:h-auto md:w-90 bg-[#011114] md:top-[120%] md:text-lg px-5 md:-left-50 py-5 md:flex md:flex-col md:gap-3 md:justify-evenly rounded-2xl md:pointer-events-none"
            >
              <p className="md:uppercase md:font-bold md:tracking-wide">
                {" "}
                income - ₹{income}
              </p>
              <p className="md:uppercase md:font-bold md:tracking-wide">
                {" "}
                Expenses - ₹{expense}
              </p>
              <div
                onClick={() => resetData()}
                className="md:hover:bg-gray-800 md:bg-transparent bg-gray-800 px-3 py-2 -ml-3 rounded-sm md:cursor-pointer md:pointer-events-auto md:uppercase md:font-bold text-red-500"
              >
                Reset Data
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Header;
