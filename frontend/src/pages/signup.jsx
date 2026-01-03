import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";
import { api } from "../services/api";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters required";
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await api.signup(signupData);
      if (response.success) {
        setSuccess(true);
        setTimeout(() => navigate("/home2"), 2000);
      }
    } catch (error) {
      setErrors({ submit: error.message || "Failed to create account." });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background using your requested Teal to Blue Gradient
    <div className="min-h-screen w-full bg-gradient-to-br from-[#00c6ad] via-[#00a3b1] to-[#007ba7] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      
      {/* Decorative Circles for Depth */}
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
          <h2 className="text-2xl font-bold text-white">Join the Adventure</h2>
          <p className="text-sm text-white/80 mt-1">
            Already a member?{" "}
            <Link to="/login" className="text-white font-black hover:underline underline-offset-4">
              Log in
            </Link>
          </p>
        </div>

        {/* ERROR/SUCCESS MESSAGES */}
        {success && (
          <div className="mb-6 bg-white/20 border border-white/40 rounded-2xl p-3 text-center">
            <p className="text-white text-sm font-bold italic">✨ Account Ready! Exploring soon...</p>
          </div>
        )}
        {errors.submit && (
          <div className="mb-6 bg-red-500/20 border border-red-500/40 rounded-2xl p-3 text-center text-white text-xs font-medium">
            {errors.submit}
          </div>
        )}

        {/* SIGNUP FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Input */}
          <div className="space-y-1">
            <div className="relative group">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-inner"
                placeholder="Full Name"
              />
            </div>
            {errors.name && <p className="text-red-200 text-[10px] ml-4 font-bold uppercase">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-inner"
                placeholder="Email Address"
              />
            </div>
            {errors.email && <p className="text-red-200 text-[10px] ml-4 font-bold uppercase">{errors.email}</p>}
          </div>

          {/* Phone Input */}
          <div className="relative group">
            <Phone className="absolute left-4 top-3.5 h-5 w-5 text-white/70 group-focus-within:text-white transition-colors" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-inner"
              placeholder="Phone Number (Optional)"
            />
          </div>

          {/* Password Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-white/70 group-focus-within:text-white" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-10 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                placeholder="Password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-white/70 hover:text-white transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-white/70 group-focus-within:text-white" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-11 pr-10 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                placeholder="Confirm"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-white/70 hover:text-white transition-colors">
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON - Vibrant White/Blue Contrast */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-white text-[#007ba7] hover:bg-[#f0f9ff] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            {loading ? "Preparing..." : (
              <>
                Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-white/70 mt-6 font-medium">
            By signing up, you agree to our <br />
            <span className="text-white hover:underline cursor-pointer">Terms of Service</span> & <span className="text-white hover:underline cursor-pointer">Privacy Policy</span>
          </p>
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