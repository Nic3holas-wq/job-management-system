import React, { useEffect, useState } from "react";
import api from "../utils/api";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const UserAccount: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

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

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user info available.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-2">{user.first_name}</h2>
      <p className="text-gray-600 mb-1">@{user.username}</p>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

export default UserAccount;
