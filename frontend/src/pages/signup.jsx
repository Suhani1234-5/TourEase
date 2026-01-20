import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { api } from "../services/api";
import { API_BASE_URL } from "../config/auth";
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    level: "",
    requirements: {
      minLength: false,
      hasLowercase: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecial: false,
    },
  });

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) {
      return {
        score: 0,
        level: "",
        requirements: {
          minLength: false,
          hasLowercase: false,
          hasUppercase: false,
          hasNumber: false,
          hasSpecial: false,
        },
      };
    }

    let score = 0;
    const requirements = {
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    // Score calculation
    if (requirements.minLength) score++;
    if (requirements.hasLowercase) score++;
    if (requirements.hasUppercase) score++;
    if (requirements.hasNumber) score++;
    if (requirements.hasSpecial) score++;

    // Bonus for longer passwords
    if (password.length >= 12) score++;

    // Determine strength level
    let level = "";
    if (score <= 2) {
      level = "Weak";
    } else if (score <= 4) {
      level = "Medium";
    } else {
      level = "Strong";
    }

    return { score, level, requirements };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Calculate password strength when password changes
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.phone && !/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleGoogleSignup = () => {
    // API_BASE_URL already includes the /api prefix
    window.location.href = `${API_BASE_URL}/auth/google`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { confirmPassword: _confirmPassword, ...signupData } = formData;
      const response = await api.signup(signupData);

      if (response.success) {
        setSuccess(true);

        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        setTimeout(() => {
          navigate("/home2", { state: { signupSuccess: true } });
        }, 2000);
      }
    } catch (error) {
      setErrors({
        submit: error.message || "Failed to create account. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl dark:shadow-2xl border border-transparent dark:border-gray-800">
        {/* LOGO */}
        <Link to="/" className="block mb-6">
          <h1 className="text-3xl font-bold text-teal-600 dark:text-indigo-400">
            TourEase
          </h1>
        </Link>

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create your account
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-indigo-400 hover:text-blue-700 dark:hover:text-indigo-300 font-medium transition"
          >
            Sign in
          </Link>
        </p>

        {/* SUCCESS */}
        {success && (
          <div className="mb-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-300 font-medium">
              Account created successfully!
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
        {/* GOOGLE SIGNUP */}
        <button
          onClick={handleGoogleSignup}
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
            <span className="bg-white px-3 text-gray-500">or</span>
          </div>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400 focus:border-teal-500 dark:focus:border-indigo-400 ${errors.name
                  ? "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950"
                  : "border-gray-300 dark:border-gray-700"
                  }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400 focus:border-teal-500 dark:focus:border-indigo-400 ${errors.email
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

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
              Phone <span className="text-gray-400">(Optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400 focus:border-teal-500 dark:focus:border-indigo-400 ${errors.phone
                  ? "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950"
                  : "border-gray-300 dark:border-gray-700"
                  }`}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400 focus:border-teal-500 dark:focus:border-indigo-400 ${errors.password
                  ? "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950"
                  : "border-gray-300 dark:border-gray-700"
                  }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                )}
              </button>
            </div>

            {/* PASSWORD STRENGTH INDICATOR */}
            {formData.password && (
              <div className="mt-3 space-y-2 animate-fadeIn">
                {/* Strength Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ease-out ${passwordStrength.level === "Weak"
                          ? "bg-red-500 dark:bg-red-500"
                          : passwordStrength.level === "Medium"
                            ? "bg-yellow-500 dark:bg-yellow-500"
                            : "bg-green-500 dark:bg-green-500"
                        }`}
                      style={{
                        width: `${(passwordStrength.score / 6) * 100}%`,
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold min-w-[60px] transition-colors duration-300 ${passwordStrength.level === "Weak"
                        ? "text-red-600 dark:text-red-400"
                        : passwordStrength.level === "Medium"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                  >
                    {passwordStrength.level}
                  </span>
                </div>

                {/* Requirements Checklist */}
                <div className="space-y-1 text-xs">
                  <div
                    className={`flex items-center gap-1.5 transition-colors duration-200 ${passwordStrength.requirements.minLength
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    <span className="font-bold">
                      {passwordStrength.requirements.minLength ? "✓" : "○"}
                    </span>
                    <span>At least 8 characters</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 transition-colors duration-200 ${passwordStrength.requirements.hasLowercase
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    <span className="font-bold">
                      {passwordStrength.requirements.hasLowercase ? "✓" : "○"}
                    </span>
                    <span>Contains lowercase letter</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 transition-colors duration-200 ${passwordStrength.requirements.hasUppercase
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    <span className="font-bold">
                      {passwordStrength.requirements.hasUppercase ? "✓" : "○"}
                    </span>
                    <span>Contains uppercase letter</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 transition-colors duration-200 ${passwordStrength.requirements.hasNumber
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    <span className="font-bold">
                      {passwordStrength.requirements.hasNumber ? "✓" : "○"}
                    </span>
                    <span>Contains number</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 transition-colors duration-200 ${passwordStrength.requirements.hasSpecial
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    <span className="font-bold">
                      {passwordStrength.requirements.hasSpecial ? "✓" : "○"}
                    </span>
                    <span>Contains special character (!@#$%^&*...)</span>
                  </div>
                </div>
              </div>
            )}

            {errors.password && (
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-indigo-400 focus:border-teal-500 dark:focus:border-indigo-400 ${errors.confirmPassword
                  ? "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950"
                  : "border-gray-300 dark:border-gray-700"
                  }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-600 dark:to-purple-600 hover:from-teal-600 hover:to-cyan-700 dark:hover:from-indigo-500 dark:hover:to-purple-500 text-white py-3 rounded-lg font-semibold shadow hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            By signing up, you agree to our{" "}
            <Link className="text-blue-600 dark:text-indigo-400 hover:text-blue-700 dark:hover:text-indigo-300 transition">
              Terms
            </Link>{" "}
            &{" "}
            <Link className="text-blue-600 dark:text-indigo-400 hover:text-blue-700 dark:hover:text-indigo-300 transition">
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
