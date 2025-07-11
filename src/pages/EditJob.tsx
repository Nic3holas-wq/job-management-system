import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Job } from "../types/Job";
import toast from "react-hot-toast";

const EditJob: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Job, "id" | "created_at" | "updated_at" | "status">>({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: 0,
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/jobs/${id}/`)
      .then((res) => {
        const data = res.data;
        setForm({
          title: data.title,
          description: data.description,
          company_name: data.company_name,
          location: data.location,
          salary: data.salary,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch job details.");
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/jobs/${id}/`, {
        ...form,
        salary: parseInt(form.salary.toString()),
      });

      toast.success("Job updated successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full min-h-[100px] resize-y border p-2 border-gray-300 focus:outline-none focus:border-blue-600 rounded"
          required
        />
        <input
          type="text"
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
          required
        />
        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary (KES)"
          className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
