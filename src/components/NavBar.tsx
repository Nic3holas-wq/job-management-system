import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import { User } from 'lucide-react';
const Navbar: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-6 fixed top-2 left-2 right-2 z-50">
          <Link to='/'><h1 className="text-3xl text-blue-600 font-bold">Job Portal</h1></Link>
          <div className="flex items-center gap-10">
            <Link to="/account">
             <User className="w-8 h-8 text-gray-500" />
            </Link>
            <LogoutButton/>
            <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Post Job
          </Link>
          </div>
          
        </header>
  );
};

export default Navbar;
