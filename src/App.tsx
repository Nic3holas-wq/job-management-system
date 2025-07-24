import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import JobList from "./pages/JobList";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import JobDetail from "./pages/JobDetail";
import { Toaster } from 'react-hot-toast';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Navbar from "./components/NavBar";

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/create" element={<CreateJob />} />
        <Route path="/edit/:id" element={<EditJob />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
