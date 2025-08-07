import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { JobApplication } from "../types/Job";
import { AxiosError } from 'axios';
import { formatDate } from "../utils/formatDate";

// interface JobApplication {
//   id: number;
//   applicant_name: string;
//   job_title: string;
//   status: "Pending" | "Shortlisted" | "Rejected" | "Reviewed"; // You can add more statuses if needed
//   resume_url?: string; // Optional
//   created_at: string;
// }

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  image?: string; // Optional profile picture URL
}

const UserAccount: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token){
        navigate("/signin");
        return;
      }

      try {
        const response = await api.get("user/");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchApplications = async () => {
      try {
        const response = await api.get("job-applications/");
        console.log("Applications fetched:", response.data);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
  };

    fetchApplications();

    fetchUser();
  }, []);

  const updateApplicationStatus = async (id: number, status: string) => {
    try {
      const response = await api.patch(`update-application/${id}/update-status/`, { status });

      toast.success(`Application ${status.charAt(0).toUpperCase() + status.slice(1)}!`);

      setApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, status: response.data.status } : app))
      );
    } catch (err: unknown) {
      const error = err as AxiosError<{ detail?: string }>;
      toast.error("Failed to update application status.");
      console.error('Error updating application status:', error);

      if (error.response?.data?.detail) {
        toast.error(`Failed to update: ${error.response.data.detail}`);
      } else {
        toast.error("Failed to update application.");
      }
    }
};


  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await api.post("user/upload-picture/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile picture uploaded successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload profile picture.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user info available.</div>;

  return (
    <>
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <div className="flex flex-col items-center mb-6">
        {user.image ? (
          <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
          
        ) : (
          <UserCircle className="w-24 h-24 text-blue-600 mb-2" />
        )}
        <h2 className="text-xl font-bold">{user.first_name}</h2>
      </div>

      <p className="text-gray-600 mb-1">@{user.username}</p>
      <p className="text-gray-600 mb-4">{user.email}</p>

      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Picture
      </button>
    </div>

    <div className="max-w-7xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
  <h3 className="text-xl font-semibold mb-4">Job Applications</h3>
  {applications.length === 0 ? (
    <p className="text-gray-600">No applications yet.</p>
  ) : (
    <table className="min-w-full text-left border">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border">#</th>
          <th className="py-2 px-4 border">Applicant</th>
          <th className="py-2 px-4 border">Job Title</th>
          <th className="py-2 px-4 border">Resume</th>
          <th className="py-2 px-4 border">Status</th>
          <th className="py-2 px-4 border">Submitted</th>
          <th className="py-2 px-4 border">Actions</th>
        </tr>
      </thead>
      <tbody>
  {applications.map((app, index) => (
    <tr key={app.id} className="border-t">
      <td className="py-2 px-4 border">{index + 1}</td> {/* Row number */}
      <td className="py-2 px-4 border">{app.user.first_name}</td>
      <td className="py-2 px-4 border">{app.job.title}</td>
      <td className="py-2 px-4 border">
        <a href={app.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
      </td>
      <td className="py-2 px-4 border">{app.status}</td>
      <td className="py-2 px-4 border">{formatDate(app.created_at)}</td>
      <td className="py-2 px-4 space-x-2 flex flex-row">
        <button onClick={() => updateApplicationStatus(app.id, "pending")} className="text-sm bg-blue-500 hover:bg-blue-700 transition text-white px-1 py-1 rounded">Pending</button>
        <button onClick={() => updateApplicationStatus(app.id, "reviewed")} className="text-sm bg-yellow-600 hover:bg-yellow-700 transition text-white px-1 py-1 rounded">Reviewing</button>
        <button onClick={() => updateApplicationStatus(app.id, "interview")} className="text-sm bg-amber-800 hover:bg-amber-900 transition text-white px-1 py-1 rounded">Interview</button>
        <button onClick={() => updateApplicationStatus(app.id, "rejected")} className="text-sm bg-red-600 hover:bg-red-700 transition text-white px-1 py-1 rounded">Rejected</button>
        <button onClick={() => updateApplicationStatus(app.id, "accepted")} className="text-sm bg-green-600 hover:bg-green-700 transition text-white px-1 py-1 rounded">Accepted</button>
      </td>
    </tr>
  ))}
  {/* Footer Row with Total */}
  <tr className="border-t font-semibold">
    <td className="py-2 px-4 text-xl font-bold border" colSpan={7}>
      Total Applications: {applications.length}
    </td>
  </tr>
</tbody>

    </table>
  )}
</div>

    </>
    
  );
};

export default UserAccount;
