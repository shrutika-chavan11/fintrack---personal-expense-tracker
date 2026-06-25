import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Navbar = () => {

  const [userName, setUserName] = useState("");

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    setUserName(payload.name);
  }
}, []);

  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Welcome Back
        </h2>

        <p className="text-sm text-gray-500">
          Manage your finances efficiently
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
      >
        Logout
    </button>

      <div className="flex items-center gap-4">

        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell size={20} />

          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-[#1a56db] font-semibold">
            {userName?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-medium text-sm">
              {userName}
            </p>

            <p className="text-xs text-gray-500">
              Personal Account
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;