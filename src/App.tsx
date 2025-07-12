import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobList from "./pages/JobList";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import JobDetail from "./pages/JobDetail";
import { Toaster } from 'react-hot-toast';
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="flex justify-between items-center mb-6">
          <Link to='/'><h1 className="text-3xl text-blue-600 font-bold">Job Portal</h1></Link>
          <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Post Job
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/create" element={<CreateJob />} />
          <Route path="/edit/:id" element={<EditJob />} />
          <Route path="/job/:id" element={<JobDetail />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
};

export default App;
