import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import GoogleButton from "./GoogleButton";

export default function SignupPage() {
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Create Your SocialCleanAI Account
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-6 text-sm">
          Signup to get started with us ✨
        </p>

        <AuthForm isLogin={false} navigate={navigate} />

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
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
