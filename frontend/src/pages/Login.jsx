import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // Username aur password ko store karne ke liye
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Login fail hone par error show karne ke liye
  const [error, setError] = useState("");

  // Login ke baad Dashboard par le jane ke liye
  const navigate = useNavigate();

  // Login form submit hone par chalega
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Backend ke /api/login ko username/password bhej raha hai
      await loginUser({
        userName,
        password,
      });

      // Login successful hone ke baad Dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

        <div className="hidden md:flex bg-slate-900 text-white p-12 flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">STUDIFY</h1>

            <p className="mt-3 text-slate-400">
              Smart Student Management System
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Manage your students
              <br />
              smarter.
            </h2>

            <p className="mt-5 text-slate-400 leading-7">
              Manage students, courses and academic information
              from one simple dashboard.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            Student Management Platform
          </p>
        </div>

        <div className="p-8 sm:p-12">
          <div className="max-w-md mx-auto">

            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-500">
              Login to your student management account
            </p>

            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 pr-20"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="font-medium text-slate-900"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                Login
              </button>

            </form>

            <p className="text-center mt-8 text-sm text-slate-500">
              Don't have an account?{" "}

              <a
                href="/register"
                className="font-semibold text-slate-900"
              >
                Create account
              </a>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;