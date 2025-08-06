import React, { useEffect, useState } from "react";
import type { Job } from "../types/Job";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import api from "../utils/api"
import SearchBar from "../components/SearchBar";
import ApplicantJobCard from "../components/ApplicantJobCard";

// interface Props {
//   searchTerm: string;
//   onSearch: (value: string) => void;
// }

const ApplicantDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }
   api.get("jobs/")
      .then((res) => setJobs(res.data))
      .catch(() => toast.error("Failed to fetch jobs"));
  }, [token]);

  const handleDeactivate = async (id: number) => {
    try {
      await api.patch(`jobs/${id}/deactivate/`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Job deactivated successfully");
    } catch {
      toast.error("Deactivation failed");
    }
  };

  const locations = Array.from(new Set(jobs.map((job) => job.location)));
  const companies = Array.from(new Set(jobs.map((job) => job.company_name)));

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = selectedLocation
      ? job.location === selectedLocation
      : true;

    const matchesCompany = selectedCompany
      ? job.company_name === selectedCompany
      : true;

    return matchesSearch && matchesLocation && matchesCompany;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="mt-10">
       <div className="max-w-5xl mx-auto">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto flex gap-4 mt-5 px-4">
        <p className="text-gray-500">Filter by:</p>
        <select
          value={selectedLocation}
          onChange={(e) => {
            setSelectedLocation(e.target.value);
            setCurrentPage(1); // reset to first page when filter changes
          }}
          className="p-2 border border-gray-200 rounded w-1/2"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={selectedCompany}
          onChange={(e) => {
            setSelectedCompany(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border border-gray-200 rounded w-1/2"
        >
          <option value="">All Companies</option>
          {companies.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>

      {/* 🔽 Job List */}
      <main className="max-w-5xl mx-auto mt-8 px-4">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <ApplicantJobCard key={job.id} job={job} onDeactivate={handleDeactivate} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">No jobs found.</p>
        )}
      </main>

      {/* 🔽 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicantDashboard;
