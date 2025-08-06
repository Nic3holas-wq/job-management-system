import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import { User } from 'lucide-react';
const ApplicantNavbar: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-6 fixed top-2 left-2 right-2 z-50">
          <Link to='/applicantdashboard'><h1 className="text-3xl text-green-600 font-bold">Job Portal</h1></Link>
          <div className="flex items-center gap-10">
            <Link to="/applicantprofile">
             <User className="w-8 h-8 text-gray-500" />
            </Link>
            <LogoutButton/>
            <Link to="/application" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Applications
          </Link>
          </div>
          
        </header>
  );
};

export default ApplicantNavbar;
