import React from "react";
import type { Job } from "../types/Job";
import { Link } from "react-router-dom";

interface Props {
  job: Job;
  onDeactivate: (id: number) => void;
}

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

const ApplicantJobCard: React.FC<Props> = ({ job}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <div>
       
        <span className={`px-2 py-1 text-sm rounded-full ${job.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {job.status}
        </span>
        <p className="bg-gray-200 p-2 rounded text-green-600 mt-2">{getTimeAgo(job.created_at)}</p>
        </div>
        
      </div>
      <p className="text-gray-700 mt-2 truncate line-clamp-4">{job.description}</p>
      <div className="mt-4 text-sm text-gray-500">
        <p><strong>Company:</strong> {job.company_name}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> KES {job.salary}</p>
        
      </div>
      <div className="mt-4 flex gap-3">
        <Link to={`/applicantjobdetail/${job.id}`} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
          Apply
        </Link>
    
      </div>
    </div>
  );
};

export default ApplicantJobCard;
