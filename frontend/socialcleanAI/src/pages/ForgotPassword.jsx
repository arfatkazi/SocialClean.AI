import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Reset email sent 🚀");
        setSent(true);
      } else {
        toast.error(data.message || "Email not found");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0a0f1f] via-[#0d1226] to-[#1a0f2e]">
      <div className="w-full max-w-md bg-white/10 dark:bg-black/30 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl p-8 text-center text-white animate-fadeIn">
        {!sent ? (
          <>
            <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Forgot Password?
            </h2>

            <p className="text-gray-400 mb-6 text-sm">
              Enter your registered email. We’ll send you a reset link ✉️
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 outline-none text-white placeholder-gray-400 transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className={`w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wide shadow-lg transition-all hover:shadow-cyan-400/50 hover:scale-[1.02]
                ${loading && "opacity-60 cursor-not-allowed"}`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Link"}
              </button>
            </form>

            <Link
              to="/login"
              className="block mt-4 text-sm text-gray-400 hover:text-purple-300 transition"
            >
              ← Back to Login
            </Link>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4 animate-bounce">📬</div>

            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-cyan-300 bg-clip-text text-transparent">
              Email Sent!
            </h2>

            <p className="text-gray-400">
              We’ve sent a password reset link to your inbox.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-block px-5 py-2 text-sm rounded-xl bg-white/20 border border-white/10 hover:bg-white/30 transition"
            >
              Return to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
