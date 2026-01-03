import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";
import { api } from "../services/api";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
    // Background: Teal to Blue Gradient (Same as Signup)
    <div className="min-h-screen w-full bg-gradient-to-br from-[#00c6ad] via-[#00a3b1] to-[#007ba7] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-[-5%] left-[-5%] w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-black/10 blur-3xl rounded-full"></div>

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-md bg-white/20 border border-white/30 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
        
        {/* LOGO Area */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl mb-3 shadow-lg">
            <Globe className="text-[#00a3b1] animate-spin-slow" size={28} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">
            Tour<span className="text-[#003d4d]">Ease</span>
          </h1>
        </div>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-sm text-white/80 mt-1">
            New traveler?{" "}
            <Link to="/signup" className="text-white font-black hover:underline underline-offset-4 tracking-wide">
              Create account
            </Link>
          </p>
        </div>

        {/* MESSAGES */}
        {success && (
          <div className="mb-6 bg-white/20 border border-white/40 rounded-2xl p-3 text-center">
            <p className="text-white text-sm font-bold italic">🚀 Landing soon! Redirecting...</p>
          </div>
        )}
        {errors.submit && (
          <div className="mb-6 bg-red-500/20 border border-red-500/40 rounded-2xl p-3 text-center text-white text-xs font-medium">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div className="space-y-1">
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-inner"
                placeholder="Email Address"
              />
            </div>
            {errors.email && (
              <p className="text-red-200 text-[10px] ml-4 font-bold uppercase">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-inner"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-200 text-[10px] ml-4 font-bold uppercase">{errors.password}</p>
            )}
          </div>

          {/* ACTIONS (Remember & Forgot) */}
          <div className="flex items-center justify-between text-[11px] px-1 font-bold">
            <label className="inline-flex items-center gap-2 text-white/80 cursor-pointer">
              <input type="checkbox" className="rounded bg-white/10 border-white/30 checked:bg-[#00a3b1]" /> Remember me
            </label>
            <button
              type="button"
              className="text-white hover:underline underline-offset-4 uppercase tracking-tighter"
            >
              Forgot password?
            </button>
          </div>

          {/* SUBMIT BUTTON - Same as Signup */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-white text-[#007ba7] hover:bg-[#f0f9ff] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            {loading ? "Verifying..." : (
              <>
                Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}