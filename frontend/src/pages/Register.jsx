import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  // Form ki values store karne ke liye
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password show/hide karne ke liye
  const [showPassword, setShowPassword] = useState(false);

  // Submit ke dauraan button disable / error dikhane ke liye
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Register ke baad Login page par jane ke liye
  const navigate = useNavigate();

  // Register form submit hone par
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Empty fields check
    if (!userName || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      // Backend ke /api/register ko call kar rahe hain (pehle ye kabhi
      // call hi nahi hota tha, isliye koi bhi register hone ke baad
      // login nahi kar pata tha)
      // Public register se hamesha USER hi banta hai. Admin banane ke liye
      // ek Admin account se "Admin Panel" use karna hoga.
      await registerUser({
        userName,
        password,
        role: "USER",
      });

      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      if (err.response?.data) {
        const data = err.response.data;
        const message =
          typeof data === "string"
            ? data
            : Object.values(data).join(", ");
        setError(message || "Registration failed");
      } else {
        setError("Network error - backend check karo");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // min-h-screen = poori screen
    // flex items-center = card vertically center
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      {/* One-screen Register Card */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-2xl">

        {/* ================= LEFT SIDE ================= */}

        <div className="hidden md:flex bg-slate-900 text-white p-8 flex-col justify-between">

          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              STUDIFY
            </h1>

            <p className="mt-2 text-xs text-slate-400">
              Smart Student Management System
            </p>
          </div>

          {/* Main branding */}
          <div>

            <h2 className="text-3xl font-bold leading-tight">
              Start managing
              <br />
              students smarter.
            </h2>

            <p className="mt-4 text-sm text-slate-400 leading-6">
              Manage students, courses and academic
              information from one simple dashboard.
            </p>

          </div>

          {/* Footer */}
          <p className="text-xs text-slate-500">
            Student Management Platform
          </p>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="p-7 flex items-center">

          <div className="w-full max-w-sm mx-auto">

            {/* Heading */}
            <h2 className="text-2xl font-bold text-slate-900">
              Create account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Register to continue to STUDIFY
            </p>


            {/* Register Form */}
            <form
              onSubmit={handleRegister}
              className="mt-5 space-y-3"
            >

              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Username
                </label>

                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg outline-none text-slate-900 focus:ring-2 focus:ring-slate-900"
                />
              </div>


              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg outline-none text-slate-900 focus:ring-2 focus:ring-slate-900"
                />
              </div>


              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full h-10 px-3 pr-16 text-sm border border-slate-200 rounded-lg outline-none text-slate-900 focus:ring-2 focus:ring-slate-900"
                  />

                  {/* Password show/hide */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>
              </div>


              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Confirm Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg outline-none text-slate-900 focus:ring-2 focus:ring-slate-900"
                />
              </div>


              {/* Role */}
              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-10 mt-2 bg-slate-900 text-white text-sm rounded-lg font-semibold hover:bg-slate-800 transition disabled:opacity-60"
              >
                {submitting ? "Creating account..." : "Create Account"}
              </button>

            </form>


            {/* Login link */}
            <p className="text-center mt-5 text-xs text-slate-500">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-bold text-slate-900 hover:underline"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;