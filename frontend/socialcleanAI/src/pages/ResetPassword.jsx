import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must be at least 6 characters, include 1 letter, 1 number, and 1 special character."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Password reset successful!");
        if (data.token) localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/login"), 1500); // redirect after success
      } else {
        setMessage(data.message || "Something went wrong. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error, please try again later.");
    } finally {
      setLoading(false);
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
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
