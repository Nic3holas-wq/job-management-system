import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const { name, email, password, confirmpassword } = formData;

  if (!name || !email || !password || !confirmpassword) {
    setError("All fields are required.");
    return;
  }

  if (password !== confirmpassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.detail || "Something went wrong.");
    } else {
      alert("Account created successfully!");
      toast.success("Account created successfully!");
      navigate("/signin");
    }
  } catch {
    setError("Failed to connect to the server.");
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Create Your Account</h2>
        <p className="text-gray-400">Sign up now to create, manage, and track your jobs like a pro.</p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4 mt-3">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="confirmpassword">
            Confirm Password
          </label>
          <input
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/signin" className="text-blue-600 hover:underline">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
