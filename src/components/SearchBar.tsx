import React from "react";

interface Props {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, onSearch }) => {
  return (
    <div className="w-full mb-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by title or company name..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
