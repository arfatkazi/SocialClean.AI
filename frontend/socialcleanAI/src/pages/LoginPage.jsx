import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import GoogleButton from "./GoogleButton";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google?prompt=select_account";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Login to SocialCleanAI
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-6 text-sm">
          Login to continue your journey 🚀
        </p>

        <AuthForm isLogin={true} navigate={navigate} />

        {/* Switch to Signup */}
        <p className="mt-4 text-sm text-center">
          New here?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Create an account
          </a>
        </p>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <GoogleButton onClick={handleGoogleAuth} />
      </div>
    </div>
  );
}
