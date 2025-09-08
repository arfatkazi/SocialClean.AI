import { useState } from "react";
import InputField from "./InputField";

export default function AuthForm({ isLogin, navigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      const age = parseInt(form.age, 10);
      if (age < 18) {
        alert("You must be at least 18 years old to sign up.");
        return;
      }
      if (age >= 18 && age <= 25) {
        form.gender = "adult"; // auto-assign
      }
    }

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

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
      alert(data.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Signup fields */}
      {!isLogin && (
        <>
          <div className="flex gap-3">
            <InputField
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <InputField
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <InputField
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />

          {/* Age Logic */}
          {form.age >= 18 && form.age <= 25 && (
            <p className="text-green-600 text-sm font-semibold">
              Category: Adult
            </p>
          )}

          {form.age > 25 && (
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
            </select>
          )}

          {form.age && form.age < 18 && (
            <p className="text-red-600 text-sm font-semibold">
              You must be at least 18 years old to sign up.
            </p>
          )}
        </>
      )}

      {/* Email */}
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      {/* Password */}
      <div className="relative">
        <InputField
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2 text-m"
        >
          {showPassword ? "🙈" : "👀"}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-2 rounded-lg font-semibold shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500"
      >
        <span className="relative z-10">{isLogin ? "Login" : "Signup"}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"></span>
      </button>
    </form>
  );
}
