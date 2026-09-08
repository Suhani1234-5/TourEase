import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { api } from "../services/api";
import { API_BASE_URL } from "../config/auth";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home2", { replace: true });
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.login(formData);

      if (response.success) {
        setSuccess(true);

        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        setTimeout(() => {
          navigate("/home2", { state: { loginSuccess: true } });
        }, 1200);
      }
    } catch (error) {
      setErrors({
        submit: error.message || "Unable to sign in. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl dark:shadow-2xl border border-transparent dark:border-gray-800 relative">

        {/* BACK TO HOME BUTTON */}
        <Link 
          to="/" 
          className="absolute top-10 right-8 flex items-center justify-center gap-1 text-sm font-semibold text-white px-2 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-600 dark:to-purple-600 hover:from-teal-600 hover:to-cyan-700 shadow hover:shadow-lg dark:hover:from-indigo-500 dark:hover:to-purple-500"
        >
          <ArrowLeft size={18} className="sm:inline hidden" />
          <span>Back to Home</span>
        </Link>

        {/* LOGO */}
        <Link to="/" className="block mb-6">
          <h1 className="text-3xl font-bold text-teal-600 dark:text-indigo-400">
            TourEase
          </h1>
        </Link>

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          New here?{" "}
          <Link
            to="/signup"
            className="text-blue-600 dark:text-indigo-400 hover:text-blue-700 dark:hover:text-indigo-300 font-medium transition"
          >
            Create an account
          </Link>
        </p>

        {/* SUCCESS */}
        {success && (
          <div className="mb-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-300 font-medium">
              Signed in successfully!
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Redirecting...
            </p>
          </div>
        )}

        {/* SUBMIT ERROR */}
        {errors.submit && (
          <div className="mb-6 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg p-4">
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              {errors.submit}
            </p>
          </div>
        )}

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mb-6 flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="h-5 w-5"
          />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-900 px-3 text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label 
              htmlFor="login-email" 
              className="block text-sm font-medium mb-1 text-gray-900 dark:text-white"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-400" />
              <input
                id="login-email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400 focus:border-teal-500 dark:focus:border-indigo-400 ${
                  errors.email
                    ? "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label 
              htmlFor="login-password" 
              className="block text-sm font-medium mb-1 text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-400" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400 focus:border-teal-500 dark:focus:border-indigo-400 ${
                  errors.password
                    ? "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950"
                    : "border-gray-300 dark:border-gray-700"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="remember-me" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 cursor-pointer">
              <input
                id="remember-me"
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-blue-600 dark:text-indigo-400 hover:text-blue-700 dark:hover:text-indigo-300 font-medium transition"
            >
              Forgot password?
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-600 dark:to-purple-600 hover:from-teal-600 hover:to-cyan-700 dark:hover:from-indigo-500 dark:hover:to-purple-500 text-white py-3 rounded-lg font-semibold shadow hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}