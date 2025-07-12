import React from "react";
import SearchBar from "./SearchBar";

interface Props {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const Navbar: React.FC<Props> = ({ searchTerm, onSearch }) => {
  return (
    <nav className="px-2 py-2 mb-4">
      <div className="max-w-5xl mx-auto">
        <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
