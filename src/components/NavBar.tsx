import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

interface Props {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const Navbar: React.FC<Props> = ({ searchTerm, onSearch }) => {
  return (
    <nav className="bg-white shadow-md px-2 py-2 mb-4 fixed top-0 w-full z-50">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-4">
          <Link to='/'><h1 className="text-3xl font-bold text-blue-600">Job Portal</h1></Link>
          <Link
            to="/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Post Job
          </Link>
        </header>

        <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
