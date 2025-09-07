import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await response.json();

      setMessage(data.message || "Password reset successful");

      if (data.token) {
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/login"), 1500); // redirect to login
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          🔑 Reset Password
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button className="relative w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg overflow-hidden group">
            <span className="relative z-10">Reset Password</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"></span>
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.toLowerCase().includes("error")
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
