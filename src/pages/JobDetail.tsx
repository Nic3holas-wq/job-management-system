import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import type { Job } from "../types/Job";

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/jobs/${id}/`)
      .then((res) => {
        setJob(res.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch job.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
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
          <p>{new Date(job.created_at).toLocaleDateString()}</p>
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
