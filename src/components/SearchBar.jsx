import React from 'react'

function SearchBar() {
  return (
    <div className="w-40">
      <input
        type="text"
        className="w-full py-2 pl-5 pr-4 bg-white rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none  bg-gray-800"
        placeholder="Search..."
      />
  </div>


  )
}

export default SearchBar