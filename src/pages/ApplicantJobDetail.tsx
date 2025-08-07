import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Job } from "../types/Job";
import toast from "react-hot-toast";
import api from "../utils/api";

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

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
    if (!token) {
      navigate("/applicantlogin");
      return;
    }
    api
      .get(`all-jobs/${id}/`)
      .then((res) => setJob(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch job details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    if (!job) return;
    if (!cv) {
      toast.error("Please upload your CV before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("job_id", String(job.id));
      formData.append("cover_letter", coverLetter);
      formData.append("resume", cv);

      const response = await api.post("/apply/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Application response:", response.data);
      toast.success("Application submitted successfully!");
      navigate("/application");
    } catch (error) {
      console.error("Application failed", error);
      toast.error("Failed to submit application.");
    }
  };

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
          <p className="text-blue-400">{getTimeAgo(job.created_at)}</p>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="coverLetter" className="block font-medium text-gray-700 mb-2">
          Cover Letter (optional)
        </label>
        <textarea
          id="coverLetter"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="cv" className="block font-medium text-gray-700 mb-2">
          Upload CV (PDF, DOCX)
        </label>
        <input
          type="file"
          id="cv"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setCv(e.target.files?.[0] || null)}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link
          to="/applicantdashboard"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Job Listings
        </Link>

        <button
          onClick={handleApply}
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
