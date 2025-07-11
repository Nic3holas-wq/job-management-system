import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Job } from "../types/Job";
import JobCard from "../components/JobCard";
import Navbar from "../components/NavBar";
import toast from 'react-hot-toast';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/jobs/")
      .then((res) => setJobs(res.data))
      .catch((err) => toast.error("Failed to fetch jobs", err));
  }, []);

  const handleDeactivate = async (id: number) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/jobs/${id}/deactivate/`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Job deactivated successfully")
    } catch (err) {
      toast.error("Deactivation failed")
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <main className="max-w-5xl mx-auto mt-27">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onDeactivate={handleDeactivate} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">No jobs found.</p>
        )}
      </main>
    </div>
  );
};

export default JobList;
