import React from 'react'

function SearchBar({value, onChange}) {
  return (
    <div className="basis-8/12" value={value} onChange={onChange}>
      <input
        type="text"
        className="w-full text-gray-400 py-2 pl-5 pr-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-800"
        placeholder="Search..."
      />
    </div>
  )
}

export default SearchBar