import React from "react";
import type {Job} from "../types/Job";
import { Link } from "react-router-dom";

interface Props {
  job: Job;
  onDeactivate: (id: number) => void;
}

const JobCard: React.FC<Props> = ({ job, onDeactivate }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <span className={`px-2 py-1 text-sm rounded-full ${job.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {job.status}
        </span>
      </div>
      <p className="text-gray-700 mt-2">{job.description}</p>
      <div className="mt-4 text-sm text-gray-500">
        <p><strong>Company:</strong> {job.company_name}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> KES {job.salary}</p>
      </div>
      <div className="mt-4 flex gap-3">
        <Link to={`/job/${job.id}`} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
            View
        </Link>
        <Link to={`/edit/${job.id}`} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">
            Edit
        </Link>
        <button
        onClick={() => onDeactivate(job.id)}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
            Deactivate
        </button>
        </div>

    </div>
  );
};

export default JobCard;
