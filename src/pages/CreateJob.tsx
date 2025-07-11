import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const CreateJob: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/jobs/", {
        ...form,
        salary: parseInt(form.salary),
        status: "active",
      });

     toast.success("Job created successfully")
      setTimeout(() => {
        navigate("/"); // Redirect to homepage after success
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create job")
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Job</h2>

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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
