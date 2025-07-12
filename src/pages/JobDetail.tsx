import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import type { Job } from "../types/Job";
import toast from "react-hot-toast";

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  // Time elapsed helper
const getTimeAgo = (createdAt: string): string => {
    const postedDate = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - postedDate.getTime();
  
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };
  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/jobs/${id}/`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch job details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
          <span className={`mt-2 inline-block px-3 py-1 text-sm font-medium rounded-full ${
            job.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {job.status.toUpperCase()}
          </span>
        </div>
        <Link
          to={`/edit/${job.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
      </div>

      <p className="mt-4 text-gray-700">{job.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 text-gray-600 text-sm">
        <div>
          <p className="font-semibold">Company:</p>
          <p>{job.company_name}</p>
        </div>
        <div>
          <p className="font-semibold">Location:</p>
          <p>{job.location}</p>
        </div>
        <div>
          <p className="font-semibold">Salary:</p>
          <p>KES {job.salary}</p>
        </div>
        <div>
          <p className="font-semibold">Posted On:</p>
          <p>{new Date(job.created_at).toLocaleDateString()} </p>
          <p className="text-blue-400">{getTimeAgo(job.created_at)}</p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Job Listings
        </Link>
      </div>
    </div>
  );
};

export default JobDetail;
