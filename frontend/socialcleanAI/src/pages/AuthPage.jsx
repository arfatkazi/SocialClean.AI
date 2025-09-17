import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    country: "",
    city: "",
    email: "",
    password: "",
  });

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
    setLoginError(false);
  }, [location.pathname]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (isLogin) setLoginError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      const ageNum = parseInt(form.age, 10);
      if (isNaN(ageNum) || ageNum < 18)
        return alert("You must be at least 18 years old to sign up.");
      if (!form.country) return alert("Country is required.");
      if (!passwordRegex.test(form.password))
        return alert(
          "Password must be at least 6 characters, include 1 letter, 1 number, and 1 special character."
        );
      if (!form.gender) form.gender = "other"; // default to "other"
    }

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        if (isLogin) setLoginError(true);
        alert(data.message || "Error occurred");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const toggleAuthMode = () => navigate(isLogin ? "/signup" : "/login");

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:bg-gray-750 text-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          {isLogin
            ? "Login to SocialCleanAI"
            : "Create Your SocialCleanAI Account"}
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-6 text-sm">
          {isLogin
            ? "Login to continue your journey 🚀"
            : "Signup to get started with us ✨"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="city"
                placeholder="City (optional)"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-m transition-transform"
            >
              {showPassword ? "🙈" : "👀"}
            </button>
          </div>

          {isLogin && loginError && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-2 rounded-lg font-semibold shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500"
          >
            <span className="relative z-10">
              {isLogin ? "Login" : "Signup"}
            </span>
          </button>
        </form>

        <button
          onClick={toggleAuthMode}
          className="w-full mt-4 text-sm text-blue-600 hover:underline"
        >
          {isLogin
            ? "New here? Create an account"
            : "Already have an account? Login"}
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-2 hover:bg-gray-50 transition-shadow shadow-sm hover:shadow-md font-medium"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6 rounded-full"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
