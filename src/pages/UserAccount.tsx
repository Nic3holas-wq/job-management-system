import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import toast from "react-hot-toast";

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

    fetchUser();
  }, []);

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
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <div className="flex flex-col items-center mb-6">
        {user.image ? (
          <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
          //<p>URL: {user.image}</p>
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
  );
};

export default UserAccount;
