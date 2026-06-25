import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

   const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const res = await api.post("/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    setError("");

    alert(res.data.message || "Account created successfully");

    navigate("/login"); // IMPORTANT
  } catch (err) {
  console.log("REGISTER ERROR:", err.response?.data);
  setError(err.response?.data?.message || "Registration failed");
}
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

        {/* Logo */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-[#1a56db]">
            FinTrack
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1a56db]"
            />

          </div>

          {/* Email */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1a56db]"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-[#1a56db]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-[#1a56db]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-[#1a56db] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

        </form>

        {/* Footer */}

        <div className="mt-6 text-center text-sm text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-[#1a56db] font-medium hover:underline"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Register;