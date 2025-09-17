import { useState } from "react";

export default function AuthForm({ isLogin, navigate }) {
  const [showPassword, setShowPassword] = useState(false);
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
  const [loginError, setLoginError] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

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
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        if (isLogin) setLoginError(true);
        alert(data.message || "Error occurred");
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Server error, please try again later.");
    }
  };

  return (
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
        <span className="relative z-10">{isLogin ? "Login" : "Signup"}</span>
      </button>
    </form>
  );
}
