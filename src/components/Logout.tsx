import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/signin");
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
      Logout
      <LogOut className="inline-block ml-2" />
    </button>
  );
};
export default LogoutButton;