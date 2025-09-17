import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setResetLink("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Reset link sent successfully!");
        setResetLink(data.resetURL); // for testing/demo purposes
        console.log("Reset URL:", data.resetURL);
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
          🔒 Forgot Password
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.toLowerCase().includes("error") ||
              message.toLowerCase().includes("wrong")
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        {resetLink && (
          <p className="mt-4 text-center text-blue-600 break-all">
            Reset Link:{" "}
            <a href={resetLink} target="_blank" rel="noopener noreferrer">
              {resetLink}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
