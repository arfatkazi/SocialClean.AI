import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../config/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 added
  const [loading, setLoading] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      return toast.error("Password must contain letters, number & symbol ⚠️");
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password updated ✅");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.message || "Invalid token");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
    bg-gradient-to-br from-[#0a0f1f] via-[#0d1226] to-[#1a0f2e]"
    >
      <div
        className="w-full max-w-md bg-white/10 dark:bg-black/30
       border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl 
       p-8 text-center text-white animate-fadeIn"
      >
        <h2
          className="text-3xl font-extrabold mb-2 bg-gradient-to-r 
         from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Reset Password
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Choose a strong new password 🔐
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // 👈 dynamic input type
              className="w-full px-4 py-3 rounded-xl bg-black/40 border 
                border-purple-500/40 focus:border-purple-400 focus:ring-2 
                focus:ring-purple-400 outline-none text-white 
                placeholder-gray-400 transition-all"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 👁️ Eye toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-lg"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            className={`w-full py-3 rounded-xl font-semibold 
            text-black bg-gradient-to-r from-cyan-400 to-purple-400 
            tracking-wide shadow-lg hover:shadow-cyan-400/50 
            hover:scale-[1.02] transition-all
            ${loading && "opacity-60 cursor-not-allowed"}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <Link
          to="/login"
          className="block mt-6 text-sm text-gray-400 hover:text-purple-300 transition"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}
