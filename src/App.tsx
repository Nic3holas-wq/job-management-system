import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import JobList from "./pages/JobList";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import JobDetail from "./pages/JobDetail";
import { Toaster } from 'react-hot-toast';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        

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
    </Router>
  );
};

export default App;
