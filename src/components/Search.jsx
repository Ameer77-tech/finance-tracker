import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = (props) => {
   
    
   
    

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full md:w-1/3 relative">
        <input
          type="text"
          placeholder="Search by name"
          className="w-full px-3 py-2 rounded border-2 border-gray-300 focus:border-cyan-500 outline-none bg-[#011114] text-white"
          value={props.searchTerm}
          onChange={(e)=>{
            props.searchfunc(e)
        }}  
        />
        <FaSearch size={20} className="absolute right-5"/>
      </div>
      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-white font-medium">
          Sort:
        </label>
        <select
          id="sort"
          className="px-3 py-2 rounded border-2 border-gray-300 focus:border-cyan-500 outline-none bg-[#011114] text-white"
          value={props.sortTerm}
          onChange={(e)=>props.sortfunc(e)}
        >
          <option value="latest">Latest</option>
          <option value="az">A to Z</option>
          <option value="za">Z to A</option>
          <option value="oldest">Oldest</option>
          <option value="smallbig">Smallest to Biggest</option>
          <option value="bigsmall">Biggest to Smallest</option>
          <option value="incomes">Incomes</option>
          <option value="expenses">Expenses</option>
          <option value="reset">Reset</option>
        </select>
      </div>
    </div>
  );
};

export default Search;