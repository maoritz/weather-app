import React from 'react';

function SearchBar({ value, onChange, suggestions, onSelectSuggestion }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full border border-gray-500 text-sm text-gray-600 opacity-90 py-2 pl-5 pr-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
        placeholder="Search weather location..."
        value={value}
        onChange={onChange}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="text-gray-600 absolute opacity-95 bg-white w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="py-2 px-4 cursor-pointer hover:bg-gray-700"
              onClick={() => onSelectSuggestion(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
